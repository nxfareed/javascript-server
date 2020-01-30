import * as express from 'express';
import Iconfig from './config/IConfig';


class Server {
private app: express.Express

constructor(private config: Iconfig) {
this.app = express();
}

bootstrap = () => {
console.log('Inside Bootstrap')
this.setupRoutes();
return this;
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

return this;
}
}

export default Server;
