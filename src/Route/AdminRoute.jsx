import React from 'react';
import { Navigate } from 'react-router';
import useUserRole from '../hooks/UseUserRole';
import UseAuth from '../hooks/UseAuth';

const AdminRoute = ({children}) => {
    const {user,loading}= UseAuth();
    const {role, isLoading}=useUserRole();

      if(loading || isLoading){
        return <span className="loading loading-spinner loading-xs"></span>
      }

       if(!user || role !== 'admin'){
   return <Navigate state={{form: location.pathname}} to="/forbidden"></Navigate>
    }


    return children;
};

export default AdminRoute;