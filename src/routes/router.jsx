import { createBrowserRouter } from "react-router";
import App from "../App";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/Home/Home/HomePage";
import Coverage from "../pages/Coverage/Coverage";

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
]);

export default router;
