import React, { useState, useEffect, useContext, use } from 'react'
import './ProductsList.css';
import ProductCard from './ProductCard';
import { useSearchParams } from 'react-router-dom';
import useData from '../Hooks/useData';



const ProductsList = () => {



  const [search, setSearch] = useSearchParams();
  const [page, setPage] = useState(1);
  const category = search.get('category');
  const searchQuery = search.get('search') || '';

  const [sortBy, setSortBy] = useState('');
  const [sortedProducts, setSortedProducts] = useState([]);


  const { data , error } = useData(
    "/products",
    {
      params: {
        search: searchQuery || '',
        category: category || '',
        perpage:10,
        page,
        
      },
    }, [searchQuery,category, page]
  );

  useEffect(() => {
   setPage(1);
  }, [search, category]);

  const handlePageChange = (page) => {
    const currentParams = Object.fromEntries([...search]);

    setSearch({ ...currentParams, page: parseInt(currentParams.page) + 1 });
  }

  useEffect(() => {
    const handleScroll = () => {
      const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 1) {
        console.log('Reached the bottom of the page');
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [data]);


  useEffect(() => {
    if(data?.products && data.products.length > 0) {
      const Products = [...data.products];
      if (sortBy === 'price-asc') {
        Products.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-desc') {
        Products.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'rate-desc') {
        Products.sort((a, b) => b.reviews.rate - a.reviews.rate);
      } else if (sortBy === 'rate-asc') {
        Products.sort((a, b) => a.reviews.rate - b.reviews.rate);
      }
      setSortedProducts(Products);
    }
  }, [sortBy, data]);

 

  return (
     <section className='products-list-section'>
        <header className='align-center products-list-header'>
            <h2>Products</h2>
            <select className='products-sort' name='sort' id='' onChange={(e) => setSortBy(e.target.value)}>
                <option value=''>Relevance</option>
                <option value='price-asc'>Price Low to High</option>
                <option value='price-desc'>Price High to Low</option>
                <option value='rate-desc'>Rate High to Low</option>
                <option value='rate-asc'>Rate Low to High</option>
            </select>
        </header>
        <div className='products-list'>
          {error && <p className='form-error'>{error}</p>}
           {
             data?.products && data.products.length > 0 ? (
              sortedProducts.map(product => (
                <ProductCard key={product._id} 
                product={product}
                />
              ))
            ) : (
              <p className='form-error'>No products found</p>
            )
           }
        
        </div>
    </section>
  )
}

export default ProductsList