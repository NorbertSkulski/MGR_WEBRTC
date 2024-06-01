"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const generateToken = (login) => {
    const opt = {
        expiresIn: `${process.env.JWT_EXPIRES}`, algorithm: process.env.JWT_ALGORITHM
    };
    return `${process.env.TOKEN_PREFIX} ${(0, jsonwebtoken_1.sign)({ login }, `${process.env.SECRET_JWT}`, opt)}`;
};
exports.generateToken = generateToken;
