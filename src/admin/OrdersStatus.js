import React, { useCallback,useState } from 'react';
import Base from '../core/Base';
import { getAllOrderStatus } from '../admin/helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import {Button} from 'reactstrap'; 

const OrdersStatus = () => {
    const [Status, setStatus] = useState([]);
    const [error, setError] = useState('');
    const Auth = isAuthenticated();
    const { user, token } = Auth;


    const OrderStatus = useCallback(() => {
        getAllOrderStatus(user._id, token).then((data) => {
            if (data.deleteCategory) {
                setError(data.error);
            }
            else {
                setStatus(data);
            }
        }).catch((err) => console.log(err))
    }, [token, user])
    return (
        <div>
            <Base title='Order Status' description='Manage your  Order Status Here' >
                {error}
                {Status.map((element,index)=>
                <h1 key={index}> {element}</h1>)}
            <Button onClick={() => { OrderStatus() }}>Fetch Status</Button>
            </Base>
        </div>
    )
}

export default OrdersStatus;