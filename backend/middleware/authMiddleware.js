import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userModel.js'

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
    let token
    //read JWT from the cookie
    token = req.cookies.jwt
    if (token){
        console.log(token)
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            console.log(User)
            next()
            
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized")
            
        }
    } else {
        res.status(401)
        throw new Error("Not authorized")
    }
})

//Admin middleware
export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin){
        next()
    } else {
        res.status(401)
        throw new Error("Not authorized")
    }
}
