"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketInit = void 0;
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const lodash_1 = require("lodash");
const crypto_1 = require("crypto");
const socketInit = (app) => {
    const server = (0, http_1.createServer)(app);
    const io = new socket_io_1.Server(server, { path: "/socket", cors: { origin: process.env.origin?.split(',') } });
    let connectedUsers = [];
    const getUserSocketId = (userUUid) => {
        return connectedUsers.find(user => user.userUuid === userUUid)?.socketId || "";
    };
    const getUserFullName = (userUUid) => {
        return `${connectedUsers.find(user => user.userUuid === userUUid)?.name || ""} ${connectedUsers.find(user => user.userUuid === userUUid)?.lastName || ""}` || "";
    };
    // setInterval(() => {
    //     console.log("Connected users:", connectedUsers);
    // }, 5000)
    io.on('connection', (socket) => {
        socket.on("connectedUser", (userData) => {
            connectedUsers = (0, lodash_1.uniqBy)([...connectedUsers.filter(el => el.userUuid !== userData.uuid), { userUuid: userData.uuid, socketId: socket.id, name: userData.name, lastName: userData.lastName }], "userUuid");
            console.log("Users connected ", connectedUsers);
            io.emit("onlineUsers", connectedUsers.flatMap(el => el.userUuid));
        });
        socket.on("call", (payload) => {
            const roomId = (0, crypto_1.randomUUID)();
            socket.emit("call", { roomId: roomId, callerId: payload.fromUser, userFullName: getUserFullName(payload.toUser) });
            socket.to(getUserSocketId(payload.toUser)).emit("call", { roomId: roomId, callerId: payload.fromUser, userFullName: getUserFullName(payload.fromUser) });
            socket.join(roomId);
        });
        socket.on("acceptCall", (roomId) => {
            socket.join(roomId);
            io.to(roomId).emit("acceptedCall", roomId);
        });
        socket.on("callRejected", (roomId) => {
            const userId = getUserSocketId(roomId);
            if (Boolean(userId)) {
                io.to(userId).emit("callRejected", roomId);
                socket.leave(userId);
                return;
            }
            io.to(roomId).emit("callRejected", roomId);
            socket.leave(roomId);
        });
        socket.on("sendPeerToOther", (payload) => {
            io.to(payload.roomId).emit("getPeerFromOther", payload);
        });
        socket.on("sendAnswerToOther", (payload) => {
            console.log("getAnswerFromOther", payload);
            io.to(payload.roomId).emit("getAnswerFromOther", payload);
        });
        socket.on("clientInRoom", async (payload) => {
            let roomUsers = await io.in(payload).fetchSockets();
            io.to(payload).emit("clientInRoom", roomUsers.length);
        });
        socket.on("initCall", (payload) => {
            io.to(payload.roomId).emit("initCall", payload);
        });
        socket.on("onlineUsers", () => {
            socket.emit("onlineUsers", connectedUsers.flatMap(el => el.userUuid));
        });
        socket.on("disconnect", async () => {
            connectedUsers = [...connectedUsers.filter(el => el.socketId !== socket.id)];
            io.emit("onlineUsers", connectedUsers.flatMap(el => el.userUuid));
            console.log('Disconnect', socket.rooms);
        });
    });
    return server;
};
exports.socketInit = socketInit;
