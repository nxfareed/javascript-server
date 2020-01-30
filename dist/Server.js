"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const errorHandler_1 = require("./libs/routes/errorHandler");
const notFoundRoute_1 = require("./libs/routes/notFoundRoute");
class Server {
    constructor(config) {
        this.config = config;
        this.bootstrap = () => {
            console.log('Inside Bootstrap');
            this.initBodyParser();
            this.setupRoutes();
            return this;
        };
        this.initBodyParser = () => {
            const { app } = this;
            console.log('Inside init');
            app.use(bodyParser.urlencoded({ extended: false }));
            // parse application/json
            app.use(bodyParser.json());
        };
        this.run = () => {
            const { app, config: { port } } = this;
            this.app.listen(this.config.port, (err) => {
                if (err) {
                    console.log('error');
                    throw err;
                }
                console.log('App is running successfully on port ' + port);
            });
        };
        this.setupRoutes = () => {
            const { app } = this;
            this.app.get('/health-check', (req, res) => {
                console.log('Inside health check');
                res.send('I am OK');
            });
            app.use('/api', (req, res, next) => {
                console.log('Inside Middleware');
                console.log(req.body);
                res.send(req.body);
            });
            app.use(notFoundRoute_1.default);
            app.use(errorHandler_1.default);
            return this;
        };
        this.app = express();
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map