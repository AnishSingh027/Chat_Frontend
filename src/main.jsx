import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { SocketProvider } from "./contexts/Socket.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthProvider>
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  </AuthProvider>,
  // </StrictMode>
);
