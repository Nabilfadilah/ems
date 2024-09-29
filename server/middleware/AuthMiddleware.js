import jwt  from 'jsonwebtoken';
import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
    console.log(req.headers.authorization); // Tambahkan ini untuk cek apakah token diterima
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            res.status(404).json({success: false, error: "Token Not Provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY)
        if(!decoded) {
            res.status(404).json({success: false, error: "Token Not Valid"})
        }

        const user = await User.findById({_id: decoded._id}).select('-password')

        if(!user) {
            res.status(404).json({success: false, error: "User not found"})
        }

        req.user = user
        next()
    } catch(error) {
        res.status(500).json({success: false, error: "Server Error"})
    }
}

export default verifyUser