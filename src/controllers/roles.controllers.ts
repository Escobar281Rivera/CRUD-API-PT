import {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { Rol } from "../models/Rol";

class RolesController {
    //List
    static listRoles = async(_: Request, res: Response) => {
        const repoRoles = AppDataSource.getRepository (Rol)

        try {
            const roles = await repoRoles.find({
                where: {state: true},
            })
            return roles
            ? res.json({
                ok: true,
                msg: 'LIST OF ROLES',
                roles,
            })
            : res.json({ ok: false, msg: 'DATA NOT FOUND', roles})
        } catch (e) {
            return res.json({
                ok: false,
                msg: `ERROR => ${e}`,
            });
        }
    };

    //CREATE
    static createRol = async( req: Request, res: Response) => {
        const {rol} = req.body
        const repoRoles = AppDataSource.getRepository(Rol)

        try {
            const roles = new Rol()

            roles.rol = rol
            await repoRoles.save(roles)
            return res.json({
                ok: true,
                msg: 'ROL WAS CREATE',
            })
        } catch (e) {
            return res.json({
                ok: false,
                msg:` ERROR => ${e}`,
            });
        }
    };

    //UPDATE
    static updateRol = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { rol } = req.body;
        const repoRol = AppDataSource.getRepository(Rol);
        let role: Rol;
        try {
            role = await repoRol.findOne({
                where: { id, state: true },
            });
            if (!role) {
                throw new Error("Role dont exist in data base");
            }
            role.rol = rol;
            await repoRol.save(role);
            return res.json({
                ok: true,
                msg: "Rol was update",
            });
        } catch (e) {
            return res.json({
                ok: false,
                msg: "Server error",
            });
        }
    };

    //SEARCH BYID
    static byIdRol = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        const repoRol = AppDataSource.getRepository(Rol)
        try {
            const rol = await repoRol.findOne({
                where: { id, state: true },
            });
            return rol
                ? res.json({ ok: true, rol , msg: 'success'})
                : res.json({ ok: false, msg: "The id dont exist" });
        } catch (e) {
            return res.json({
                ok: false,
                msg: "Server error",
            });
        }
    };

    //DELETE
    static deleteRol = async(req:Request, res: Response) => {
        const id = parseInt(req.params.id)
        const repoRol = AppDataSource.getRepository(Rol)

        try {
            const rol = await repoRol.findOne({
                where: {id, state: true},
            })

            if(!rol){
                throw new Error('ROL DONT EXIST IN DATA BASE')
            }
            rol.state = false;
            await repoRol.save(rol)
            return res.json({
                ok: true,
                msg: 'ROL WAS DELETE'   
            })
        } catch ( e) {
            return res.json({
                ok: false,
                msg:`SERVER ERROR => ${e}`
            });
        }
    };

}
export default RolesController;

 