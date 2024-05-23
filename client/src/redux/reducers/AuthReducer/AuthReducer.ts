import { createSlice } from "@reduxjs/toolkit";

type UserAuthType ={
    firstName:string,
    lastName:string,
    login:string,
    expired:number
}

type AutchType = {
    isAuth: boolean;
    user: UserAuthType;
}

const initialState = {
    isAuth: false,
    user:{
        firstName:"",
        lastName:"",
        login:"",
        expired:0
    }
} satisfies AutchType as AutchType;

const AuthReducer = createSlice({
    name:"AuthReducer",
    initialState: initialState,
    reducers: {
        setAuth: (state, {payload}):void => {
            state.isAuth = payload;
        },
        setUser: (state, {payload}):void => {
            state.user = payload;
        }
    }
})


export default AuthReducer.reducer;
export const { setAuth, setUser } = AuthReducer.actions;
