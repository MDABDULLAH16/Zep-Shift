import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import Coverage from "../pages/Coverage/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      { path: "coverage",loader:()=>fetch('/serviceCenter.json'), Component: Coverage },
    ],
  },
]);
