import { config } from 'dotenv';
import Iconfig from './IConfig';

config();

const configuration: Iconfig = Object.freeze({
port: process.env.PORT,
env: process.env.NODE_ENV
});

export default configuration;
