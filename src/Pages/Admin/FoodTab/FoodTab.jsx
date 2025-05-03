import React ,{useState,useContext} from 'react'
import '../AdminPanel/AdminPanel.css'
import './FoodTab.css'
import AdminLayout from '../../../components/admin/AdminLayout/AdminLayout'
import AddFood from '../../../components/admin/AddFood/AddFood'
import { Storecontext } from '../../../Context/StoreContext'
const FoodTab = () => {
  const {FoodLists}=useContext(Storecontext)
  const initialFoodItems = [
    { id: 1, name: 'Pizza', price: 12.99, category: 'Italian', available: true },
    { id: 2, name: 'Burger', price: 8.99, category: 'Fast Food', available: true },
    { id: 3, name: 'Pasta', price: 10.99, category: 'Italian', available: false }
  ];
  const [activeTab,setActiveTab]=useState(false)
  
   
  return (
    <AdminLayout>
            <div>
              <div className="page-header">
                <h2 className="page-title">Food Items Management</h2>
                <button 
                  onClick={() => setActiveTab('addFood')}
                  className="add-button"
                >
                  ➕ Add Food Item
                </button>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FoodLists?.map((food) => (
                      <tr key={food._id}>
                        <td>#{food._id}</td>
                        <td>{food.name}</td>
                        <td>&#8377;{food.price*10}</td>
                        <td>{food.category}</td>
                        <td className="image-cell">
                            <div className="table-image-container">
                              <img 
                               src={food.image} 
                               alt={food.name} 
                               className="table-image" 
                               onError={(e) => {
                               e.target.src = '/placeholder-food.png'; // Fallback image if loading fails
                                }}
                                 />
                               </div>
                                </td>
                        {/* <td>
                          <span 
                            onClick={() => toggleFoodAvailability(food._id)}
                            className={`status-pill clickable ${food.available ? 'status-available' : 'status-unavailable'}`}
                          >
                            {food.available ? 'Available' : 'Unavailable'}
                          </span>
                        </td> */}
                        <td className="action-buttons">
                          <button className="edit-button">Edit</button>
                          <button className="delete-button">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
             {activeTab && <AddFood setActiveTab={setActiveTab}/>}
            </div>
           
           
            </AdminLayout>

        
        
         
  )
}

export default FoodTab
