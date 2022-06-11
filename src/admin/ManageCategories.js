import React, { useState, useCallback, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getCategories ,deleteCategory } from './helper/adminapicall';
import { motion } from "framer-motion";
import {FaRegEdit} from 'react-icons/fa';
import {FiTrash2} from 'react-icons/fi';


export const ManageCategories = () => {
  
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();
  
  
  
  
  const preLoad = useCallback(() => {
    getCategories().then((data) => {
      if (data.deleteCategory) {
        setError(data.error);
      }
      else {
        setCategory(data);
      }
    }).catch((err) => console.log(err));
  }, []);
  const delProduct = useCallback((categoryId) => {
    deleteCategory(user._id, token, categoryId)
    .then((data) => {
      if (data.error) {
        setError(data.error);
      }
      else {
        preLoad();
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 1000);
      }
    })
  }, [preLoad, token, user._id]);
  
  
    
    
  
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
        <div className='alert alert-success' style={{ display: success ? 'block' : 'none', }}>Deleted successfully </div>
        )
      }, [success])
      
      
      return (
        <Base title="Welcome admin" description="Manage Categories here">
      {successMessage()}
      {errorMessage()}
      <Link className="btn btn-info rounded" to={`/adminDashboard`}>
        <span className="text-black ">Admin Home</span>
      </Link>
      <h2 className="mt-4 text-warning">All Categories ({category.length})</h2>
      {category.map((category, index) => {
        return (
          <motion.div key={index}
          animate={{ border:'2px solid #07962E', borderRadius:'5px', marginTop:"7px"}}
          transition={{ delay: 0.75 }}
          
          
          >
            <div className="row my-2" >
              <div className="col-12  mr-2 ">
                <div className="row text-center"  >
                  <div className="col-4 ">
                    <h3 className="text-white text-center ">  {category.name} </h3>
                  </div>
                  <div className="col-4">
                    <Link
                      className="btn btn-success rounded"
                      to={`/admin/category/update/${category._id}`}
                    >
                    Edit<span className='mx-2 pb-1'><FaRegEdit fontSize={20}/></span>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button onClick={() => {
                      delProduct(category._id)
                    }}
                      className="btn btn-danger rounded">
                      
            Remove<span className='mx-2 pb-1'><FiTrash2 fontSize={20}/></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}

    </Base>
  )
}
