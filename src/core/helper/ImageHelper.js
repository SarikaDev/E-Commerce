import React from 'react';
import { API } from '../../backend';
import { CardImg, Col } from 'reactstrap';
import { motion } from "framer-motion";

const ImageHelper = ({ product }) => {

    const imageurl = product ? `${API}/product/photo/${product._id}` : "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

    return (
        <motion.div transition={{ delay: 0.75 ,backgroundColor:'red'}}>
            <Col sm={{ offset: 2, size: 8 }}
                className="rounded border border-success  pt-2">
                <CardImg
                    src={`${imageurl}`}
                    alt='photos'
                    style={{height:'250px',objectFit:'cover'}}
                    className="mb-3 rounded "
                />
            </Col>
        </motion.div>
    )
}

export default ImageHelper;