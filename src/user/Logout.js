import React ,{useState,useCallback}from 'react';
import Base from '../core/Base';
import { signout } from '../auth/helper/index';
import { isAuthenticated } from '../auth/helper';
import { Alert, Button } from 'reactstrap';
import {Link } from 'react-router-dom';

const Logout = () => {
  const Auth = isAuthenticated();
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const { token } = Auth;

  const handleOnClick = useCallback(() => {
    
    signout(() => {
      localStorage.removeItem('jwt');
    },token).then((res)=>{
      setMessage(res.message)
      setSuccess(true)
    
    })
      
    .catch((er)=>{console.log(er)}) ;
  },[token])


  return (
    <div>
      <Base title='Logout Page' >
        <Alert style={{display: success ? 'block' : 'none'}}> {message} <Link to="/signin">Redirect  to Home  </Link></Alert> 
        <Button className='btn btn-danger ' onClick={handleOnClick}> Log Out</Button>
      </Base>
    </div>
  )
}

export default Logout