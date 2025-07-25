import React from 'react';
import UseAuth from '../hooks/UseAuth';
import useUserRole from '../hooks/UseUserRole';

const AgentRoute = ({children}) => {
    const {user,loading}= UseAuth();
    const {role, isLoading}=useUserRole();

      if(loading || isLoading){
        return <span className="loading loading-spinner loading-xs"></span>
      }

       if(!user || role !== 'agent'){
   return <Navigate state={{form: location.pathname}} to="/forbidden"></Navigate>
    }


    return children;
};

export default AgentRoute;