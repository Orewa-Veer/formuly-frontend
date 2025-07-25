import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import LoginPage from "./Components/LoginPage.tsx";
import Register from "./Components/Register.tsx";
import "./index.css";
import { AuthProvider } from "./services/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>

        <Route
          path="/app/*"
          element={
            <AuthProvider>
              <App />
            </AuthProvider>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
