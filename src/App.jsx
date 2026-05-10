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
import { AllUserProvider } from "./contexts/AllUsers";
import Profile from "./pages/Profile";
import SentRequest from "./pages/SentRequest/SentRequest";
import ReceivedRequest from "./pages/ReceivedRequest/ReceivedRequest.jsx";
import ConnectionRequest from "./pages/ConnectionRequest/ConnectionRequest.jsx";
import Chat from "./pages/Chat/Chat.jsx";
import { OnlineUserProvider } from "./contexts/OnlineUserContext";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const PrivateLayout = () => {
  return (
    <PrivateProtected>
      <UserProvider>
        <AllUserProvider>
          <OnlineUserProvider>
            <Outlet />
          </OnlineUserProvider>
        </AllUserProvider>
      </UserProvider>
    </PrivateProtected>
  );
};

const router = createBrowserRouter([
  // Private routes
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      // Private pages
      {
        element: <PrivateLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/sent-request",
            element: <SentRequest />,
          },
          {
            path: "/received-request",
            element: <ReceivedRequest />,
          },
          {
            path: "/connections",
            element: <ConnectionRequest />,
          },
          {
            path: "/chat/:targetUserID",
            element: <Chat />,
          },
        ],
      },
      // Public pages
      {
        path: "/login",
        element: (
          <PublicProtected>
            <Login />
          </PublicProtected>
        ),
      },
      {
        path: "/signup",
        element: (
          <PublicProtected>
            <Signup />
          </PublicProtected>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <PublicProtected>
            <ForgotPassword />
          </PublicProtected>
        ),
      },
      {
        path: "/update-password",
        element: (
          <PublicProtected>
            <UpdatePassword />
          </PublicProtected>
        ),
      },
    ],
  },
]);

export default router;
