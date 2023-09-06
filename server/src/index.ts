import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import controller from './controller';
import sequelize from "./model"
import cookieParser from "cookie-parser";
import { app_session } from './middleware/Session/Session';
import { ErrorHandler } from './middleware/ErrorHandler/ErrorHandler';


sequelize.sync();


const app: Express = express();
const port = process.env.PORT;
const path: string = (process.env.INIT_PATH as string) || "/";



app.use(express.json());
app.use(app_session)
app.use(cookieParser(process.env.SECRET_SESSION));
//Routes
app.use(path, controller);
//ERROR_HANDLER
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});