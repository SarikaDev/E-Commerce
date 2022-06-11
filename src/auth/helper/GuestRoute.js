import React from 'react';
import {isAuthenticated} from './index';
import {Outlet,Navigate} from 'react-router-dom';
const GuestRoutes = () => {
 const Auth = isAuthenticated();
    return !Auth ? <Outlet/> : <Navigate to='/' />;
};

export default GuestRoutes;