import session from 'express-session';
import pg from 'pg';
import connectPgSimple from 'connect-pg-simple';
const host = String(process.env.DB_HOST);
const port = Number(process.env.DB_PORT);
const username = String(process.env.DB_USERNAME);
const password = String(process.env.DB_PASSWORD);
const database = String(process.env.DB_NAME);
const dayTll = 24 * 60 * 60 * 1000;
const pgSession = connectPgSimple(session);
const pgPool = new pg.Pool({
    host: host,
    port: port,
    user: username,
    database: database,
    password: password,
});
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
        sameSite: true,
        signed: true
    }
});
export { app_session };
