"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const ErrorHandler = (err, req, res, next) => {
    console.error("Error:", err);
    if (!err) {
        next();
    }
    res.status(err.code).json(err.message);
};
exports.ErrorHandler = ErrorHandler;
