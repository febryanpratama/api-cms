import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import {config as dotenv} from 'dotenv';
import GenerateRoutes from './pages/GeneratePages/routes/GenerateRoutes';
import helmet from 'helmet';
import path from 'path';
import ApplicationRoutes from './pages/ApplicationPages/routes/ApplicationRoutes';
import MetaRoutes from './pages/MetaPages/routes/MetaRoutes';



class App {
    public app: Application;

    constructor(){
        this.app = express();
        this.plugins();
        this.routes();
        dotenv();
    }

    protected plugins(): void {
        this.app.use(express.urlencoded());
        this.app.use(express.json());
        this.app.use((express.static(path.join(__dirname, '../public'))))
        // this.app.use( compression() );
        this.app.use( helmet() );
        this.app.use(cors({
            origin : '*',
            methods : [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE' ],
            allowedHeaders : [ 'Content-Type', 'Authorization', 'Accept' ],
        }))
    }

    protected routes(): void {
        this.app.route('/').get((req: Request, res: Response) => {
            return res.json({
                status : true,
                message : 'Server is running'
            })
        });

        this.app.use('/api/generate', GenerateRoutes);

        this.app.use('/api/application', ApplicationRoutes)
        this.app.use('/api/meta-ai', MetaRoutes)
    }
}

const port : number = 8080;
const app = new App().app;


app.listen( port, () => {
    // console.log( process.env.NODE_ENV );
    console.log( `Server is running on port ${ port }` );
} )