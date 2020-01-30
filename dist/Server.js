"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class Server {
    constructor(config) {
        this.config = config;
        this.bootstrap = () => {
            console.log('Inside Bootstrap');
            this.setupRoutes();
            return this;
        };
        this.run = () => {
            const { app, config: { port } } = this;
            this.app.listen(this.config.port, (err) => {
                if (err) {
                    console.log("error");
                    throw err;
                }
                console.log('App is running successfully on port ' + port);
            });
        };
        this.setupRoutes = () => {
            const { app } = this;
            this.app.get('/health-check', (req, res) => {
                console.log("Inside health check");
                res.send('I am OK');
            });
            return this;
        };
        this.app = express();
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map