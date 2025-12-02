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
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import BeRider from "../pages/Rider/BeRider/BeRider";
import RiderApproved from "../pages/Dashboard/RiderApproved/RiderApproved";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../pages/Dashboard/AssignRiders/AssignRiders";
import RiderRoute from "./RiderRoute";
import AssignedDeliveries from "../pages/Dashboard/AssignedDeliveries/AssignedDeliveries";

export const router = createBrowserRouter([
  //root layout;
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
      {
        path: "rider",
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
        Component: BeRider,
      },
    ],
  },
  //auth layout;
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
  //dashboard layout
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
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "sendParcel",
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
        Component: SendParcel,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "paymentSuccess",
        Component: PaymentSuccess,
      },
      {
        path: "paymentCancelled",
        Component: PaymentCancel,
      },
      {
        path: "rider-apply",
        element: (
          <AdminRoute>
            <RiderApproved />
          </AdminRoute>
        ),
      },
      {
        path: "assign-riders",
        element: (
          <AdminRoute>
            <AssignRiders />
          </AdminRoute>
        ),
      },

      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement />
          </AdminRoute>
        ),
      },
      //rider routes
      {
        path: "assigned-deliveries",
        element: <AssignedDeliveries />,
      },
    ],
  },
]);
