import React, { useState,useContext } from 'react'
import AdminLayout from '../../../components/admin/AdminLayout/AdminLayout';
import { Storecontext } from '../../../Context/StoreContext';
import '../AdminPanel/AdminPanel.css'
import { adminService } from '../../../services/adminServices';
const Orders = () => {
  const {Orders,setOrders}=useContext(Storecontext)
  
   const updateOrderStatus=async(orderid,status)=>{
      const response=await adminService.updateOrder(orderid,status)
      if(response?.data?.success){
        setOrders(response?.data?.orders)
      }
   }
  return (
    <AdminLayout>
      
            <div>
              <h2 className="page-title">Order Management</h2>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Orders.map((order) => (
                      <tr key={order._id}>
                        <td>#{order.orderId}</td>
                        <td>{order.createdAt.split('T')[0]}</td>
                        <td>{order.items.map(item=> item.itemId.name  )}</td>
                        <td>&#8377{order.totalAmount}</td>
                        <td>
                          <span className={`status-pill status-${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <select 
                            value={String(order.trackingStatus)}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            className="status-select"
                          >
                            <option value="1">placed</option>
                            <option value="2">preparing</option>
                            <option value="3">prepared</option>
                             <option value="4">out for delivery</option>
                             <option value="5">delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            </AdminLayout>
   
  )
}

export default Orders
