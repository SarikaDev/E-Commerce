import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Base from '../core/Base';
import { getSingleCategory, updateCategory } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';

export const UpdateCategories = () => {

    const params = useParams();
    const {token,user}=isAuthenticated();
    const { categoryId } = params;
const navigate=useNavigate();
    const [values, setValues] = useState({
        category:[],
        name:'',
        success:'',
        error:'',

    })

    const {error,success,name,category}=values;
    const handleChange=(e)=>{
        setValues((prev)=>({...prev, name:e.target.value}))
    }


    const preLoad = useCallback((categoryId)=>{
        getSingleCategory(categoryId).then((data)=>{
            if(data.error){
                setValues((prev)=>({...prev,error:data.error}))
            }
            else{
                setValues((prev)=>({...prev,category:data , name:data.name}))
            }
        })
    },[])


    useEffect(()=>{
        preLoad(categoryId)
    },[categoryId, preLoad])
    
    const onSubmit =(e)=>{
        e.preventDefault();

        updateCategory({name},categoryId,user._id,token).then((data)=>{
            if(data.error){
                setValues((prev)=>({...prev,error:data.error, category:'',success:false }))
            }
            else{
    
                setValues((prev)=>({...prev,error:false,   success:true}))
                setTimeout(() => {
                    navigate('/admin/manage/categories')
            }, 1000);
            }
        })

        
    }


    const successMessage = useCallback(() => {
        return (
            <div className='alert alert-success mt-3' style={{ display: success ? 'block' : 'none' }}> Updated Succesfully {success} </div>
        )
    }, [ success])

    const errorMessage = useCallback(() => {
        return (

            <div className='alert alert-danger mt-3' style={{ display: error ? 'block' : 'none' }}> Error {error}</div>
        )

    }, [error])


    const createProductForm = () => (
        <form onSubmit={onSubmit} >
            {successMessage()}
            {errorMessage()}
            <div className='text-center'> <h3 className='text-center text-white my-2'>Post photo</h3></div >
            <div className="form-group my-1">
                    {category && (
                         <input
                         onChange={handleChange}
                         name="category"
                         className="form-control"
                         placeholder="Name"
                         value={name}
                     />
                    )}
            </div>
           
  

            <button type="submit" className="btn btn-outline-success m-2 rounded">
                Update  Category
            </button>
        </form>
    );

    return (
        <div>
            <Base title='Update  a Category here' description='Welcome to category Modification Section' className='container bg-info p-4 rounded'>
                <Link to="/adminDashboard" className='btn btn-success rounded'> Admin Home</Link>
                <Link to="/admin/manage/categories" className='btn btn-dark rounded mx-5'> Manage Category</Link>
                <div className="row bg-dark text-white rounded my-2">
                    <div className='col-md-8 offset-md-2'>{createProductForm()}</div>
                </div>
            </Base>
        </div>
    )
}