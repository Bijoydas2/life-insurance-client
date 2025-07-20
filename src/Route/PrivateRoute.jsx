import React, { use } from 'react';
import { AuthContext } from '../Context/Context';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading';


const PrivateRoute = ({children}) => {
    const {user,loading} = use(AuthContext) 
    const location= useLocation();

    if(loading){
      return <Loading/>
    }

    if(!user){
      return   <Navigate to='/login' state={location.pathname}></Navigate>
    }

    return children;
};

export default PrivateRoute;