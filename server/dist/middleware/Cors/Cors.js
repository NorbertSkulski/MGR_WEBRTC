"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.innerCors = void 0;
const cors_1 = __importDefault(require("cors"));
exports.innerCors = (0, cors_1.default)({
    origin: process.env.origin,
    credentials: process.env.NODE_ENV === 'development'
});
