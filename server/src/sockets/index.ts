import { Server, Socket } from "socket.io";
import { Express } from 'express';
import { createServer, Server as HttpServer } from "http";
import { User } from "@prisma/client";
import { uniqBy } from "lodash";
import { randomUUID } from "crypto";

type ConnectedUserType = {
    userUuid: string;
    socketId: string;
    name: string;
    lastName: string;
    connectedDate?: Date;
}

type CallType = {
    fromUser: string;
    toUser: string;
    roomId?: string;
}

type SendPeer = { 
    roomId: string;
    userUuid:string;
    peerOffer:any;
}

export const socketInit = (app: Express) => {


    const server: HttpServer = createServer(app);
    const io = new Server(server, { path: "/api/socket", cors: { origin: process.env.origin } });
    let connectedUsers: ConnectedUserType[] = []; 

    const getUserSocketId = (userUUid: string): string => {
        return connectedUsers.find(user => user.userUuid === userUUid)?.socketId || ""
    }

    const getUserFullName = (userUUid: string): string => {
        return `${connectedUsers.find(user => user.userUuid === userUUid)?.name || ""} ${connectedUsers.find(user => user.userUuid === userUUid)?.lastName || ""}` || ""
    }

    io.on('connection', (socket: Socket) => {
       
        socket.on("connectedUser", (userData: User) => {
            connectedUsers = uniqBy([...connectedUsers.filter(el => el.userUuid !== userData.uuid), { userUuid: userData.uuid, socketId: socket.id, name: userData.name, lastName: userData.lastName }], "userUuid");
            console.log("Users connected ", connectedUsers)
            io.emit("onlineUsers",connectedUsers.flatMap(el=>el.userUuid));
        })

        socket.on("call", (payload: CallType) => {
            const roomId = randomUUID();
            socket.emit("call", { roomId: roomId, callerId: payload.fromUser, userFullName: getUserFullName(payload.toUser) });
            socket.to(getUserSocketId(payload.toUser)).emit("call", { roomId: roomId, callerId: payload.fromUser, userFullName: getUserFullName(payload.fromUser) });
            socket.join(roomId);
        })

        socket.on("acceptCall", (roomId: string) => {
            socket.join(roomId)
            io.to(roomId).emit("acceptedCall", roomId)
        });

        socket.on("callRejected", (roomId: string) => {
            const userId = getUserSocketId(roomId);
            if (Boolean(userId)) {
                io.to(userId).emit("callRejected", roomId)
                socket.leave(userId);
                return;
            }

            io.to(roomId).emit("callRejected", roomId)
            socket.leave(roomId);
        });

        socket.on("sendPeerToOther",(payload:SendPeer)=>{
            io.to(payload.roomId).emit("getPeerFromOther",payload);
        });

        socket.on("sendAnswerToOther",(payload:SendPeer)=>{
            console.log("getAnswerFromOther",payload)
            io.to(payload.roomId).emit("getAnswerFromOther",payload);
        });

        socket.on("clientInRoom",async (payload)=>{
            let roomUsers=await io.in(payload).fetchSockets()
            io.to(payload).emit("clientInRoom",roomUsers.length)
        })

        socket.on("initCall",(payload)=>{
            io.to(payload.roomId).emit("initCall",payload)
        })

        socket.on("onlineUsers",()=>{
            socket.emit("onlineUsers",connectedUsers.flatMap(el=>el.userUuid));
        })

        socket.on("disconnect", async () => {
            connectedUsers =[...connectedUsers.filter(el => el.socketId !== socket.id)];
            io.emit("onlineUsers",connectedUsers.flatMap(el=>el.userUuid));
            console.log('Disconnect', socket.rooms)
        })
    });

    return server;
} 