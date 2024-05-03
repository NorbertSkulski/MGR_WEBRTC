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
    isAuth: true,
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
        }
    }
})


export default AuthReducer.reducer;
export const { setAuth } = AuthReducer.actions;

// export const add = createAction("test/add",(data:DataTEST):PayloadTest=>({
//     payload:{
//     value: data.value,
//     isAuth:data.isAuth,
//     test:"DUPA@!"
//   }}))
  
//   export const divide = createAction("test/div",(data:DataTEST):PayloadTest=>({
//     payload:{
//     value: data.value,
//     test:"DUPA@2!"
//   }}))
  
// extraReducers:(builder)=>{
//     builder.addCase(add,(state,action)=>{
//       console.log(action)
//       state.value += action.payload.value
//       state.isAuth = Boolean(action.payload.isAuth)
//     }).addCase(divide,(state,action)=>{
//       console.log(action)
//       state.value -= action.payload.value
//     })
//   }