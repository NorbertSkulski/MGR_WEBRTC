"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketInit = void 0;
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const socketInit = (app) => {
    const server = (0, http_1.createServer)(app);
    const io = new socket_io_1.Server(server);
    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);
        socket.on("message", (message) => {
            console.log(":", message);
            socket.emit("message", "hello user");
        });
    });
    return server;
};
exports.socketInit = socketInit;
