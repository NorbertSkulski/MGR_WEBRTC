"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requerstError = exports.loginError = exports.permissionError = void 0;
exports.permissionError = { code: 403, message: "User not perrmision" };
exports.loginError = { code: 401, message: "Bad credentials" };
const requerstError = (err) => ({ code: 500, message: err });
exports.requerstError = requerstError;
