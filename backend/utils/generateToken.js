import jwt from 'jsonwebtoken'

const generateToken = (res, id) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "15d"})

        // Set JWT as HTTP-Only cookie
        res.cookie('jwt', token, {httpOnly:true,secure:false, sameSite: 'lax', maxAge: 14 * 24 * 60 * 60 * 1000})
}

export default generateToken