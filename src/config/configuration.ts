import { config } from 'dotenv';
import Iconfig from './IConfig';
config();
const configuration: Iconfig = Object.freeze({
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    secretKey: process.env.SECRET_KEY,
    mongoDBUrl: process.env.MONGO_URL,
    password: process.env.password
});
export default configuration;
