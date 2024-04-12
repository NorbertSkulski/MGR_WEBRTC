import { Server, Socket } from "socket.io";
import { Express } from 'express';
import { createServer, Server as HttpServer } from "http";


export const socketInit = (app:Express) => {
    const server :HttpServer = createServer(app);
    const io = new Server(server);

    io.on('connection', (socket:Socket) => {
        console.log('a user connected',socket.id);
        socket.on("message",(message)=>{
            console.log(":",message)
            socket.emit("message", "hello user")
        })
    });

    

    return server;
} 