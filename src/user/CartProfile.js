import React, { useMemo, useState } from 'react'
import Base from '../core/Base';
import { IoMdPricetag } from 'react-icons/io';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { TbPlayerTrackNext } from 'react-icons/tb';
import { useCart } from '../contexts/CartContext';
import { Card, CardTitle, CardBody, Row, Input, Button, Alert, } from 'reactstrap';
import { useCallback } from 'react';
import { createSingleOrder } from '../admin/helper/adminapicall';
import { isAuthenticated } from '../auth/helper';

const CartProfile = () => {
  const { cartItems, setCartItems } = useCart();
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  console.log('CARTOTEm', cartItems);

  const finalProductCount = useMemo(() => cartItems.reduce((finalCount, cartItem) =>
    finalCount += cartItem.count
    , 0), [cartItems])

  const amount = useMemo(() => cartItems.reduce((finalAmount, cartItem) => {
    finalAmount += cartItem.count * cartItem.price
    return finalAmount
  }, 0), [cartItems]);


  const handleOnClick = useCallback(() => {
    const { user, token } = isAuthenticated();
    if(cartItems.length){

      createSingleOrder(user._id, token, { address, products: cartItems.map((cartItem) => ({ product: cartItem._id, quantity: cartItem.count })), amount }).then((data) => {
        if (data.error) {
        setError(data.error);
        setSuccess(false);
      }
      else {
        setError(false);
        setSuccess(true);
        setCartItems([]);
        setAddress('');
        
      }
    })
  }
  else{
    setError('ADD FEW CART ITEMS')
  }

  }, [address, amount, cartItems, setCartItems])

  const emptyCart = useCallback(() => {
          if(cartItems.length === 0){
            return ( 
              <Alert className='alert alert-success mt-3' >Cart is Empty </Alert>
            )
          }
  }, [cartItems.length]) ;


  console.log(cartItems)

  const successMessage = useCallback(() => {
    return (
      <div className='alert alert-success mt-3' style={{ display: success ? 'block' : 'none' }}>Created Succesfully {success} </div>
    )
  }, [success])

  const errorMessage = useCallback(() => {
    return (
      <div className='alert alert-danger mt-3' style={{ display: error ? 'block' : 'none' }}> Error {error}</div>
    )
  }, [error])

  return (
    <div>
      <Base title='Cart List' description='Total Product Count'>
        {successMessage()}
        {errorMessage()}
        {emptyCart()}
        {cartItems.map(useCallback((cartItem, index) =>
          <div key={index} >

            <Card className=" text-white bg-dark border border-success " >
              <CardBody  >
                <Row className='my-1 text-center text-warning' >
                  <h2>{cartItem.count}   <TbPlayerTrackNext />  <AiOutlineShoppingCart />  </h2>
                </Row>
                <CardTitle tag="h5" className='mt-4'>
                  Category  :  {cartItem?.category?.name}
                </CardTitle>
                <CardTitle tag="h5" className='mt-4'>
                  Product   :  {cartItem.name}
                </CardTitle>
                <CardTitle tag="h5" className='mt-4'>
                  Description    :  {cartItem.description}
                </CardTitle>
                <CardTitle tag="h5" className=' mt-4'>
                  Price ($)  : {cartItem.price} <IoMdPricetag fontSize={20} />
                </CardTitle>
              </CardBody>
            </Card>
          </div>
          , [])
        )}
        <Input
          type='text' placeholder='address' value={address} onChange={(e) => { setAddress(e.target.value) }}
        />

        <h4 className=' mt-4 text-end  text-info'>
          Cart  Count : {finalProductCount}
        </h4>
        <h4 className=' mt-4 text-end  text-info'>
          Final Amount : {amount}
        </h4>
        <hr />
        <Button className=' btn bg-warning text-black ' onClick={handleOnClick}>CheckOut</Button>
      </Base>
    </div>
  )
}

export default CartProfile;