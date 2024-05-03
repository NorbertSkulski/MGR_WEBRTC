import { Dispatch, Middleware, UnknownAction, configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import AuthReducer from "./redux/reducers/AuthReducer/AuthReducer";

const reducer = {
  AuthReducer,
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