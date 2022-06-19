import React, { useState, useCallback, useEffect } from 'react';
import Base from '../core/Base';
import { Form, FormGroup, InputGroup, Input, Button } from 'reactstrap';
import { createSingleOrder, getProducts } from '../admin/helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
// import { Alert } from 'reactstrap';


const AddOrders = () => {
  const Auth = isAuthenticated();
  const { user, token } = Auth;
  const [values, setValues] = useState({
    address: '',
    stock: '',
    amount: '',
    product: '',
    quantity: '',
    products: [],
    createdProduct: '',
    success: '',
    error: '',
    formData: new FormData()
  })
  const { address, stock, amount, product, quantity, formData, error, success, products } = values;

  const preLoad = useCallback(() => {
    getProducts().then((data) => {
      if (data.error) {
        setValues((prev) => ({ ...prev, error: data.error, success: false }))
      }
      else {
        setValues((prev) => ({
          ...prev,
          products: data.map((ui)=>({ product:ui._id,quantity:ui.stock,name:ui.name})),
        }))
      }
    })
      .catch((err) => console.log(err));
  }, [])

  console.log("PRO", products)

  useEffect(() => {

    preLoad()
  }, [preLoad])



  const handleChange = name => e => {
    const value = (name === 'photo' ? e.target.files[0] : e.target.value);
    formData.set(name, value);
    setValues((prev) => ({ ...prev, [name]: e.target.value,  }))
  }

  console.log(values)


 const  handleSumit =useCallback((e)=>{
  e.preventDefault();
  createSingleOrder(user._id,token,values).then((data)=>{
  if(data.error){
    setValues((prev) => ({ ...prev, error: data.error, success: false }))
    }
    else{
    setValues((prev) => ({ ...prev,error: false,success:true,user:user._id ,createdProduct:data.name}))
    }
    console.log(data)
  })

 },[values, token, user._id])

 const successMessage = useCallback(() => {
  return (
    <div className='alert alert-success mt-3' style={{ display: success ? 'block' : 'none' }}>Created Succesfully {success} </div>
  )
}, [ success])

const errorMessage = useCallback(() => {
  return (
    <div className='alert alert-danger mt-3' style={{ display: error ? 'block' : 'none' }}> Error {error}</div>
  )
}, [error])

  return (
    <div>
      <Base title='Sample'>
        <Form onSubmit={handleSumit}>
          <FormGroup >
            
            {successMessage()}
            {errorMessage()}
            <InputGroup>
              <Input type='text' placeholder='Address' name='address' value={address} onChange={handleChange('address')} />
            </InputGroup>
            <InputGroup>
              <select
                onChange={handleChange('product')}
                name='product'
                className='flow-control'
                type='select'
                >
          <option >Select </option>
                {
                  products.map((productList,index) =>
                  <option key={index} className='bg-dark text-white' name='product' value={productList.product}>{productList.name}</option>
                  )}
                  </select>
            </InputGroup>
            <InputGroup>
              <Input type='number' placeholder='quantity' name='quantity' value={quantity} onChange={handleChange('quantity')} />
            </InputGroup>
            <InputGroup>
              <Input type='number' placeholder='amount' name='amount' value={amount} onChange={handleChange('amount')} />
            </InputGroup>
            <InputGroup>
              <Input type='number' placeholder='Stock' name='stock' value={stock} onChange={handleChange('stock')} />
            </InputGroup>
          <Button type='submit'>Submit</Button>
          </FormGroup>
        </Form>

      </Base>
    </div>
  )
};

export default AddOrders;
