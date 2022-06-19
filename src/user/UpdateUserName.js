import React,{useCallback,useState} from 'react'
import Base from '../core/Base';
import { editUserName } from '../admin/helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import {FormGroup,Form,Input,InputGroup,Button,Alert} from 'reactstrap'
import {IoMdCreate} from 'react-icons/io'
import { useNavigate } from 'react-router-dom';

const UpdateUserName = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [name, setName] = useState([]);
    const Auth = isAuthenticated();
    const navigate=useNavigate();
    const { user, token } = Auth;

    const handleChange = useCallback((e) => {
        setName(e.target.value);
      }, [])




    
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    editUserName(user._id,token,{name}).then((data) => {
      if (data.error) {
        setError(data.error);
      }
      else if (data) {
        setError(false);
        setSuccess(true);
        setName(data.name);
        setTimeout(() => {
          navigate('/adminProfile')
        }, 2000);
      }
      console.log(data);
    })
  }, [name, navigate, token, user._id]);

  const successMessage = useCallback(() => {
    if (success) {
      return (
        <Alert className='text-success text-center' style={{ display: success ? 'block ' : 'none' }}> {<span style={{ fontWeight: 'bolder' }} >{success}</span>}  Created successfully </Alert>
      )
    }
  }, [success]);

  const errorMessage = useCallback(() => {
    if (error) {
      return (
        <Alert className='alert-danger text-center  ' style={{ fontWeight: "bold", display: error ? 'block' : 'none' }}>{<span style={{ fontWeight: 'bolder' }}>{error}</span>}</Alert>
      )
    }
  }, [error]);



    return (
        <Base>
        {successMessage()}
        {errorMessage()}
        <Form onSubmit={onSubmit}>
        <FormGroup>
          <h3 className='my-2'>  User Name </h3>
          <InputGroup >
            <Input className=' my-3 ' type='text' onChange={handleChange} value={name} autoFocus placeholder='Edit Here' />
          </InputGroup>
          <Button className='btn btn-success  rounded ' type='submit'> Update  {<IoMdCreate fontSize={20}/>}</Button>
        </FormGroup>
      </Form>
        </Base>
    )
}

export default UpdateUserName;