"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const host = process.env.DB_HOST;
const port = Number(process.env.DB_PORT);
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const sequelize = new sequelize_typescript_1.Sequelize({
    host: host,
    port: port,
    database: database,
    dialect: 'postgres',
    username: username,
    password: password,
    logging: process.env.DEVELOPMENT == 'true'
});
sequelize.addModels([__dirname + '/models']);
exports.default = sequelize;
