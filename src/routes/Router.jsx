import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import SendParcel from "../pages/SendParcel/SendParcel";
import PrivateRoute from "./PrivateRouter";
import DashboardLayout from "../layout/DashboradLayout/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
        Component: Coverage,
      },
      {
        path: "sendParcel",
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
        Component: SendParcel,
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
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "myParcels",
        Component: MyParcels,
      },
      {
        path: "sendParcel",
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
        Component: SendParcel,
      },
      {
        path: 'payment/:parcelId',
        Component:Payment
      }
    ],
  },
]);
