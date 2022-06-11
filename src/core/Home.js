import React, { useState, useEffect, useCallback } from 'react';
import Base from '../core/Base';
import MainCard from './Card'
import { getProducts } from '../admin/helper/adminapicall';
import {MdProductionQuantityLimits} from 'react-icons/md'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  
  const loadAllProducts = useCallback(() => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      }
      else {
        setProducts(data);
      }
    })
  }, []);

  useEffect(() => {
    loadAllProducts()
  }, [loadAllProducts])

  console.log(products)
  return (
    <div>{error}
      <Base title='Home Page' description='welcome to the T-shirt Store' >
        <div className='row my-2 tex-center'>
          <h1 className='text-white'> All  Products <MdProductionQuantityLimits fontSize={30}/> </h1>
          <div className='row'>
            {products.map((product) => 
                <div className='col-4 ' key={product._id}>
                  <MainCard productData={product} />
                </div>
              
            )}
          </div>
        </div>
      </Base>
    </div>
  )
}

export default Home;