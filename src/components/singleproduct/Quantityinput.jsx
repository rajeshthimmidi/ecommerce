import React from 'react'

const Quantityinput = ({quantity, setQuantity, stock, cartPage, productId}) => {
  return (
     <div className='quantity-input'>
                <button className="quantity-input-button" disabled={quantity <= 1} onClick={() => {cartPage ? setQuantity("decrease",productId):setQuantity(quantity-1)}}>-</button>
                <span className="quantity-input-value">{quantity}</span>
                <button className="quantity-input-button" disabled={quantity >= stock} onClick={() => {cartPage ? setQuantity("increase",productId):setQuantity(quantity + 1)}}>+</button>
            </div>
  )
}

export default Quantityinput