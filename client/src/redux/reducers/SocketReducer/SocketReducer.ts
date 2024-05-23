import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

type SocketType = {
    socket: Socket|null;
}

const initialState = {
    socket: null,
   
} satisfies SocketType as SocketType;

const SocketReducer = createSlice({
    name:"SocketReducer",
    initialState: initialState,
    reducers: {
        setSocket: (state, {payload}):void => {
            state.socket = payload;
        }
    }
})


export default SocketReducer.reducer;
export const { setSocket } = SocketReducer.actions;
