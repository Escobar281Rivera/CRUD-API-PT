import dotenv from 'dotenv'
import { Router } from 'express'
//importacion de las rutas de nuestras clases
import routerAuth from './auth.routes'
import routerRol from './roles.routes'
import routerUser from './users.routes'

dotenv.config()
const URL = process.env.URL || '/api/v1'

const routes = Router()

//rutas
routes.use(`${URL}/login`, routerAuth)
routes.use(`${URL}/rol`, routerRol)
routes.use(`${URL}/user`, routerUser)




export default routes