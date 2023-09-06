"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app_session = void 0;
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const pg_1 = __importDefault(require("pg"));
const host = process.env.DB_HOST;
const port = Number(process.env.DB_PORT);
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const dayTll = 24 * 60 * 60 * 1000;
const pg_Session = (0, connect_pg_simple_1.default)()(express_session_1.default);
const app_session = (0, express_session_1.default)({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    store: new pg_Session({
        pool: new pg_1.default.Pool({
            host: host,
            port: port,
            database: database,
            username: username,
            password: password,
        }),
        tableName: "Session_WEBrtc"
    }),
    cookie: { maxAge: dayTll, secure: true, httpOnly: true }
});
exports.app_session = app_session;
