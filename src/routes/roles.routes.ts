import { Router } from "express";
import RolesController from "../controllers/roles.controllers";


const router = Router()
const rol = RolesController

router.get('/', rol.listRoles)
router.post('/', rol.createRoles)
router.get('/:id', rol.byIdRol)
router.put('/:id', rol.updateRol)
router.delete('/:id', rol.deleteRol)


export default router
