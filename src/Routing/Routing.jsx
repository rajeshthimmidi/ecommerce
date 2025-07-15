import React from 'react'
import {Routes, Route} from 'react-router-dom'

import HomePage from '../components/HomePage'
import ProductsPage from '../components/Products/ProductsPage' 
import SingleProductpage from '../components/singleproduct/SingleProductpage'
import CartPage from '../components/cart/CartPage'
import MyOrdersPage from '../components/myOrders/MyOrdersPage'
import LoginPage from '../components/Authentication/LoginPage'
import SignupPage from '../components/Authentication/SignupPage'
import Logout from '../components/Authentication/Logout'
import ProtectedRoute from './ProtectedRoute'

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<SingleProductpage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/SignUp" element={<SignupPage />} />
      <Route element={<ProtectedRoute />}>
      <Route path="/myorders" element={<MyOrdersPage />} />
      <Route path="/Logout" element={<Logout />} />
      <Route path="/cart" element={<CartPage />} />
      </Route>

    </Routes>
  )
}

export default Routing