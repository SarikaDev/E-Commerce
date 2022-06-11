import React from 'react';
import {isAuthenticated} from './index';
import {Outlet,Navigate} from 'react-router-dom';
const PrivateRoutes = () => {
 const Auth = isAuthenticated();
    return Auth ? <Outlet/> : <Navigate to='/signin' />;
};

export default PrivateRoutes;