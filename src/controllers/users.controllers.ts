import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { User } from '../models/User' 

//Method by get
class UsersController {
    static listUsers = async (req: Request, res: Response) => {
        const repoUsers = AppDataSource.getRepository(User);

        try {
            const users = await repoUsers.find({
                where: { state: true },
            });

            return users
                ? res.json({
                    ok: true,
                    msg: 'list of roles',
                    users
                }) : res.json({ ok: false, msg: 'data not found', users });
        }
        catch (e) {
            return res.json({
                ok: false,
                msg: `Error = ${e}`,
            });
        }
    };

    // save
    static createUsers = async (req: Request, res: Response) => {
        const { name, last, age, rolId } = req.body
        const repoUsers = AppDataSource.getRepository(User)
        try {
            const users = new User()

            users.name = name
            users.last = last
            users.age = age
            users.rol = rolId

            await repoUsers.save(users)
            return res.json({
                ok: true,
                msg: 'Users was create',
                users
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
                where: { id },
            });
            return user
                ? res.json({ ok: true, user })
                : res.json({ ok: false, msg: "The id dont exist" });
        } catch (e) {
            return res.json({
                ok: false,
                msg: "Server error",
            });
        }
    };
    // update 
    static updateUser = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        const { name, last, age, rolId } = req.body;
        const repoUser = AppDataSource.getRepository(User);
        let user: User;
        try {
            user = await repoUser.findOneOrFail({
                where: { id, state: true, },
            });
            if (!user) {
                throw new Error("User dont exist in data base");
            }
            user.name = name,
                user.last = last,
                user.age = age,
                user.rol = rolId
            await repoUser.save(user);
            return res.json({
                ok: true,
                msg: "User was update",
            });
        } catch (error) {
            return res.json({
                ok: false,
                msg: "Server error",
            });
        }
    };

    // delete
    static deleteUser = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const repoUser = AppDataSource.getRepository(User);
        try {
            const user = await repoUser.findOne({
                where: { id },
            });

            console.log(user)
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
                msg: "Server error",
            });
        }
    };
}

export default UsersController;