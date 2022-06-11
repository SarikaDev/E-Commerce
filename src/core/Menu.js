import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper/index';


const Menu = () => {
    const navigate = useNavigate();
    const isAuth = isAuthenticated();
    const handleHome = () => {
        navigate('/');
    }
    const handleProfile = () => {
        navigate('/profile');
    }
    // const handleCart = () => {
    //     navigate('/cart')
    // }
    const handleuserDashboard = () => {
        navigate('/userDashboard')
    }
    const handleAdminDashboard = () => {
        navigate('/admin-dashboard')
    }
    const handleSignup = () => {
        navigate('/Signup')
    }
    const handleSignin = () => {
        navigate('/signin')
    }
    const handleLogout = () => {
        navigate('/logout')
    }
    return (
        <div>
            <ul className='nav nav-tabs bg-dark pt-1 '>
                <li className='nav-item mx-2'>
                    <NavLink style={{ color: 'green' }} className='nav-link' to='/' onClick={handleHome}>Home</NavLink>
                </li>
                <li className='nav-item mx-2'>
                    <NavLink style={{ color: 'green' }} className='nav-link' to='/cart' onClick={handleProfile}>Cart</NavLink>
                </li>
                {/* <li className='nav-item   mx-2 '>
                    <NavLink style={{ color: 'green' }} className='nav-link' to='/cart' onClick={handleCart}>Cart</NavLink>
                </li> */}

                {isAuth && isAuth.user.role === 0 && ( 
                <li className='nav-item     mx-2'>
                    <NavLink style={{ color: 'green' }} className='nav-link' to='/userDashboard' onClick={handleuserDashboard}>U.Dashboard</NavLink>
                </li>
                )}

                {isAuth && isAuth.user.role === 1 && (
               <>
               <li className='nav-item  mx-2'>
                    < NavLink style={{ color: 'green' }} className='nav-link' to='/adminDashboard' onClick={handleAdminDashboard}>A.Dashboard</NavLink>
                </li> 
                 {/* <li className='nav-item     mx-2'>
                 <NavLink style={{ color: 'green' }} className='nav-link' to='/userDashboard' onClick={handleuserDashboard}>U.Dashboard</NavLink>
             </li> */}
               </>
                )}

{/* Condictional Rendering */}

                {isAuth && <li className='nav-item  mx-2'>
                    <NavLink style={{ color: 'red' }} className='nav-link' to='/logout' onClick={handleLogout}>Sign out</NavLink>
                </li>
                }
                {!isAuth ?
                   ( <>
                   <li className='nav-item  mx-2'>
                        <NavLink style={{ color: 'green' }} className='nav-link' to='/signup' onClick={handleSignup}>sign up</NavLink>
                    </li> 
                     <li className='nav-item  mx-2'>
                     <NavLink style={{ color: 'green' }} className='nav-link' to='/signin' onClick={handleSignin}>sign in</NavLink>
                 </li>
                   </>
                    ) :
                    null
                }
            </ul>
        </div>
    )
}

export default Menu;