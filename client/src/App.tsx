import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Suspense, lazy, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthElement } from "./utils/Router/AuthElement";
 // @ts-ignore: Unreachable code error
import {NotificationContainer} from 'react-notifications';

const Login = lazy(() => import("./pages/Login/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));

const queryClient = new QueryClient();

function App() {

  
// const askForMediaDevices =async () => {
//   const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
//   stream.getTracks().forEach((track: any) => {
//     if (track.readyState == "live") {
//       track.stop();
//     }
//   });
// }
// useEffect(()=>{
//   askForMediaDevices();
// },[])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <HashRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route index element={<Navigate to="/dashboard" />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/dashboard/*"
                  element={
                    <AuthElement>
                      <Dashboard />
                    </AuthElement>
                  }
                />
              </Routes>
            </Suspense>
          </HashRouter>
        </div>
      </QueryClientProvider>
      <NotificationContainer/>
    </>
  );
}

export default App;
