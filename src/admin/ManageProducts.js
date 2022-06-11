import React, { useState, useCallback, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getProducts } from './helper/adminapicall';
import { deleteProduct } from './helper/adminapicall';
import { motion } from "framer-motion";
import {FaRegEdit} from 'react-icons/fa';
import {FiTrash2} from 'react-icons/fi';


export const ManageProduct = () => {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false)
  const { user, token } = isAuthenticated();

  
  const preLoad = useCallback(() => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      }
      else {
        setProducts(data);
      }
      console.log('products',data);
    }).catch((err) => console.log(err));
  }, []);
    const delProduct = useCallback(  (productId) => {
      deleteProduct(user._id, token, productId)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        }
        else {
          preLoad();
          setSuccess(true);
        }
      })
    },[preLoad, token, user._id]);

    
     
    

    useEffect(() => {
     
    preLoad()
    }, [preLoad]);

  const errorMessage = useCallback(() => {
    return (
      <div className='alert alert-danger mt-3' style={{ display: error ? 'block' : 'none' }}>  {error}</div>
)
  }, [error]);

  const successMessage = useCallback(() => {
    return (
      <div className='alert alert-success' style={{ display: success ? 'block' : 'none', }}>Delete Done successfully </div>
    )
  }, [success])


  return (
    <Base title="Welcome admin" description="Manage products here">
      {successMessage()}
      {errorMessage()}
      <Link className="btn btn-info rounded" to={`/adminDashboard`}>
        <span >Admin Home</span>
      </Link>
      <h2 className="my-4 text-warning ">All products  ({products.length}) </h2>
      {products.map((product, index) => {
        return (

          <motion.div className="row" 
          animate={{ border:'2px solid #07962E', borderRadius:'5px', marginTop:"7px"}}
          transition={{ delay: 0.75 }}
          
          key={index}>
            <div className="col-12 my-2">
              <div className="row text-center mb-2 "  >
                <div className="col-4">
                  <h3 className="text-white text-center"> {product.name}</h3>        
                <h5 className='text-white text-center'> </h5>
                  </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success rounded "
                    to={`/admin/product/update/${product._id}`}
                  >
                  Edit  <span className='mx-2 pb-1'><FaRegEdit fontSize={20}/></span>
               
                  </Link>
                </div>
                <div className="col-4">
                  <button onClick={() => {
                    delProduct(product._id)
                  }}
                    className="btn btn-danger rounded">
                    Remove<span className='mx-2 pb-1'><FiTrash2 fontSize={20}/></span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}

    </Base>
  )
}
