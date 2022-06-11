import React, { useState, useEffect, useCallback } from 'react';
import { Link ,useParams } from 'react-router-dom';
import Base from '../core/Base';
import { getCategories, getSingleProduct, updateProduct } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';

export const UpdateProduct = () => {

    const params=useParams();
    const {productId} =params;
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
        formData: "",   
    });

    const { name, description, price, stock, categories, category,  error, createdProduct, success, photo, formData } = values;

    const Auth = isAuthenticated();
    const { user, token } = Auth;

    const preLoad = useCallback(() => {
        getSingleProduct(productId).then((data) => {
            if (data.error) {
                setValues((prev) => ({ ...prev, error: data.error ,success:false }))
            }
            else {
                preLoadCategories();
                setValues((prev) => ({
                    ...prev,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category:data.category?._id,
                    stock: data.stock,
                    formData:new FormData(),
                    success:true,
                    error:false
                }))
            }
            console.log('Preload Data',data)
        })
            .catch((err) => console.log(err));
    }, [productId])


    useEffect(() => {
        preLoad(productId);
    }, [productId, preLoad]);

    
    console.log(values)

    const preLoadCategories = () => { 
        getCategories().then((data)=>{
            if(data.error){
                setValues((prev)=>({...prev,error:data.error,success:true}))
            }
            else{
                setValues((prev)=>({...prev,success:true,error:false,categories:data,formData:new FormData()}))
            }
            // console.log("Preload Categories",data)
        })
    }


    const handleChange = name => e => {
        const value = (name === 'photo' ? e.target.files[0] : e.target.value);
        formData.set(name, value);
        setValues((prev) => ({ ...prev, [name]: e.target.value }))
    }
    // console.log('Handle Change', values)

    // console.log(formData);

    const onSubmit = useCallback((e) => {
        e.preventDefault();

        updateProduct(user._id,token,productId,formData).then((data) => {
            if (data.error) {
                setValues((prev) => ({ ...prev, error: data.error, success: false }))
            } else  {
                setValues((prev) => ({ ...prev, name: '', error: false, description: '', price: '', stock: '', category:'', success: true, createdProduct: data?.name }))
            }
            // console.log('Error',data)
        })
    }, [formData, productId, token, user._id])


    const successMessage = useCallback(() => {
        return (
            <div className='alert alert-success mt-3' style={{ display: createdProduct ? 'block' : 'none' }}> {createdProduct}Created Succesfully {success} </div>
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
            <div className='text-center'> <h3 className='text-center text-white my-2'>Post photo</h3></div >
            <div className="form-group">
                <label className="btn btn-block btn-success  rounded my-2" style={{ display: "block" }}>
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group my-1">
                <input
                    onChange={handleChange("name")}
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    required
                />
            </div>
            <div className="form-group my-1">
                <textarea
                    onChange={handleChange("description")}
                    name="description"
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
                />
            </div>
            <div className="form-group my-1">
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                    name={category}
                >
                    <option >Select </option>
                    {categories &&
                        categories.map((cate, index) =>
                            <option key={index} className='bg-dark text-white' value={cate?._id}>{cate?.name}</option>
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
                />
            </div>

            <button type="submit" className="btn btn-outline-success m-2 rounded">
                Update  Product
            </button>
        </form>
    );

    return (
        <div>
            <Base title='Update  a Product here' description='Welcome to product Modification Section' className='container bg-info p-4 rounded'>
                <Link to="/adminDashboard" className='btn btn-success rounded'> Admin Home</Link>
                <Link to="/admin/manage/products" className='btn btn-dark rounded mx-5'> Manage Product</Link>
                <div className="row bg-dark text-white rounded my-2">
                    <div className='col-md-8 offset-md-2'>{createProductForm()}</div>
                </div>
            </Base>
        </div>
    )
}



