import React,{useState,useContext} from 'react'
import '../AdminPanel/AdminPanel.css'
import AdminLayout from '../../../components/admin/AdminLayout/AdminLayout'
import { Storecontext } from '../../../Context/StoreContext'
const Users = () => {
  const {Users,Orders}=useContext(Storecontext)
  const activeTab='users'

  return (
  <AdminLayout>
       {activeTab === 'users' && (
            <div>
              <div className="page-header">
                <h2 className="page-title">Users Management</h2>
              
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Orders</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Users?.map((user) => (
                      <tr key={user._id}>
                        <td>#</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>  {Orders?.filter((order) => order.userId === user._id).length}</td>
                        <td className="action-buttons">
                      
                          <button className="delete-button">block</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === 'addUser' && (
            <div>
              <div className="page-header with-back">
                <button 
                  onClick={() => setActiveTab('users')} 
                  className="back-button"
                >
                  ← Back
                </button>
                <h2 className="page-title">Add New User</h2>
              </div>
              <div className="form-container">
                <form onSubmit={handleAddUser}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Full Name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email Address"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select
                      id="role"
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    >
                      <option value="Customer">Customer</option>
                      <option value="Admin">Admin</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="submit-button">
                      Add User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          </AdminLayout>
  )
}

export default Users
