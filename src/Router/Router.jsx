import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AuthLayout from "../Layouts/AuthLayout";
import Home from "../Pages/Home/Home";
import AllPolicies from "../Pages/AllPolicies/AllPolicies";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children: [
      {
        index:true,
        Component:Home,
      },
      {
        path:'/allPolicies',
        Component:AllPolicies,
      }
    ]
  },
   {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register,
        loader: () => fetch('./serviceCenter.json'),
      }
    ]
  },
]);