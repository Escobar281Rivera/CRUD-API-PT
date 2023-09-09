import { Router } from 'express'
import AuthController from '../controllers/auth.controller'

const router = Router()
const auth = AuthController

router.post('/sign', auth.login)

export default router