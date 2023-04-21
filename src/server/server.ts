
import express, { Application } from 'express'
import morgan from 'morgan'
import routes from './../routes/index.routes'

class Server {
    private app: Application
    public static readonly PORT: 3000
    public port: string | number

    constructor() {
        this.app = express()
        this.middlewares()

    }

    middlewares() {

        this.app.use(morgan('dev'))
       
        this.app.use(express.json({ limit: '50mb' }))

   
        this.app.use(express.urlencoded({ extended: true, limit: '50mb' }))

        this.app.use('/', routes)
    }



    listen() {
        this.app.listen((this.port = process.env.PORT || Server.PORT), () => {
            console.log(`Server running in  ${this.port}`)
        })
    }

}

export default Server 
