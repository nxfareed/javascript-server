"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
const configuration = Object.freeze({
    port: process.env.PORT,
    env: process.env.NODE_ENV
});
exports.default = configuration;
//# sourceMappingURL=configuration.js.map