import express,{Application} from 'express';
import cors from 'cors';

import userRoutes from '../routes/usuarios';
import db from '../db/connection';


class Server {
    private port:string;
    private app: Application;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor(){
        this.app=express();
        this.port = process.env.PORT ||'8000';

        this.dbConnection();   //Ejecutamos la conexion a la db
        this.middlewares(); //Ejecutamos los middlewares

        this.routes();
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Database connected')
        } catch (error: any) {
            throw new Error(error)
        }
    }

    middlewares(){

        //CORS
        this.app.use(cors())

        //Lectura del body
        this.app.use(express.json());

        //Carpeta publica
        this.app.use(express.static('public'));

    }


    routes(){
        this.app.use (this.apiPaths.usuarios, userRoutes);
    }


    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto `+this.port)
        })
    }
}


export default Server;