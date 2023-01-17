import jwt from 'jsonwebtoken'

const JWT_SECRET = "dhajdbajdbaldsjadlkabdkajbdklabdkadbfhabaiwaknzkvbnirsughiosL"

export const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) {
        res.json({ auth: false, message: "No token found" })
    }
    else {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "failed to auth" })
            }
            else {
                req.UserId = decoded.id;;
                next();
            }
        })
    }
}