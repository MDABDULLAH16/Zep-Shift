import React from 'react';
import useRole from '../hooks/useRole';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader/Loader';
import { Navigate, useNavigate } from 'react-router';
import Forbidden from '../components/Forbidden/Forbidden';

const RiderRoute = ({ children }) => {

    const {   loading } = useAuth();
    const { role, roleLoading } = useRole();
   
    if (loading||roleLoading) {
        return <Loader></Loader>
    }
    
    if (  role!=='rider') {
        return <Forbidden></Forbidden>
    }
    return children
};

export default RiderRoute;