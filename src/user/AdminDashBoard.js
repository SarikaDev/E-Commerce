import React, { useCallback } from 'react'
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper/index';
import { Badge, Card, CardBody, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { motion } from "framer-motion";


const AdminDashBoard = () => {
    const isAuth = isAuthenticated();
    const { user: { name, email, role } } = isAuth;

    const AdminLeftSide = useCallback(() => {
        return (
            <>
                <motion.div
                    animate={{ border: '2px solid black', borderRadius: '5px', margin: "7px" }}
                    transition={{ delay: 0.75 }}
                >
                    <Card>
                        <h4 className='text-white text-center bg-black py-2'>Admin Navigation</h4>
                        <ListGroup>
                            <ListGroupItem>
                                <NavLink to='/admin/create/category' className='text-success nav-link' style={{ fontWeight: 'bolder' }} >Create Category</NavLink>
                                <NavLink to='/admin/manage/categories' className='text-success nav-link' style={{ fontWeight: 'bolder' }} >Manage Categories</NavLink>
                                <NavLink to='/admin/product' className='text-success nav-link' style={{ fontWeight: 'bolder' }} >Create Product</NavLink>
                                <NavLink to='/admin/manage/products' className='text-success nav-link' style={{ fontWeight: 'bolder' }} >Manage Products</NavLink>
                                <NavLink to='/admin/orders' className='text-success nav-link' style={{ fontWeight: 'bolder' }} >Manage Orders</NavLink>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </motion.div>
            </>
        )
    }, [])

    const AdminRightSide = useCallback(() => {
        return (<>
            <motion.div
                animate={{ border: '2px solid black', borderRadius: '5px', margin: "7px" }}
                transition={{ delay: 0.75 }}
            >

                <Card >
                    <CardBody>
                        <h4 className='mb-4 m-2'> Admin Info </h4>
                        <ListGroup>
                            <ListGroupItem>
                                <Badge className='text-center text-white bg-danger py-2'>Admin Area </Badge>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Badge className='text-center text-white bg-success py-2'>Name: </Badge>  <span className='mx-3' style={{ fontWeight: 'bolder' }}>{name}</span>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Badge className='text-center text-white bg-success py-2'>Email: </Badge>  <span className='mx-3' style={{ fontWeight: 'bolder' }}>{email}</span>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Badge className='text-center text-white bg-success py-2'>Role: </Badge>  <span className='mx-3' style={{ fontWeight: 'bolder' }}>{role}</span>
                            </ListGroupItem>
                        </ListGroup>
                    </CardBody>
                </Card>
            </motion.div>
        </>
        )
    }, [email, name, role])


    return (
        <div>
            <Base title='AdminDashBoard Area' description='Manage all of your products here' className=' bg-success     p-2 m-2'>
                <motion.div
                    animate={{  borderRadius: '5px', margin: "7px" }}
                    transition={{ delay: 0.75 }}
                >
                    <Row >
                        <Col sm='12' md='4'  >
                            {AdminLeftSide()}
                        </Col>
                        <Col sm='12' md='8 '>
                            {AdminRightSide()}
                        </Col>
                    </Row>
                </motion.div>
            </Base>
        </div>
    )
}

export default AdminDashBoard;