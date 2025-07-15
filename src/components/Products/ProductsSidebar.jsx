import React from 'react'
import './ProductsSidebar.css'
import NavLinkWithIcon from '../NavLinkWithIcon'
import apiClient from '../utils/api-client'
import useData from '../Hooks/useData'

const ProductsSideBar = () => {

  const {  data: categories, error } = useData('/category');

  return (
    <div className='products-side-bar'>
        <h2>Categories</h2>
        {error && <p className='form-error'>{error}</p>}
        <div className='category-list'>
            { categories && categories.map(category => (
              <div className='category-item' key={category._id}>
                <NavLinkWithIcon 
                  title={category.name} 
                  link={`/products?category=${category.name}`} 
                  emoji={`http://localhost:5000/category/${category.image}`}
                  sidebar={true}
                />
              </div>
            ))}
           
          
        </div>
    </div>
  )
}

export default ProductsSideBar