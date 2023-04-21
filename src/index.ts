
import 'reflect-metadata'
import dotenv from 'dotenv'
import Server from './server/server'
import { AppDataSource } from './data-source'

dotenv.config()

const server = new Server()
server.listen()


AppDataSource.initialize().then(async (conection) => {//async asincrona
    if (conection) {
        console.log('***** Conection with data base is sucess*****')
    }
}).
    catch((error) => console.log('***Error in connection with data base' + error))
