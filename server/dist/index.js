"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Session_1 = require("./middleware/Session/Session");
const ErrorHandler_1 = require("./middleware/ErrorHandler/ErrorHandler");
const sockets_1 = require("./sockets");
const Cors_1 = require("./middleware/Cors/Cors");
const app = (0, express_1.default)();
const port = process.env.PORT;
const path = process.env.INIT_PATH || "/";
app.use(Cors_1.innerCors);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(Session_1.app_session);
app.use((0, cookie_parser_1.default)(process.env.SECRET_SESSION));
//Routes
app.use(path, controller_1.default);
//ERROR_HANDLER
app.use(ErrorHandler_1.ErrorHandler);
const server = (0, sockets_1.socketInit)(app);
server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at port: ${port}`);
});
exports.default = server;
