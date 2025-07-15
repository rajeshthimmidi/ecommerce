import React, { useContext,useState } from 'react'
import { useParams } from 'react-router-dom'
import './SingleProductpage.css'
import Quantityinput from './Quantityinput';
import useData from '../Hooks/useData';
import CartContext from '../../contexts/CartContext';
import UserContext from '../../contexts/userContext';
import config from '../../config.json';

const SingleProductpage = () => {

    const {addToCart} = useContext(CartContext);
    const user = useContext(UserContext);

    const { id } = useParams();
    const { data: product, error } = useData(`/products/${id}`, {}, [id]);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    
  return (
    <section className=" align-center single-product-page">
        {error && <p className='form-error'>{error}</p>}
        {product && <><div className='align-center'>
            <div className="single-product-thumbnail">
                {product?.images && product.images.map((image, index) => (
                    <img key={index} src={`${config.backendURL}/products/${image}`} 
                    alt={`Product Image ${index + 1}`} 
                    onClick={() => setSelectedImage(index)} 
                    className= {selectedImage === index ? 'selected-image' : ''}
                />  
                ))}
            </div>
            <img
              className="single-product-display"
              src={product?.images ? `${config.backendURL}/products/${product.images[selectedImage]}` : null}
              alt={product?.title || 'Product'}
            />
        </div>
        < div className="single-product-details">
            <h1 className="single-product-title">{product.title}</h1>
            <p className="single-product-description">{product.description}</p>
            <span className="single-product-price">${product?.images && product.price.toFixed(2)}</span>
            <h2 className="quantity-title">Quantity: {product.stock}</h2>
          { user && <>
            <Quantityinput quantity={quantity} setQuantity={setQuantity} stock={product.stock} />
            <button className="add-to-cart" onClick={() => addToCart(product, quantity)}>Add to Cart</button>
          </>}
        </div></>}
    </section>
  )
}

export default SingleProductpage