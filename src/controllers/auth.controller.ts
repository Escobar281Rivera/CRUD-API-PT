import { Request, Response } from "express";
import { User } from "../models/User";
import { AppDataSource } from "../data-source";
import bcrypt from 'bcrypt'
import { tokenSign } from '../helpers/jwt.helper'

const authRepository = AppDataSource.getRepository(User)

class AuthController{
    static login = async (req: Request, res: Response) => {
        const { email, pass } = req.body
        
        try {
            const user = await authRepository.findOne({
                where: { email, state: true }
            })
            if (!user || !bcrypt.compareSync(pass, user.pass)) {
                return res.status(401).json({
                    ok: false, msg: `email or password incorrect`
                })
            }

            const token = await tokenSign(user)
            
            return res.json({
                ok: true,
                msg: 'Welcome',
                token
            })
        } catch (e) {
            return res.json({
                ok: false,
                msg: `Error => ${e}`
            })
        }
    }
}

export default AuthController