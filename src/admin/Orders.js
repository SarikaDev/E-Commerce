import React, { useState, useCallback } from 'react';
import Base from '../core/Base';
import { Table, Button } from 'reactstrap';
import { getAllOrders } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/status');
  }
  
  const AllOrders = useCallback(() => {
    const Auth = isAuthenticated();
    const { user, token } = Auth;
    getAllOrders(user._id, token).then((data) => {
      if (data.deleteCategory) {
        setError(data.error);
      }
      else {
        setOrders(data);
      }
    }).catch((err) => console.log(err))
  }, [])

  useEffect(()=>{
    AllOrders()
  },[AllOrders ])


  console.log(orders)
  return (
    <div>
      <Base title='Orders' description='Manage your  Orders Here' >
        <div>
          {error}

          <Table bordered className='text-warning' >
            <thead  >
              <tr>
                <th>
                  S.no
                </th>
                <th>
                  User Name
                </th>
                <th>
                  Status
                </th>
                <th>
                  Amount
                </th>
                <th>
                  Address
                </th>
              </tr>
            </thead>
            {orders.map((order, index) =>
              <tbody className='text-white' key={index} >
                <tr>
                  <th scope="row">
                    { index + 1}
                  </th>
                  <td>
                    {order.user.name}
                  </td>
                  <td>
                    {order.status}  
                  </td>
                  <td>
                    {order.amount}
                  </td>
                  <td>
                    {order.address}
                  </td>
                </tr>
              </tbody>
            )}
          </Table>
          <Button onClick={handleRedirect}>Redirect TO Status</Button>
        </div>
      </Base>
    </div>
  )
}
