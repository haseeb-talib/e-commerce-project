import { asyncHandler } from "../utils/async-handler.js";
import {ApiError} from "../utils/api-error.js"
import jwt from "jsonwebtoken"

const isLoggedIn = asyncHandler(async (req,res,next)=>{
    const accessToken = req.cookies.accessToken;
    if(!accessToken){
        throw new ApiError(401, "Unauthorized");
    }
    
    const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    req.user = decodedAccessToken;
    next()
})
export {isLoggedIn}