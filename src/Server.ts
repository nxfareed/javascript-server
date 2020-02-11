import * as express from 'express';
import Iconfig from './config/IConfig';
import * as bodyParser from 'body-parser';
import errorHandler from './libs/routes/errorHandler';
import notFoundRoutes from './libs/routes/notFoundRoute';
import { Request } from 'express';
import mainRouter from './router';
class Server {
    private app: express.Express
    constructor(private config: Iconfig) {
        this.app = express();
    }
    bootstrap = () => {
        console.log('Inside Bootstrap');
        this.initBodyParser();
        this.setupRoutes();
        return this;
    }
    initBodyParser = (): void => {
        const { app } = this;
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

    }
    run = () => {
        const { app, config: { port } } = this;
        this.app.listen(this.config.port, (err) => {
            if (err) {
                console.log("error");
                throw err;
            }
            console.log('App is running successfully on port ' + port);
        })
    }
    setupRoutes = () => {
        const { app } = this;
        this.app.get('/health-check', (req: express.Request, res: express.Response) => {
            console.log("Inside health check");
            res.send('I am OK');
        });
        app.use('/body-parser', (req: Request, res, next) => {
            console.log('Inside Middleware');
            console.log(req.body);
            res.send(req.body);
        });

        app.use('/api', mainRouter);

        app.use(notFoundRoutes);
        app.use(errorHandler);

        return this;
    }
}
export default Server;