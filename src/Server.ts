import * as express from 'express';
import Iconfig from './config/IConfig';
import * as bodyParser from 'body-parser';
import errorHandler from './libs/routes/errorHandler';
import notFoundRoutes from './libs/routes/notFoundRoute';
import { Request } from 'express';
import mainRouter from './router';
import Database from './libs/Database';
import * as swaggerJsDoc from 'swagger-jsdoc';
import * as swaggerUI from 'swagger-ui-express';

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

  public initSwagger = () => {
    const options = {
      definition: {
        info: {
          title: 'javascript-client API',
          version: '1.0.0',
        },
        securityDefinitions: {
          Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'headers'
          }
        }
      },
      basePath: '/api',
      swagger: '2.0',
      apis: ['./dist/controllers/**/routes.js'],
    };
    const swaggerSpec = swaggerJsDoc(options);
    return swaggerSpec;
  }


  initBodyParser = (): void => {
    const { app } = this;
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

  }
  run = () => {
    const { app, config: { port, mongoDBUrl } } = this;
    Database.open(mongoDBUrl).then(() => {
      this.app.listen(this.config.port, (err) => {
        if (err) {
          console.log("error");
          throw err;
        }
        console.log('App is running successfully on port ' + port);
        //Database.disconnect();
      });
    })
  }
  setupRoutes = () => {
    const { app } = this;
    this.app.use('/swagger', swaggerUI.serve, swaggerUI.setup(this.initSwagger()));
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
