import React, { useState, useEffect } from 'react'
import './FeaturedProduct.css';
import ProductCard from '../Products/ProductCard';
import { getFeaturedProducts } from '../services/cartServices';

const FeaturedProduct = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  
  useEffect(() => {
    getFeaturedProducts()
      .then(res => {
        setFeaturedProducts(res.data);
      })
      .catch(error => {
        console.error('Error fetching featured products:', error);
      });

  }, []);


  return (
    <section className='featured-products'>
        <h2 >Featured Products</h2>

        <div className=' align-center featured-products-list'>
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
    </section>
  )
}

export default FeaturedProduct
