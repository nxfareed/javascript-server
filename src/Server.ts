import * as express from 'express';
import Iconfig from './config/IConfig';
import * as bodyParser from 'body-parser';
import errorHandler from './libs/routes/errorHandler';
import notFoundRoutes from './libs/routes/notFoundRoute';
import { Request } from 'express';
import mainRouter from './router';

class Server {
<<<<<<< HEAD
private app: express.Express;
=======
    private app: express.Express
>>>>>>> 4989eedde3b667c7e15101ae4915eb03cb683244

    constructor(private config: Iconfig) {
        this.app = express();
    }

<<<<<<< HEAD
bootstrap = () => {
console.log('Inside Bootstrap');
this.initBodyParser();
this.setupRoutes();
return this;
}
=======
    bootstrap = () => {
        console.log('Inside Bootstrap')
        this.setupRoutes();
        return this;
    }
>>>>>>> 4989eedde3b667c7e15101ae4915eb03cb683244

initBodyParser = () => {
const { app } = this;

console.log('Inside init');

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
}

    run = () => {
        const { app, config: { port } } = this;

<<<<<<< HEAD
this.app.listen(this.config.port, (err) => {
if (err) {
console.log('error');
throw err;
}
console.log('App is running successfully on port ' + port);
});
}
=======
        this.app.listen(this.config.port, (err) => {
            if (err) {
                console.log("error");
                throw err;
            }
            console.log('App is running successfully on port ' + port);
        })
    }
>>>>>>> 4989eedde3b667c7e15101ae4915eb03cb683244

    setupRoutes = () => {
        const { app } = this;

<<<<<<< HEAD
this.app.get('/health-check', (req: express.Request, res: express.Response) => {
console.log('Inside health check');
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
=======
        this.app.get('/health-check', (req: express.Request, res: express.Response) => {
            console.log("Inside health check");
            res.send('I am OK');
        });

        return this;
    }
>>>>>>> 4989eedde3b667c7e15101ae4915eb03cb683244
}

export default Server;