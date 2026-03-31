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
      // Private pages
      {
        index: true,
        element: (
          <PrivateProtected>
            <UserProvider>
              <AllUserProvider>
                <Home />
              </AllUserProvider>
            </UserProvider>
          </PrivateProtected>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateProtected>
            <UserProvider>
              <Profile />
            </UserProvider>
          </PrivateProtected>
        ),
      },
      {
        path: "/sent-request",
        element: (
          <PrivateProtected>
            <UserProvider>
              <AllUserProvider>
                <SentRequest />
              </AllUserProvider>
            </UserProvider>
          </PrivateProtected>
        ),
      },
      {
        path: "/received-request",
        element: (
          <PrivateProtected>
            <UserProvider>
              <AllUserProvider>
                <ReceivedRequest />
              </AllUserProvider>
            </UserProvider>
          </PrivateProtected>
        ),
      },
      {
        path: "/connections",
        element: (
          <PrivateProtected>
            <UserProvider>
              <AllUserProvider>
                <ConnectionRequest />
              </AllUserProvider>
            </UserProvider>
          </PrivateProtected>
        ),
      },
      {
        path: "/chat/:targetUserID",
        element: (
          <PrivateProtected>
            <UserProvider>
              <AllUserProvider>
                <Chat />
              </AllUserProvider>
            </UserProvider>
          </PrivateProtected>
        ),
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
