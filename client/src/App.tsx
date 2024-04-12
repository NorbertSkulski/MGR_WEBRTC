import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthElement } from "./utils/Router/AuthElement";

const Login = lazy(() => import("./pages/Login/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));

const queryClient = new QueryClient();

function App() {
  return (
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
  );
}

export default App;
