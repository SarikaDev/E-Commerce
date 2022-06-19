import React, { useState } from 'react';
import Base from '../core/Base';
import { editOrderStatus } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import { useParams } from 'react-router-dom';
const EditOrderStatus = () => {
  const { user, token } = isAuthenticated();
  const params = useParams();
  const { orderId } = params;
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  editOrderStatus(user._id, token, orderId).then((data) => {
    if (data.error) {
      setError((prev) => ({ prev, error: data.error }))
    }
    else{
      setName((prev)=>({prev,name:data}))
    }
  })

  return (
    <Base title='Order Edit ' description='Customize order Status Here'>
      {error}
      {JSON.stringify(name)}
    </Base>
  )
}

export default EditOrderStatus;