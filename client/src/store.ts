import { Dispatch, Middleware, PayloadAction, UnknownAction, configureStore, createAction, createSlice } from "@reduxjs/toolkit";
import logger from 'redux-logger';

interface CounterState {
  value: number
  isAuth: boolean
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
  isAuth:false
}

type DataTEST = {
  value:number,
  isAuth?:boolean

}

type PayloadTest = {
  payload:{
    value:number,
    test:string,
    isAuth?:boolean
  }
}

export const add = createAction("test/add",(data:DataTEST):PayloadTest=>({
  payload:{
  value: data.value,
  isAuth:data.isAuth,
  test:"DUPA@!"
}}))

export const divide = createAction("test/div",(data:DataTEST):PayloadTest=>({
  payload:{
  value: data.value,
  test:"DUPA@2!"
}}))

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(add,(state,action)=>{
      console.log(action)
      state.value += action.payload.value
      state.isAuth = Boolean(action.payload.isAuth)
    }).addCase(divide,(state,action)=>{
      console.log(action)
      state.value -= action.payload.value
    })
  }
})

const reducer = {
  user: user.reducer,
};

const middlewareExtentions: Middleware<{}, any, Dispatch<UnknownAction>>[] = [];

if (process.env.NODE_ENV === 'development') {
  middlewareExtentions.push(logger);
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }).concat(...middlewareExtentions)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;