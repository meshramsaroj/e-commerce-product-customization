import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"

const verifyJWTToken = async(req, _, next ) => {
    try {
       const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
       if(!token) {
        throw new Error("Unauthorized request")
       }

       const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

       const user = await User.findById(decodedToken?.id).select("-refreshToken")

       if(!user) {
        throw new Error("Invalid access token");
       }

       req.user = user
       next()
        
    } catch (error) {
        throw new Error(error?.message || "Invalid access token");
    }
}

export {
    verifyJWTToken
}