import jwt from "jsonwebtoken"
export const authLoginMiddleware = (req, res, next) => {
    const token=req.cookies.token
    if(!token) return res.status(404).json({ message:"Not authenticated!" })
    jwt.verify(token, process.env.JWT_SECRET_KEY, async(err,payload)=>{
        if(err) return res.status(404).json({ message:"Invalid Token!" })
        req.userId=payload.id
        next()
    })
}
export const authLoginAdminMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(404).json({ message: "Not authenticated!" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
            return res.status(404).json({ message: "Invalid Token!" });
        }
        if (!payload.isAdmin) {
            return res.status(404).json({ message: "Not authorized as Admin!" });
        }
        req.userId=payload.id
        next();
    });
};
