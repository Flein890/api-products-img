import express,{ Express } from "express";
import cors from "cors"
import routes from "../routes/products.routes"
import {connect}    from "../database/connection"
import morgan from "morgan";

//Creamos la clase Server
export class Server {
    app: Express;
    port: string | number | undefined;
    productsPath: string;

    constructor() {

        this.app = express();
        this.port= process.env.PORT;
        this.productsPath="/api";


        //todos estos metodos se ejecutaran una ves llamado a una instancia de Server
        this.DBconnection();
        this.middlewares();
        this.routes();
        //---------------------------------------------------------------------------//
    }
          
     //La conexión a la base de datos siempre devuelve una promesa a resolver que no retorna nada y es asincrona
      async DBconnection(): Promise<void> {
       await connect();
     }

     middlewares():void{
        //Activa el CORS (Cross Origin resource sharing), esto permite peticiones de diferentes origenes para acceder
        //a los recursos de la aplicación
         this.app.use(cors({
            origin: '*', // Allow all origins
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type']
          }));
        //-----------------------------------------------------------------------------------------------------------//
        //Manejo de datos JSON en aplicaciones Express
         this.app.use(express.json());
         //morgan para ver las peticiones
         this.app.use(morgan("dev"));
         //Carpeta publica
        //  this.app.use(express.static("public"));
        this.app.use("/uploads",express.static('public/uploads'))
        
//          si no se encuentra el endpoint se muestra el error
//          this.app.use((req,res) => {
//          res.status(404).json({
//          status: false,
//          errors: "Endpoint not found"
//     })
// })
     }

   routes():void{
       this.app.use(this.productsPath,routes);
   }

    listen():void{
        this.app.listen(this.port,()=>{
            console.log(`Server running on port ${this.port}`);
        })

      }

}


