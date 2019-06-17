"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
exports.default = {
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
};
//# sourceMappingURL=index.js.map