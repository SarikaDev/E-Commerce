import React from 'react';
import {isAuthenticated} from './index';
import {Outlet,Navigate} from 'react-router-dom';
const AdminRoutes = () => {
 const isAuth = isAuthenticated();

 return (isAuth && isAuth.user.role === 1 ) ? <Outlet/> : <Navigate to='/userProfile' />;
 
};

export default AdminRoutes;