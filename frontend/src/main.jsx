import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "./app/Home";
import { Login } from "./app/Login";
import { Profile } from "./app/Profile";
import { Registration } from "./app/Registration";
import { ChangePassword } from "./app/ChangePassword";
import { VerifyEmail } from "./app/VerifyEmail";
import { DeleteAccount } from "./app/DeleteAccount";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/changePassword",
    element: <ChangePassword />,
  },
  {
    path: "/verifyUserMail/:name/:token",
    element: <VerifyEmail />,
  },
  {
    path: "/deleteAccount",
    element: <DeleteAccount />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
