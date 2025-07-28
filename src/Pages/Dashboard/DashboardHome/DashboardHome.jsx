import React from 'react';
import useUserRole from '../../../hooks/UseUserRole';
import Loading from '../../../Components/Loading';
import AgentDashboard from './AgentDashboard';
import AdminDashboard from './AdminDashboard';
import CustomerDashboard from './CustomerDashboard';

const DashboardHome = () => { 
const {role,isLoading}= useUserRole();
if(isLoading){
  return  <Loading></Loading>
}

if (role === 'customer'){
    return <CustomerDashboard></CustomerDashboard>
}
else if (role === 'agent'){
    return <AgentDashboard></AgentDashboard>
}
else if (role === 'admin'){
    return <AdminDashboard></AdminDashboard>
}
else{
    return <Forbidden> </Forbidden>
}
};

export default DashboardHome;