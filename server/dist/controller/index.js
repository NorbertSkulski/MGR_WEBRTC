"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("./User/UserController"));
const AuthController_1 = __importDefault(require("./Auth/AuthController"));
const ContactController_1 = __importDefault(require("./Contact/ContactController"));
const router = (0, express_1.Router)();
router.use("/user", UserController_1.default);
router.use("/contact", ContactController_1.default);
router.use("/auth", AuthController_1.default);
exports.default = router;
