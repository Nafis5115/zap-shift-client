import { createBrowserRouter } from "react-router";
import App from "../App";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/Home/Home/HomePage";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Rider from "../pages/Rider/Rider";
import ApproveRiders from "../pages/Dashboard/ApproveRiders/ApproveRiders";
import UserManagement from "../pages/Dashboard/UserManagement/UserManagement";

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
      {
        path: "send-parcel",
        Component: SendParcel,
        loader: async () => {
          return fetch("warehouses.json").then((res) => res.json());
        },
      },
      {
        path: "rider",
        Component: Rider,
        loader: async () => {
          return fetch("warehouses.json").then((res) => res.json());
        },
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
  {
    path: "dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "approve-riders",
        Component: ApproveRiders,
      },
      {
        path: "user-management",
        Component: UserManagement,
      },
    ],
  },
]);

export default router;
