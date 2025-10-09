import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { PublicProtected, PrivateProtected } from "./components/Protected";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";

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
          <PublicProtected>
            <Home />
          </PublicProtected>
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
          <PrivateProtected>
            <Login />
          </PrivateProtected>
        ),
      },
      {
        path: "/signup",
        element: (
          <PrivateProtected>
            <Signup />
          </PrivateProtected>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <PrivateProtected>
            <ForgotPassword />
          </PrivateProtected>
        ),
      },
      {
        path: "/update-password",
        element: (
          <PrivateProtected>
            <UpdatePassword />
          </PrivateProtected>
        ),
      },
    ],
  },
]);

export default router;
