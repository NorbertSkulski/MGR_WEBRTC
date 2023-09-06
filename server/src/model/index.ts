import { Sequelize } from 'sequelize-typescript';

const host:string = process.env.DB_HOST;
const port:number = Number(process.env.DB_PORT);
const username:string = process.env.DB_USERNAME;
const password:string = process.env.DB_PASSWORD;
const database:string = process.env.DB_NAME;

const sequelize: Sequelize = new Sequelize({
    host:host,
    port:port,
    database: database,
    dialect: 'postgres',
    username: username,
    password: password,
    logging: process.env.DEVELOPMENT=='true'
});

sequelize.addModels([__dirname+'/Models'])


export default sequelize;