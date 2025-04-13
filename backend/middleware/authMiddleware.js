import jwt from "jsonwebtoken";
import User from "../models/userModels.js"

const authenticate = async (req, res, next) => {
    let token
    if(token){
        try {
            const decoded = jwt.verify(token, process_params.env.JWT_SECERT);
            req.user = await User.findById(decoded.UserId).selected(-password)
            next()
        } catch (error) {
            res.status(404);
            throw new error ("Not authorized, token failed")
        }
    }else{
        res.status(404);
        throw new Error ("Not authorized, no token")
    }
}

const authorizedAdmin = (req, res, next) =>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401);
        throw new Error ("Unauthorized, not admin")
    }
} 

export {authenticate, authorizedAdmin} 
