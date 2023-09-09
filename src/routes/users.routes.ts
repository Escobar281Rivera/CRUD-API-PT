import { Router } from "express";
import UsersController from "../controllers/users.controllers";


const router = Router()
const user = UsersController

router.get("/", user.listUsers)
router.post("/", user.createUser)
router.get("/:id", user.byIdUser)
router.put("/:id", user.updateUser)
router.delete("/:id", user.deleteUser)

export default router