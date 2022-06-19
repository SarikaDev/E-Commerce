import React, { useCallback, useState, useEffect } from 'react';
import Base from '../core/Base';
import { RetriveProfile, RetriveOrders } from '../admin/helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import {  Card, CardBody, CardTitle } from 'reactstrap';
import { AiOutlineEdit } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';



const AdminProfile = () => {
    const [error, setError] = useState('');
    const [status, setStatus] = useState([]);
    const [orders, setOrders] = useState([]);
    const Auth = isAuthenticated();
    const { user, token } = Auth;
    const navigate = useNavigate();

    const params = useParams();
    const { userId } = params;
    const handleEdit = () => {
        navigate(`/user/edit/${user._id}`);

    }

    const AProfile = useCallback(() => {
        RetriveProfile(user._id, token).then((data) => {
            if (data.error) {
                setError(data.error);
            }
            else {
                setStatus(data);
            }
        }).catch((err) => console.log(err))
    }, [token, user])

    const ROrders = useCallback(() => {
        RetriveOrders(user._id, token).then((data) => {
            if (data.error) {
                setError(data.error);
            }
            else {
                setOrders(data);
            }
        }).catch((err) => console.log(err))
    }, [token, user])

    useEffect(() => {
        AProfile();
        ROrders()
    }
        , [])
    return (
        <Base title='Admin Profile '>
            {error}
            <h3 className='text-warning text-center'>Admin Details</h3>
            <Card className=" text-white text-center bg-dark border border-success " >
                <CardBody  >
                    <CardTitle tag="h5" >
                        UserName :  {status.name} <AiOutlineEdit className='mx-2' onClick={handleEdit} style={{ cursor: 'pointer' }} />
                    </CardTitle>
                    <CardTitle tag="h5" className='mt-4'>
                        Email Address :  {status.email}
                    </CardTitle>
                </CardBody>
            </Card>
        </Base>
    )
}

export default AdminProfile;
