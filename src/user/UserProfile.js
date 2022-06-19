import React,{useState,useCallback,useEffect} from 'react';
import Base from '../core/Base';
import { RetriveProfile, RetriveOrders } from '../admin/helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import { Table,Card,CardBody,CardTitle } from 'reactstrap';
import{AiOutlineEdit} from 'react-icons/ai';
import {  useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [error, setError] = useState('');
  const [status, setStatus] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate=useNavigate();

  
  const AProfile = useCallback(() => {
      const Auth = isAuthenticated();
      const {user,token}=Auth
      RetriveProfile(user._id, token).then((data) => {
          if (data.error) {
              setError(data.error);
            }
          else {
              setStatus(data);
          }
      }).catch((err) => console.log(err))
  }, [])
  
  const ROrders = useCallback(() => {
      const Auth = isAuthenticated();
      const {user,token}=Auth
      RetriveOrders(user._id, token).then((data) => {
          if (data.error) {
              setError(data.error);
            }
          else {
              setOrders(data);
          }
      }).catch((err) => console.log(err))
  }, [])

  console.log(status);
  console.log('Orders', orders );

  useEffect(() => {
      AProfile();
      ROrders()
    }
    , [AProfile, ROrders])
    

    const handleEdit =()=>{
        const Auth = isAuthenticated();
        const {user}=Auth;
        navigate(`/user/edit/${user._id}`);
        
      }


  return (
      <Base title='User Profile ' description='Keep Track on Your Details'>

          {error}
          
         <h3 className='text-warning text-center'>User Details</h3> 
          
          <Card className=" text-white text-center bg-dark border border-success " >
              <CardBody  >
                
                  <CardTitle tag="h5" >
                      User Name :  {status.name}  <AiOutlineEdit  className='mx-2' onClick={handleEdit} style={{cursor:'pointer'}}/>
                  </CardTitle>
                  <CardTitle tag="h5" className='mt-4'>
                      Email Address :  {status.email}
                  </CardTitle>
              </CardBody>
          </Card>
         <h3 className='text-warning text-center my-2'>Order Details</h3> 
          <Table
          >
              <thead>
                  <tr className='text-warning'>
                      <th >
                          Serial
                      </th>
                      <th>
                          Amount
                      </th>
                      <th>
                          Status
                      </th>
                      <th>
                          Address
                      </th>
                  </tr>
              </thead>
              {orders.map((order, index) =>
                  <tbody className='text-white' key={index}>
                      <tr>
                          <th scope="row">
                              {index + 1}
                          </th>
                          <td>
                              {order.amount}
                          </td>
                          <td>
                              {order.status}
                          </td>
                          <td>
                              {order.address}
                          </td>
                      </tr>

                  </tbody>
              )}


          </Table>



      </Base>

  )
}

export default UserProfile;
