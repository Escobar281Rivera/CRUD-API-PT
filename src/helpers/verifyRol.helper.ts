import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../data-source'
import { Rol } from '../models/Rol'
import { verifyToken } from './jwt.helper'

const rolRepository = AppDataSource.getRepository(Rol)

export class CheckRol {
    static roleToRead = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const token = req.headers.authorization.split(' ').pop()
            const tokenData = await verifyToken(token)
            res.locals.jwtPayload = tokenData

            let { rol } = res.locals.jwtPayload
            rol = Number(rol)
            const role = await rolRepository.findOne({ where: { id: rol } })
            console.log(role)

            if (role.rol === 'SuperAdministrador' || role.rol === 'usuario' || role.rol === 'reader') {
                return next()
            }
            return res.status(403).json({ message: 'YOUR USER IS NOT AUTHORIZED!' })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: `Error --> ${error}` })
        }
    }

    static rolSuperAdmin = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const token = req.headers.authorization.split(' ').pop()
            const tokenData = await verifyToken(token)
            res.locals.jwtPayload = tokenData

            let { rol } = res.locals.jwtPayload
            rol = Number(rol)

            const role = await rolRepository.findOne({ where: { id: rol } })

            if (role.rol === 'SuperAdministrador') {
                return next()
            }
            return res.status(403).json({ message: 'YOUR USER IS NOT AUTHORIZED!' })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: `Error --> ${error}` })
        }
    }

    static rolOfManagers = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const token = req.headers.authorization.split(' ').pop()
            const tokenData = await verifyToken(token)
            res.locals.jwtPayload = tokenData

            let { rol } = res.locals.jwtPayload
            rol = Number(rol)

            const role = await rolRepository.findOne({ where: { id: rol } })

            if (role.rol === 'SuperAdminitrador' || role.rol === 'Adminitrador') {
                return next()
            }
            return res.status(403).json({ message: 'YOUR USER IS NOT AUTHORIZED!' })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: `Error --> ${error}` })
        }
    }
}