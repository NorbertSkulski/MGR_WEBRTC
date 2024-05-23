import { Dispatch, Middleware, UnknownAction, configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import AuthReducer from "./redux/reducers/AuthReducer/AuthReducer";
import SocketReducer from "./redux/reducers/SocketReducer/SocketReducer";

const reducer = {
  AuthReducer,
  SocketReducer
};

const middlewareExtentions: Middleware<{}, any, Dispatch<UnknownAction>>[] = [];

if (process.env.NODE_ENV === 'development') {
  middlewareExtentions.push(logger);
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true, serializableCheck:false }).concat(...middlewareExtentions)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;