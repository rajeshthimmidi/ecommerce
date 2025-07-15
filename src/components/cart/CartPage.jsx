import React, { useEffect,useContext } from 'react'
import './CartPage.css'
import remove from '../../assets/remove.png'
import Table from '../common/Table'

import Quantityinput from '../singleproduct/Quantityinput'
import UserContext from '../../contexts/userContext'
import cartContext from '../../contexts/CartContext'
import { checkoutAPI } from '../services/OrderServices'
import { toast } from 'react-toastify'


const CartPage = () => {

    const [subTotal, setSubTotal] = React.useState(0);
    const user = useContext(UserContext);
    const { cart, removeFromCart, updateCart ,setCart} = useContext(cartContext);

    useEffect(() => {
        let total = 0;
        cart.forEach(item => {
            total += item.product.price * item.quantity;
        })
        setSubTotal(total);
    }, [cart]);

    console.log(cart);

    const checkOut = () => {
        const oldCart = [...cart];
        setCart([]);
        checkoutAPI()
            .then(res => {
                toast.success('Order placed successfully!');
            })
            .catch(err => {
                console.error(err);
                setCart(oldCart);
                toast.error('Failed to place order.');
            });
    }

    return (
        <section className="align-center cart-page">
            <div className="align-center user-info">
                <img src={`http://localhost:5000/profile/${user?.profilePic}`} alt="User" className="user-image" />
                <div className="user-details">
                <p className="user-name">Name : {user?.name}</p>
                <p className="user-mail">Email : {user?.email}</p>
            </div>
        </div>
    

        {cart.length>0 ? <><Table headings={['Item', 'Price', 'Quantity', 'Total', 'Remove']} >
            <tbody>
                {cart.map(({product, quantity}) => (
                    <tr key={product._id}>
                        <td>{product.title}</td>
                        <td>${product.price}</td>
                        <td><Quantityinput
                             quantity={quantity} 
                             setQuantity={updateCart}
                             cartPage={true}
                             productId={product._id}
                            stock={product.stock} /></td>
                        <td>${product.price * quantity}</td>
                        <td>
                            <img src={remove} alt="remove icon" className='remove-icon' onClick={() => removeFromCart(product._id)}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>

        <table className="cart-bill">
            <tbody>
                <tr>
                    <td>sub total</td>
                    <td>${subTotal}</td>
                </tr>
                <tr>
                    <td>shipping charge</td>
                    <td>$5</td>
                </tr>
                <tr className='cart-bill-final'>
                    <td>Total</td>
                    <td>${subTotal + 5}</td>
                </tr>
            </tbody>
        </table>
        <button className="checkout-button" onClick={checkOut}>Checkout</button></>
        : <p className='form_error'>Your cart is empty</p>}
    </section>
  )
}

export default CartPage