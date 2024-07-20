import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";

import FroalaEditorComponent from 'react-froala-wysiwyg';

interface Props{
    setModel:React.Dispatch<React.SetStateAction<string>>
}

const config = {
    widht: "100%",
    placeholderText: "Type here...",
    charCounterCount: true,
    toolbarButtons: {
      moreText: {
        buttons: ["bold", "italic", "underline", "strikeThrough", "subscript", "superscript", "fontFamily", "fontSize", "textColor", "backgroundColor", "inlineClass", "inlineStyle", "clearFormatting"],
        align: "left",
        buttonsVisible: 2,
      },
      moreParagraph: {
        buttons: ["alignLeft", "alignCenter", "formatOLSimple", "alignRight", "alignJustify", "formatOL", "formatUL", "paragraphFormat", "paragraphStyle", "lineHeight"],
        align: "left",
        buttonsVisible: 3,
      },
      moreRich: {
        buttons: ["insertLink", "insertImage", "insertVideo", "insertTable", "emoticons", "fontAwesome", "specialCharacters", "embedly", "insertFile", "insertHR"],
        align: "left",
        buttonsVisible: 3,
      },
      moreMisc: {
        buttons: ["undo", "redo", "fullscreen", "print", "getPDF", "spellChecker", "selectAll", "html"],
        align: "right",
        buttonsVisible: 3,
      },
    },
    fontFamily: {
      "Arial,Helvetica,sans-serif": "Arial",
      "Georgia,serif": "Georgia",
      "Impact,Charcoal,sans-serif": "Impact",
      "Tahoma,Geneva,sans-serif": "Tahoma",
      "Times New Roman,Times,serif": "Times New Roman",
      "Verdana,Geneva,sans-serif": "Verdana",
    },
    fontSize: {
      "8": "8 pt",
      "9": "9 pt",
      "10": "10 pt",
      "11": "11 pt",
      "12": "12 pt",
      "14": "14 pt",
      "18": "18 pt",
      "24": "24 pt",
      "36": "36 pt",
    },
    imageUpload: true,
    imageDefaultAlign: 'left',
    videoInsertButtons: ["videoBack", "|", "videoByURL", "videoEmbed"],
    heightMin: 200,
    heightMax: 400,
    imageResize: true,
    imageResizeWithPercent: true,
    imageEditButtons: ["imageReplace", "imageAlign", "imageRemove"],
    videoResponsive: true,
    linkAlwaysBlank: true,
    colorsBackground: ["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF"],
    colorsText: ["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF"],
  };




const RichEditor = ({setModel,  }:Props) => {
    const handleModelChange= (event:string)=>{
      setModel(event)
    }
    return (
      <>
        <FroalaEditorComponent 
          tag='textarea'
          onModelChange={handleModelChange}
          config={config}
        />
      </>
    )
}

export default RichEditor
