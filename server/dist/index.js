import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import controller from './controller';
import cookieParser from "cookie-parser";
import { app_session } from './middleware/Session/Session';
import { ErrorHandler } from './middleware/ErrorHandler/ErrorHandler';
import { socketInit } from './sockets';
import { innerCors } from './middleware/Cors/Cors';
const app = express();
const port = process.env.PORT;
const path = process.env.INIT_PATH || "/";
app.use(innerCors);
app.use(express.json());
app.use(app_session);
app.use(cookieParser(process.env.SECRET_SESSION));
//Routes
app.use(path, controller);
//ERROR_HANDLER
app.use(ErrorHandler);
const server = socketInit(app);
server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at port: ${port}`);
});
