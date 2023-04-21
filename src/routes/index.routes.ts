import dotenv from 'dotenv'
import { Router } from 'express'
//importacion de las rutas de nuestras clases
import routerRol from './roles.routes'
import routerUser from './users.routes'



dotenv.config()
const URL = process.env.URL

const routes = Router()

//rutas
routes.use(`${URL}/rol`, routerRol)
routes.use(`${URL}/user`, routerUser)




export default routes