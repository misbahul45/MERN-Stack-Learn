import React, { createContext, useEffect, useState } from "react";
import Button from "../auth/Button";

interface CloudinaryUploadWidgetProps {
  uwConfig: object;
  setPublicId: React.Dispatch<React.SetStateAction<string[]>>;
}

interface CloudinaryScriptContextProps {
  loaded: boolean;
}

const CloudinaryScriptContext = createContext<CloudinaryScriptContextProps>({
  loaded: false,
});

const CloudinaryUploadWidget: React.FC<CloudinaryUploadWidgetProps> = ({
  uwConfig,
  setPublicId,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const myWidget = (window as any).cloudinary.createUploadWidget(
        uwConfig,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            setPublicId(prev=>[...prev,result.info.secure_url]);
          }
        }
      );

      document
        .getElementById("upload_widget")
        ?.addEventListener("click", () => {
          myWidget.open();
        });
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
        <Button type="button" id="upload_widget" className="w-48 mx-auto bg-gradient-to-r from-slate-800 via-red-800 to-slate-800 text-slate-100 py-2.5 rounded-md font-semibold hover:via-blue-600 active:scale-95 transition-all duration-100" onClick={initializeCloudinaryWidget}>
            Upload image
        </Button>
    </CloudinaryScriptContext.Provider>
  );
};

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
