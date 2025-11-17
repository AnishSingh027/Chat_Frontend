import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { PublicProtected, PrivateProtected } from "./components/Protected";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import { UserProvider } from "./contexts/UserContext";
import { AuthProvider } from "./contexts/AuthContext";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  // Private routes
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <AuthProvider>
            <PrivateProtected>
              <Home />
            </PrivateProtected>
          </AuthProvider>
        ),
      },
    ],
  },

  // public routes
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/login",
        element: (
          <AuthProvider>
            <Login />
          </AuthProvider>
        ),
      },
      {
        path: "/signup",
        element: (
          // <PublicProtected>
          <Signup />
          // </PublicProtected>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          // <PublicProtected>
          <ForgotPassword />
          // </PublicProtected>
        ),
      },
      {
        path: "/update-password",
        element: (
          // <PublicProtected>
          <UpdatePassword />
          // </PublicProtected>
        ),
      },
    ],
  },
]);

export default router;
