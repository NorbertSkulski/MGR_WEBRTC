"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registration = void 0;
const Datadase_1 = require("../../database/Datadase");
const bcrypt_1 = require("bcrypt");
const registration = async (user) => {
    return await Datadase_1.prisma.user.create({ data: { ...user, password: (0, bcrypt_1.hashSync)(user.password, 15) } });
    ;
};
exports.registration = registration;
