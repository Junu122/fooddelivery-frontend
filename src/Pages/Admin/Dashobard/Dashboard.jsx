import React from 'react'
import { useContext, useState } from 'react'
import '../AdminPanel/AdminPanel.css'
import AdminLayout from '../../../components/admin/AdminLayout/AdminLayout'
import { Storecontext } from '../../../Context/StoreContext'
const Dashboard = () => {

  const {Orders,Users,FoodLists}=useContext(Storecontext)
  
  



   


  return (
  
    <AdminLayout>
            <div>
              <h2 className="page-title">Dashboard Overview</h2>
              <div className="dashboard-cards">
                <div className="dashboard-card card-blue">
                  <h3>Total Users</h3>
                  <p className="card-value">{Users?.length}</p>
                </div>
                <div className="dashboard-card card-green">
                  <h3>Food Items</h3>
                  <p className="card-value">{FoodLists?.length}</p>
                </div>
                <div className="dashboard-card card-yellow">
                  <h3>Pending Orders</h3>
                  <p className="card-value">{Orders?.filter(o => o.status === 'pending').length}</p>
                </div>
                <div className="dashboard-card card-green">
                  <h3>Total Orders</h3>
                  <p className="card-value">{Orders.length}</p>
                </div>
              </div>
              <div className="recent-orders">
                <h3 className="section-title">Recent Orders</h3>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Orders?.map((order) => (
                        <tr key={order?._id}>
                          <td>#{order.orderId}</td>
                          <td>{order.createdAt.split('T')[0]}</td>
                          <td>&#8377;{order.totalAmount}</td>
                          <td>
                            <span className={`status-pill status-${order.status.toLowerCase()}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </AdminLayout>
   
  )
}

export default Dashboard
