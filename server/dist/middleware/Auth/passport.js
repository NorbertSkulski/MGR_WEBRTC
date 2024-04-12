"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE = exports.CREATE = exports.UPDATE = exports.READ = exports.Auth = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const lodash_1 = require("lodash");
const Errors_1 = require("../../utils/Errors/Errors");
const client_1 = require("@prisma/client");
const CheckType_1 = require("../../utils/Types/CheckType");
const Datadase_1 = require("../../database/Datadase");
const customExtractor = (req) => {
    const token = (0, lodash_1.get)(req, 'signedCookies.Authorization', null);
    if (token && token.startsWith(`${process.env.TOKEN_PREFIX}`))
        return token.replace(`${process.env.TOKEN_PREFIX}`, "").trim();
    return null;
};
const options = {
    passReqToCallback: true,
    jwtFromRequest: customExtractor,
    secretOrKey: process.env.SECRET_JWT,
    algorithms: [`${process.env.JWT_ALGORITHM}`]
};
passport_1.default.use(new passport_jwt_1.Strategy(options, async (req, payload, done) => {
    const { login } = payload;
    const user = await Datadase_1.prisma.user.findFirst({ where: { login } });
    if (!user) {
        done(null, false);
        return;
    }
    done(null, user);
}));
passport_1.default.serializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, { id: user.uuid });
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
    if ((0, CheckType_1.checkIsUser)(req.user)) {
        if (req.user.admin) {
            return next();
        }
        //Dopisac rozpoznawanie praw i dobobic update idt...
        if (req.user.permissions.includes(client_1.Permission.READ))
            return next();
    }
    next(Errors_1.permissionError);
};
exports.READ = READ;
const UPDATE = (req, res, next) => {
    if ((0, CheckType_1.checkIsUser)(req.user)) {
        if (req.user.admin)
            return next();
        if (req.user.permissions.includes(client_1.Permission.UPDATE))
            return next();
    }
    next(Errors_1.permissionError);
};
exports.UPDATE = UPDATE;
const CREATE = (req, res, next) => {
    if ((0, CheckType_1.checkIsUser)(req.user)) {
        if (req.user.admin)
            return next();
        if (req.user.permissions.includes(client_1.Permission.CREATE))
            return next();
    }
    next(Errors_1.permissionError);
};
exports.CREATE = CREATE;
const DELETE = (req, res, next) => {
    if ((0, CheckType_1.checkIsUser)(req.user)) {
        if (req.user.admin)
            return next();
        if (req.user.permissions.includes(client_1.Permission.DELETE))
            return next();
    }
    next(Errors_1.permissionError);
};
exports.DELETE = DELETE;
