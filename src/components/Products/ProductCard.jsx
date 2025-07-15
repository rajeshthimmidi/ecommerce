import React,{useContext} from 'react'
import './ProductCard.css';
import iphoneImage from '../../assets/iphone.jpg';
import basket from '../../assets/basket.png'
import star from '../../assets/white-star.png'
import { NavLink } from 'react-router-dom';         
import CartContext from '../../contexts/CartContext';
import UserContext from '../../contexts/userContext';
import config from '../../config.json';

const ProductCard = ({product}) => {
      const {addToCart} = useContext(CartContext);
      const user = useContext(UserContext);
    //   console.log(product);
  return (
    <article className='product-card'>
        <div className='product-image'>
            <NavLink to={`/product/${product?._id}`}>
                <img src={`${config.backendURL}/products/${product?.images[0]}`} alt='Product' /></NavLink>
        </div>

        <div className='product-details'>
            <h3 className='product-title'>{product?.title}</h3>
            <span className='product-price'>${product?.price}</span>
            <footer className='align-center product-info-footer'>
                <div className='align-center'>
                    <p className='product-rating'>
                        <img src={star} alt='star' />{product?.reviews.rate ? product?.reviews.rate : '0'}
                    </p>
                    <p className='product-review-count'>{product?.reviews.counts ? product?.reviews.counts : '0'}</p>
                </div>
                {product?.stock > 0 && user && <button className='add-to-cart' onClick={() => addToCart(product, 1)}>
                    <img src ={basket} alt='basket'/>
                </button>}
            </footer>
        </div>
    </article>
  )
}

export default ProductCard