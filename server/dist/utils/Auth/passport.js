"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const lodash_1 = require("lodash");
const customExtractor = (req) => {
    const token = (0, lodash_1.get)(req, 'signedCookies.Authorization', null);
    if (token && token.startsWith("Bearer"))
        return token.replace("Bearer", "").trim();
    return null;
};
const options = {
    jwtFromRequest: customExtractor,
    secretOrKey: process.env.SECRET_JWT,
    algorithms: ['HS512']
};
passport_1.default.use(new passport_jwt_1.Strategy(options, (payload, done) => {
    console.log("TESTE::", payload);
    done(null, { name: "ELIO" });
}));
exports.default = passport_1.default;
