import session from 'express-session';
import pg from 'pg';
import connectPgSimple from 'connect-pg-simple';

const host: string = process.env.DB_HOST;
const port: number = Number(process.env.DB_PORT);
const username: string = process.env.DB_USERNAME;
const password: string = process.env.DB_PASSWORD;
const database: string = process.env.DB_NAME;

const dayTll = 24 * 60 * 60 * 1000;
const pgSession = connectPgSimple(session);

const pgPool = new pg.Pool({
    host: host,
    port: port,
    user: username,
    database: database,
    password: password,
})

const app_session = session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
        pool: pgPool,
        tableName: "session_webrtc",
        createTableIfMissing:true,
    }),
    cookie: {
        maxAge: dayTll,
        secure: true,
        httpOnly: true
    }
});

export { app_session };