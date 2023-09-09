import { verifyToken } from './jwt.helper'
import { Request, Response, NextFunction } from 'express'

export const checkAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        console.log(tokenData)
        if (tokenData) {
            next()
        } else {
            res.status(409)
            res.send({ error: 'NOT ACCESS' })
        }
    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'ACCESS DENIED' })
    }
}