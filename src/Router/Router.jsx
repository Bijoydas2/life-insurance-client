import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AuthLayout from "../Layouts/AuthLayout";
import Home from "../Pages/Home/Home";
import AllPolicies from "../Pages/AllPolicies/AllPolicies";
import PolicyDetailsPage from "../Pages/PolliciesDetails/PolicyDetailsPage";
import QuotePage from "../Pages/PolliciesDetails/QuotePage";
import PrivateRoute from "../Route/PrivateRoute";
import ApplicationForm from "../Pages/Application/ApplicationForm";
import BlogsPage from "../Pages/BlogsPage/BlogsPage";
import BlogDetailsPage from "../Pages/BlogDetailsPage/BlogDetailsPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import ManagePolicies from "../Pages/Dashboard/ManagePolicies";
import ManageTransactions from "../Pages/Dashboard/ManageTransactions";
import ManageApplications from "../Pages/Dashboard/ManageApplications";

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
      },
      {
        path:'/policy/:id',
        Component:PolicyDetailsPage,
      },
      { 
        path: "/quote",
        element:<PrivateRoute><QuotePage/></PrivateRoute>
      },  
      { 
        path: "/application",
        element:<PrivateRoute><ApplicationForm/></PrivateRoute>
      },
      {
       path: "/blogs",
       Component: BlogsPage,
       },
       {
       path: "/blogs/:id",
       element:<PrivateRoute><BlogDetailsPage/></PrivateRoute>
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
       
      }
    ]
  },
  { path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
     children: [
    {
      path: 'applications',
      Component: ManageApplications,
    },
    {
      path: 'users',
      Component: ManageUsers,
    },
    {
      path: 'policies',
      Component: ManagePolicies,
    },
    {
      path: 'transactions',
      Component: ManageTransactions,
    }
  ]
  }

]);