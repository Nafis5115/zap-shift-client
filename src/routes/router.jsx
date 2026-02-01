import { createBrowserRouter } from "react-router";
import App from "../App";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/Home/Home/HomePage";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "coverage",
        Component: Coverage,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);

export default router;
