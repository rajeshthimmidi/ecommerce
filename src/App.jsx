import React, { use, useEffect } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Routing from './Routing/Routing'
import { jwtDecode } from 'jwt-decode'
import { get, set } from 'react-hook-form'
import setAuthToken from './components/Authentication/setAuthToken'
import { getjwt } from './components/services/userServices'
import { addToCartAPI,getCartAPI,removeFromCartAPI, increaseCartItemAPI, decreaseCartItemAPI } from './components/services/cartServices'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UserContext from './contexts/userContext'
import CartContext from './contexts/CartContext'

setAuthToken(getjwt());

const App = () => {
  const [user, setUser] = React.useState(null);
  const [cart, setCart] = React.useState([]);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const jwttoken = jwtDecode(token);
      if(Date.now() >= jwttoken.exp * 1000) {
        localStorage.removeItem('token');
        location.reload();
      }
      else{
        setUser(jwttoken);
      }
    } catch (error) {
    }
  }, []);

  const addToCart = ( product, quantity) =>{
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(item => item.product._id === product._id);

    if (productIndex !== -1) {
      updatedCart[productIndex].quantity += quantity;
    } else {
      updatedCart.push({ product, quantity });
    }
    setCart(updatedCart);
 
       addToCartAPI(product._id, quantity)
       .then(res=> {
        //  console.log(res);
         toast.success('Product added to cart successfully!');
       })
       .catch(error => {
         toast.error('Failed to add product to cart.');
       });

  }

  const removeFromCart = (productId) => {
    const oldCart = [...cart];
    const updatedCart = oldCart.filter(item => item.product._id !== productId);
    setCart(updatedCart);

    removeFromCartAPI(productId)
      .then(res => {
        toast.success('Product removed from cart successfully!');
      })
      .catch(error => {
        toast.error('Failed to remove product from cart.');
      });
  }

  const updateCart = (type, productId) => {
      const oldCart = [...cart];
      const productIndex = oldCart.findIndex(item => item.product._id === productId);

    if (type === 'increase') {
        oldCart[productIndex].quantity += 1;
        increaseCartItemAPI(productId).catch(error => {
          toast.error('Failed to increase product quantity.');
          setCart(oldCart); 
        });
      }
      if (type === 'decrease') {
        oldCart[productIndex].quantity -= 1;
        decreaseCartItemAPI(productId).catch(error => {
          toast.error('Failed to decrease product quantity.');
          setCart(oldCart); 
        });
      }
      setCart(oldCart);
  }

  const getCart = () => {
    getCartAPI()
      .then(res => {
        setCart(res.data);
      })
      .catch(error => {
        toast.error('Something went wrong');
      });
  }

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  return (
    <UserContext.Provider value={user}>
        <CartContext.Provider value={{cart, addToCart, removeFromCart, updateCart, setCart}}>
        <div className="app">
          <Navbar  cartCount={cart.length} />
            <main className="main">
              <ToastContainer position='bottom-right'/>
              <Routing />
            </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  )
}

export default App