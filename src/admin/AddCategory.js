import React, { useState, useCallback } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { useNavigate } from 'react-router-dom';
import { FormGroup, Form, InputGroup, Input, Button, Alert } from 'reactstrap';
import { createCategory } from './helper/adminapicall';
import {IoMdArrowRoundBack}from 'react-icons/io';
import {IoMdCreate}from 'react-icons/io';;

export const AddCategory = () => {
  const navigate = useNavigate();
  const Auth = isAuthenticated();
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = Auth;

  const goBack = useCallback(() => {
    navigate('/adminDashboard')
  }, [navigate])



  const handleChange = useCallback((e) => {
    setName(e.target.value);
  }, [])

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

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      }
      else if (data) {
        setError(false);
        setSuccess(data.category.name);
        setName('');
        setTimeout(() => {
          navigate('/admin/manage/categories')
        }, 2000);
      }
      console.log(data)
    })
  }, [name, navigate, token, user._id]);

  const myCategoryForm = () => {
    return (<>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <h3 className='my-2'>  Category </h3>
          <InputGroup >
            <Input className=' my-3 ' type='text' onChange={handleChange} value={name} autoFocus placeholder='Create Here' />
          </InputGroup>
          <Button className='btn btn-success  rounded ' type='submit'> Create Category {<IoMdCreate fontSize={20}/>}</Button>
          <Button className='btn-warning text-black rounded  mx-5 ' style={{ fontWeight: 'bold' }} onClick={goBack} > {<IoMdArrowRoundBack fontSize={20}/>}  DashBoard </Button>
        </FormGroup>
      </Form>
    </>)

  }
  return (
    <div>

      <Base title="Create A Category here" description='Add a new category for new T-shirts' className='container bg-info p-4 rounded'>
        <div className='row bg-white rounded '>
          {successMessage()}
          {errorMessage()}
          <div className='col-md-8 offsert-md-2'> {myCategoryForm()}</div>
        </div>
      </Base>
    </div>
  )
}
