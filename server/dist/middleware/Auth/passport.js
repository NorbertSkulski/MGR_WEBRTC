"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.READ = exports.Auth = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const lodash_1 = require("lodash");
const Errors_1 = require("../../utils/Errors/Errors");
const customExtractor = (req) => {
    const token = (0, lodash_1.get)(req, 'signedCookies.Authorization', null);
    if (token && token.startsWith("Bearer"))
        return token.replace("Bearer", "").trim();
    return null;
};
const options = {
    passReqToCallback: true,
    jwtFromRequest: customExtractor,
    secretOrKey: process.env.SECRET_JWT,
    algorithms: ['HS512']
};
passport_1.default.use(new passport_jwt_1.Strategy(options, (req, payload, done) => {
    console.log("TESTE::", payload);
    //todo jutro
    done(null, { uuid: "test", name: payload.name, isAdmin: payload.admin });
}));
passport_1.default.serializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, { id: user.uuid, username: user.name });
    });
});
passport_1.default.deserializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, user);
    });
});
const Auth = (req, res, next) => passport_1.default.authenticate('jwt', { session: false })(req, res, next);
exports.Auth = Auth;
const READ = (req, res, next) => {
    console.log("is_Auth: ", req.user);
    if (req.user && req.user.isAdmin) {
        return next();
    }
    next(Errors_1.permissionError);
};
exports.READ = READ;
