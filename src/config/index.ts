import * as dotenv from 'dotenv';
dotenv.config();

export default {
    development: {
        sitename: 'GraphQL Server [Development]',
        MONGO_USER: process.env.MONGO_USER,
        MONGO_PASSWORD: process.env.MONGO_PASSWORD,
        SECRECT: process.env.SECRECT,
        MONGO_DB: 'events-dev',
    },
    production: {
        sitename: 'GraphQL Server',
        MONGO_USER: process.env.MONGO_USER,
        MONGO_PASSWORD: process.env.MONGO_PASSWORD,
        SECRECT: process.env.SECRECT,
        MONGO_DB: 'events',
    },
  }