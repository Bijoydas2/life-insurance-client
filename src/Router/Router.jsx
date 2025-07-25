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
import ManageApplications from "../Pages/Dashboard/AdminDashboard/MangeApplication/ManageApplications";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers";
import ManagePolicies from "../Pages/Dashboard/AdminDashboard/ManagePolicies/ManagePolicies";
import ManageTransactions from "../Pages/Dashboard/AdminDashboard/ManageTransaction/ManageTransactions";
import AssignedCustomers from "../Pages/Dashboard/AgentDashboard/AssignedCustomer";
import ManageBlogs from "../Pages/Dashboard/AdminAndCustomerPanel/ManageBlogs";
import MyPoliciesApplication from "../Pages/Dashboard/CustomerDashboard/MyPolicies/MyPolicesApplication";
import PaymentStatus from "../Pages/Dashboard/CustomerDashboard/PaymentStatus/PaymentStatus";
import Payment from "../Pages/Dashboard/CustomerDashboard/Payment/Payment";
import ClaimRequestPage from "../Pages/Dashboard/CustomerDashboard/ClaimRequest/ClaimRequestPage";
import PolicyClearancePage from "../Pages/Dashboard/AgentDashboard/PolicyClearancePage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import AdminRoute from "../Route/AdminRoute";
import AgentRoute from "../Route/AgentRoute";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";



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
       },
       {
        path:'/Profile',
        Component:ProfilePage
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
    index:true,
    Component:DashboardHome

    },
      // admin
    {
      path: 'applications',
      element:<AdminRoute><ManageApplications/></AdminRoute>
    },
    {
      path: 'users',
       element:<AdminRoute><ManageUsers/></AdminRoute>
    },
    {
      path: 'policies',
       element:<AdminRoute><ManagePolicies/></AdminRoute>
    },
    {
      path: 'transactions',
      element:<AdminRoute><ManageTransactions/></AdminRoute>
    },
    // agent and admin panel
     {
      path:'blogs',
      Component:ManageBlogs
    },
    // agent panel
    {
      path:'assigned',
      element:<AgentRoute><AssignedCustomers/></AgentRoute>
    },
    {
      path:'policy-clearance',
      element:<AgentRoute><PolicyClearancePage/></AgentRoute>
    },
    // customer panel
    {
      path:'my-applications',
      Component:MyPoliciesApplication
    },
    {
      path:'payment-status',
      Component:PaymentStatus,
    },
    {
      path: 'payment', 
      Component: Payment
      
      },
    {
      path: 'claim-request', 
      Component: ClaimRequestPage

      },
   
  ]
  }

]);