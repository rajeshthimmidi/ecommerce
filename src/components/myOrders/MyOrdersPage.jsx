import React, { use, useEffect,useState } from 'react'
import './MyOrdersPage.css'
import Table from '../common/Table'
import { getOrderAPI } from '../services/OrderServices';
import { toast } from 'react-toastify';
import { set } from 'react-hook-form';
import useData from '../Hooks/useData';

const MyOrdersPage = () => {
const{data: orders, error} = useData('/order');

  // useEffect(() => {
  //   getOrderAPI()
  //     .then(res => {
  //       console.log(res.data);
  //       setOrders(res.data);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       toast.error('Failed to fetch orders.');
  //     });
  // }, []);
console.log(orders);
  return (
    <section className=" align-center my-orders-page">
      {error && <p className='form_error'>{error}</p>}
      <Table headings={['Order', 'Products', 'Total', 'Status']}>
        <tbody>
          {orders && orders.map((order, index) => (
            <tr key={order._id}>
              <td> {index +1}</td>
             <td>
              {order.products.map(p => `${p.product.title}(${p.quantity})`)}
            </td>
              <td> ${order.total}</td>
              <td> {order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>

    </section>

  )
}

export default MyOrdersPage