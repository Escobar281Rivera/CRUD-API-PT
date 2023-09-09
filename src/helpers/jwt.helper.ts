
import { User } from '../models/User'
import jwt = require('jsonwebtoken')

export const tokenSign = async (user: User) => {
    return jwt.sign(
        {
            _id: user.id,
            email: user.email,
            rol: user.rolId,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h',
        }
    )
}

export const verifyToken = async (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}