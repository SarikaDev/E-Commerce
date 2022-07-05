import React, { useMemo } from 'react';
import ImageHelper from './helper/ImageHelper';
import { Card, CardTitle, CardBody, Button, Badge, Row, } from 'reactstrap';
import { IoMdPricetag } from 'react-icons/io';
import { useCart } from '../contexts/CartContext';
import { ToastContainer } from 'react-toastify';


const MainCard = ({ productData }) => {
    const { cartItems, addToCart, removeFromCart } = useCart();
    const count = useMemo(() => {
        const item = cartItems.find(cartItem => cartItem._id === productData._id)
        return item?.count || 0
    }, [cartItems, productData._id]);

    console.log('demo', cartItems)
    const cardTitle = productData ? productData.name : 'A photo from Default DB'
    const cardDescription = productData ? productData.description : 'A photo from Default Deacription '
    const cardPrice = productData ? productData.price : 'Default 5  '
    const cardCategory = productData ? productData?.category?.name : 'Default 5  '
    const cardStock = productData ? productData.stock : 'Default 5  '
    const outOfStock = productData ? 'Out of Stock' : null;
    const message = `${cardStock} Items left`;

    if (productData.stock === 0) {
        return (
            <Card className=" text-white bg-dark border border-success  mt-5 " inverse>
                <div className='text-center mt-2'>
                    <Badge className='m-2 py-2 text-black' pill color="warning" >
                        {cardCategory}
                    </Badge>
                </div>
                <CardBody >
                    <Row>
                        <ImageHelper product={productData} />
                    </Row>
                    <CardTitle tag="h5" className='mt-4'>
                        {cardTitle}
                    </CardTitle>
                    <p className='my-2'>
                        {cardDescription}
                    </p>
                    <p >
                        Price ($)  : {cardPrice} <IoMdPricetag fontSize={20} />
                    </p>
                    <p>
                        {cardStock ? message : outOfStock}
                    </p>
                </CardBody>
            </Card>
        )
    }
    else{

        return (<>
        <ToastContainer />

        <Card className=" text-white bg-dark border border-success  mt-5" inverse>
            <div className='text-center mt-2'>
                <Badge className='m-2 py-2 text-black' pill color="warning" >

                    {cardCategory}
                </Badge>
            </div>

            <CardBody >
                <Row>
                    <ImageHelper product={productData} />
                </Row>
                <CardTitle tag="h5" className='mt-4'>
                    {cardTitle}
                </CardTitle>
                <p className='my-2'>

                    {cardDescription}
                </p>
                <p >

                    Price ($)  : {cardPrice} <IoMdPricetag fontSize={20} />
                </p>
                <p>

                    {cardStock ? message : outOfStock}
                </p>

                <div className="flex" >
                    <Button onClick={() => removeFromCart(productData)}> - </Button>
                    <Button> {count} </Button>
                    <Button onClick={() => addToCart(productData)}> + </Button>
                </div>
            </CardBody>
        </Card>
    </>
    );
}
};

export default MainCard;


