import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Components/Register.tsx";
import LoginPage from "./Components/LoginPage.tsx";
import { AuthProvider } from "./services/AuthContext.tsx";
// import "bootstrap/dist/css/bootstrap.min.css";

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
