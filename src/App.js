import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './user/Signup';
import Home from './core/Home';
import Logout from './user/Logout';
import Signin from './user/Signin';
import Cart from './user/CartProfile';
import AdminDashBoard from './user/AdminDashBoard';
import UserDashBoard from './user/UserDashBoard';
import GuestRoutes from './auth/helper/GuestRoute';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import AdminRoutes from './auth/helper/AdminRoutes';
import { AddCategory } from './admin/AddCategory';
import { AddProduct } from './admin/AddProduct';
import { ManageCategories } from './admin/ManageCategories';
import { ManageProduct } from './admin/ManageProducts';
import { Orders } from './admin/Orders';
import { UpdateProduct } from './admin/UpdateProduct';
import { UpdateCategories } from './admin/UpdateCategories';
const App = () => {


  return (

    <div>
      <Routes>
        <Route element={<GuestRoutes />}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/cart' element={<Cart />} />
          <Route element={<AdminRoutes />}>
            <Route path='/adminDashboard' element={<AdminDashBoard />} />
            <Route path='/admin/create/category' element={<AddCategory />} />
            <Route path='/admin/manage/categories' element={<ManageCategories />} />
            <Route path='/admin/category/update/:categoryId' element={<UpdateCategories />} />
            <Route path='/admin/product' element={<AddProduct />} />
            <Route path='/admin/product/update/:productId' element={<UpdateProduct />} />
            <Route path='/admin/manage/products' element={<ManageProduct />} />
            <Route path='/admin/orders' element={<Orders />} />
          </Route>
          <Route path='/userDashboard' element={<UserDashBoard />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;

