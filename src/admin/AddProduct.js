import React, { useState, useEffect, useCallback } from 'react';
import {useNavigate} from 'react-router-dom';
import Base from '../core/Base';
import {Button} from 'reactstrap';
import {IoMdArrowRoundBack} from 'react-icons/io';
import { getCategories, createSingleProduct } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
export const AddProduct = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categories: [],
    category: '',
    photo: '',
    error: '',
    createdProduct: '',
    success: false,
    formData: new FormData() 
  });

  const { name, description, price, stock, categories, category, error, createdProduct, success, photo, formData } = values;

  const Auth = isAuthenticated();
  const { user, token } = Auth;

  const goBack =()=>{
    navigate('/adminDashboard');
    
  }

  const preLoad = useCallback(() => {
    getCategories().then((data) => {
      if (data.error) {
        setValues((prev) => ({ ...prev, error: data.error }))
      }
      else {
        setValues((prev) => ({ ...prev, categories: data, success: true}))
      }
    })
      .catch((err) => console.log(err))
  }, [])


  useEffect(() => {
    preLoad();
  }, [preLoad]);

  const handleChange = name => e => {
    const value = (name === 'photo' ? e.target.files[0] : e.target.value);
    formData.set(name, value);
    setValues((prev) => ({ ...prev, [name]: e.target.value }))
  }
 

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    createSingleProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues((prev) => ({ ...prev, error: data.error, success: false }))
      } else {
        setValues((prev) => ({ ...prev, name: '', error: false, description: '', price: '', stock: '', photo: '', success: true, createdProduct: data.name }))
        setTimeout(() => {
          navigate('/admin/manage/products')
        }, 2000);
      }

    })
  }, [formData, navigate, token, user._id])


  const successMessage = useCallback(() => {
    return (
      <div className='alert alert-success mt-3' style={{ display: createdProduct ? 'block' : 'none' }}>{createdProduct} Created Succesfully {success} </div>
    )
  }, [createdProduct, success])

  const errorMessage = useCallback(() => {
    return (
      <div className='alert alert-danger mt-3' style={{ display: error ? 'block' : 'none' }}> Error {error}</div>
    )
  }, [error])

  const createProductForm = () => (
    <form onSubmit={onSubmit} >
      {successMessage()}
      {errorMessage()}
      <h3 className='text-center'> Phost Image</h3 >

      <div className="form-group">
        <label className="btn btn-block btn-success  rounded my-2" style={{ display: "block" }}>
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
            value={photo}
            required
          />
        </label>
      </div>
      <div className="form-group my-1">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
          required
        />
      </div>
      <div className="form-group my-1">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          type="text"
          className="form-control"
          placeholder="Description"
          value={description}
          required
        />
      </div>
      <div className="form-group my-1">
        <input
          onChange={handleChange("price")}
          type="number"
          name="price"
          className="form-control"
          placeholder="Price"
          value={price}
          required
        />
      </div>
      <div className="form-group my-1">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
          value={category}
          required
        >
          <option >Select </option>
          {categories &&
            categories.map((cate, index) =>
              <option key={index} className='bg-dark text-white' value={cate._id}>{cate.name}</option>
            )}
        </select>
      </div>
      <div className="form-group my-1">
        <input
          onChange={handleChange("stock")}
          type="number"
          name="stock "
          className="form-control"
          placeholder="Quantity"
          value={stock}
          required
        />
      </div>

      <button type="submit" className="btn btn-outline-success m-2 rounded">
        Create Product

      </button>
        <Button className='btn-warning text-balck m-2 rounded' onClick={goBack} > {<IoMdArrowRoundBack fontSize={20}/>}  DashBoard </Button>
    </form>
  );

  return (
    <div>
      <Base title='Add a Product here' description='Welcome to product Creaction Section' className='container bg-info py-3 px-4 rounded'>
        <div className="row bg-dark text-white rounded my-2">
          <div className='col-md-8 offset-md-2'>{createProductForm()}</div>
        </div>
      </Base>
    </div>
  )
}
