"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registration = void 0;
const User_1 = require("../../model/Models/User");
const registration = async (user) => {
    const newUser = new User_1.User({ ...user });
    return await newUser.save();
};
exports.registration = registration;
