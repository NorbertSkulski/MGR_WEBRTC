import session from 'express-session';
import pg from 'pg';
import connectPgSimple from 'connect-pg-simple';

const host: string = String(process.env.DB_HOST);
const port: number = Number(process.env.DB_PORT);
const username: string = String(process.env.DB_USERNAME);
const password: string = String(process.env.DB_PASSWORD);
const database: string = String(process.env.DB_NAME);

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
    secret: String(process.env.SECRET_SESSION),
    resave: false,
    saveUninitialized: true,
    store: new pgSession({
        pool: pgPool,
        tableName: "session_webrtc",
        createTableIfMissing: true,
    }),
    cookie: {
        maxAge: dayTll,
        secure: true,
        httpOnly: true,
        sameSite:true,
        signed:true
    }
});

console.log("Sess: ", app_session)

export {app_session}
