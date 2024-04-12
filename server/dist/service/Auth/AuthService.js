"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const JWT_1 = require("../../utils/JWT/JWT");
const Datadase_1 = require("../../database/Datadase");
const Errors_1 = require("../../utils/Errors/Errors");
const bcrypt_1 = require("bcrypt");
const login = async (atuhCredentials) => {
    const user = await Datadase_1.prisma.user.findFirst({ where: { login: atuhCredentials.login } });
    if (!user)
        throw Errors_1.loginError;
    const match = await (0, bcrypt_1.compare)(atuhCredentials.password, user.password);
    if (!match)
        throw Errors_1.loginError;
    return { token: (0, JWT_1.generateToken)(user.login), userlogin: user.login };
};
exports.login = login;
