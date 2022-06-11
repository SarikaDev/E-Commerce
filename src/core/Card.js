import React, { useState } from 'react';
import ImageHelper from './helper/ImageHelper';
import { useNavigate } from 'react-router-dom';
import { addItemToCart } from './helper/CartHelper';
import { Card, CardTitle, CardBody, Button, Badge ,Row } from 'reactstrap';
import {IoMdPricetag} from 'react-icons/io';


const MainCard = ({ AddToCart = true, RemoveFromCart = false, productData }) => {
    const navigate = useNavigate();
    const [count, setCount] = useState(productData.count);
    const cardTitle = productData ? productData.name : 'A photo from Default DB'
    const cardDescription = productData ? productData.description : 'A photo from Default Deacription '
    const cardPrice = productData ? productData.price : 'Default 5  '
    const cardCategory = productData ? productData.category.name : 'Default 5  '

    const [redirect, setRedirect] = useState('')



    const addToCart = () => {
        addItemToCart(productData, () => setRedirect(true))
    }

    const getARedirect = (redirect) => {
        if (redirect) {
            return (navigate('/cart'));
        }
    }

    const showAddToCart = (AddToCart) => {
        return (
            AddToCart && (
                <Button
                    onClick={addToCart}
                    className="btn btn-success display-block text-white  mt-2 mb-2 "
                >
                    Add to Cart
                </Button>
            )
        )
    }

    const removeFromCart = () => {
        return (
            RemoveFromCart && (
                <button
                    onClick={() => { }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button>
            )
        )
    }

    return (<>
        {redirect}
        <Card className=" text-white bg-dark border border-success " inverse>
            <Badge className='m-2 py-2 text-black' pill color="warning" >
                New
            </Badge>

            <CardBody >
                {getARedirect(true)}
                <Row className='my-1'> 
                <ImageHelper product={productData} />
                </Row>
                <CardTitle tag="h5" className='mt-4'>
                    Category  :  {cardCategory}
                </CardTitle>
                

                <CardTitle tag="h5" className='mt-4'>
                    Product   :  {cardTitle}
                </CardTitle>
                <CardTitle tag="h5" className='mt-4'>
                    Description    :  {cardDescription}
                </CardTitle>

                <CardTitle tag="h5" className=' mt-4'>
              Price ($)  : {cardPrice} <IoMdPricetag fontSize={20}/>
                </CardTitle>

                <div className="row" >
                    <div className="col-10" >
                        {showAddToCart(AddToCart)}
                    </div>
                    <div className="col-12 " >
                        {removeFromCart(RemoveFromCart)}
                    </div>
                </div>
            </CardBody>

        </Card>
    </>
    );
};

export default MainCard;


