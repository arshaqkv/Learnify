import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../../config/verifyToken";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void =>{
    const token = req.cookies.accessToken
    if(!token){
        res.status(401).json({success: false, message: "Unauthorized"})
    }
    try {
        const decoded = verifyAccessToken(token)
        if(!decoded){
            res.status(401).json({success: false, message: "Unauthorized"})
        }
        req.user = decoded 
        console.log('###########', req.user)
        next()
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired access token" });
    }
}