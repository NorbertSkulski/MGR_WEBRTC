"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const JWT_1 = require("../../utils/JWT/JWT");
const Datadase_1 = require("../../database/Datadase");
const Errors_1 = require("../../utils/Errors/Errors");
const bcrypt_1 = require("bcrypt");
const lodash_1 = require("lodash");
const login = async (atuhCredentials) => {
    try {
        const user = await Datadase_1.prisma.user.findFirst({ where: { login: atuhCredentials.login }, include: { friendOf: true, friends: true, friendRequestFrom: true, friendRequestTo: true }, });
        if (!user)
            throw Errors_1.loginError;
        const match = await (0, bcrypt_1.compare)(atuhCredentials.password, user.password);
        if (!match)
            throw Errors_1.loginError;
        const userData = (0, lodash_1.cloneDeep)(user);
        delete userData.password;
        return { token: (0, JWT_1.generateToken)(user.login), userData: userData };
    }
    catch (err) {
        console.error(err);
        throw Errors_1.loginError;
    }
};
exports.login = login;
