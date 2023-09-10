import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { User } from '../models/User'
import { Rol } from '../models/Rol';
import { createSuperAdminRole } from '../helpers/assignNewRol';
import { Not } from 'typeorm';

//Method by get
class UsersController {
    static listUsers = async (_: Request, res: Response) => {
        const repoUsers = AppDataSource.getRepository(User);

        try {
            const users = await repoUsers.find({
                where: { state: true },
            });

            return users.length > 0
                ? res.json({
                    ok: true,
                    msg: 'list of users',
                    users
                }) : res.json({ ok: false, msg: 'data not found', users });
        }
        catch (e) {
            return res.json({
                ok: false,
                msg: `Error => ${e}`,
            });
        }
    };

    // save
    static createUser = async (req: Request, res: Response) => {
        const { email, pass, rolId } = req.body
        const repoUsers = AppDataSource.getRepository(User)
        const repoRol = AppDataSource.getRepository(Rol)
        let existingRol
        try {
            const userExist = await repoUsers.findOne({ where: { email } })
            if (userExist) {
                return res.json({ ok: false, msg: `Email '${email}' already exists` })
            }

            if (rolId) {
                existingRol = await repoRol.findOne({ where: { id: rolId } })
                if (!existingRol) {
                    return res.json({
                        ok: false,
                        msg: `Role with ID '${rolId}' does not exist`,
                    })
                }
            } else {
                const existingSuperAdmin = await repoUsers.findOne({
                    where: { rol: { rol: 'SuperAdministrador' } },
                })

                if (!existingSuperAdmin) {
                    existingRol = await createSuperAdminRole(repoRol)
                } else {
                    return res.json({
                        ok: false,
                        msg: 'A user with the role SuperAdministrador already exists',
                    })
                }
            }

            if (existingRol?.rol === 'SuperAdministrador' && rolId) {
                return res.json({
                    ok: false,
                    msg: 'Cannot assign the role SuperAdministrador to a regular user',
                })
            }
            const user = new User()

            user.email = email
            user.pass = pass
            user.rol = existingRol
            user.hashPassword()
            const savedUser = await repoUsers.save(user)
            savedUser.pass = undefined

            await repoUsers.save(user)
            return res.json({
                ok: true,
                msg: 'Users was create',
                user: savedUser
            });
        } catch (e) {
            return res.json({
                ok: false,
                msg: `Error => ${e}`,
            });
        }
    };
    // by-Id
    static byIdUser = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const repoUser = AppDataSource.getRepository(User);
        try {
            const user = await repoUser.findOne({
                where: { id, state: true },
            });
            // if (!user) {
            //     throw new Error('This user don exist in data base')
            // }
            return user
                ? res.json({ ok: true, user, msg: 'success' })
                : res.json({ ok: false, msg: "The id dont exist" });
        } catch (e) {
            return res.json({
                ok: false,
                msg: `Server error => ${e}`,
            });
        }
    };
    // update 
    static updateUser = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        const repoUsers = AppDataSource.getRepository(User)
        const repoRol = AppDataSource.getRepository(Rol)
        const { email, rolId } = req.body
        let user: User

        try {
            user = await repoUsers.findOneOrFail({
                where: { id, state: true },
            })

            if (!user) {
                throw new Error('User does not exist in the database')
            }

            const existingUser = await repoUsers.findOne({
                where: { email, id: Not(id) },
            })
            if (existingUser) {
                return res.json({
                    ok: false,
                    msg: `Email '${email}' already exists`,
                })
            }

            const existingSuperAdmin = await repoUsers.findOne({
                where: { rol: { rol: 'SuperAdministrador' }, id: Not(id) },
            })
            if (existingSuperAdmin && rolId === 'SuperAdministrador') {
                return res.json({
                    ok: false,
                    msg: 'A user with the role SuperAdministrador already exists',
                })
            }

            const existingRol = await repoRol.findOne({ where: { id: rolId } })
            if (!existingRol) {
                return res.json({
                    ok: false,
                    msg: `Role with ID '${rolId}' does not exist`,
                })
            }

            if (existingRol.rol === 'SuperAdministrador') {
                const existingSuperAdmin = await repoUsers.findOne({
                    where: { rol: { rol: 'SuperAdministrador' }, id: Not(id) },
                })
                if (existingSuperAdmin) {
                    return res.json({
                        ok: false,
                        msg: 'A user with the role SuperAdministrador already exists',
                    })
                }
            }

            user.email = email
            user.rol = existingRol

            await repoUsers.save(user)

            user.pass = undefined
            return res.json({
                ok: true,
                msg: 'User  updated',
                user: user,
            })
        } catch (error) {
            return res.json({
                ok: false,
                msg: `Error -> ${error}`,
            })
        }
    }

    // delete
    static deleteUser = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const repoUser = AppDataSource.getRepository(User);
        try {
            const user = await repoUser.findOne({
                where: { id, state: true },
            });
            if (!user) {
                throw new Error("User dont exist in data base");
            }
            user.state = false;
            await repoUser.save(user);
            return res.json({
                ok: true,
                msg: "User was delete",
            });
        } catch (e) {
            return res.json({
                ok: false,
                msg: `Server error => ${e}`,
            });
        }
    };
}

export default UsersController;