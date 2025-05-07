import React ,{useState,useContext, useEffect} from 'react'
import '../AdminPanel/AdminPanel.css'
import './FoodTab.css'
import AdminLayout from '../../../components/admin/AdminLayout/AdminLayout'
import AddFood from '../../../components/admin/AddFood/AddFood'
import EditFood from '../../../components/admin/EditFood/EditFood'
import { Storecontext } from '../../../Context/StoreContext'
import { adminService } from '../../../services/adminServices'
const FoodTab = () => {
  const {FoodLists,setFoodLists}=useContext(Storecontext)
  const [activeTab,setActiveTab]=useState(false)
  const [editTab,seteditTab]=useState(false)
  const [foodDetail,setfoodDetail]=useState({})
 
  const editfood=(food)=>{
    console.log(food.isAvailable
      ,"................")
    seteditTab(true)
    setfoodDetail(food)
  }

  const foodavailability=async(foodid,foodstatus)=>{
    const response=await adminService.updatefodStatus(foodid,foodstatus)
   const updateddata=response?.data?.updatedstatus
  const updatedavailablity = FoodLists.map(food => 
    food._id === updateddata._id ? updateddata : food
  );
  setFoodLists(updatedavailablity);
  }

  const handleFoodUpdate = (updatedFood) => {
  
    const updatedFoodLists = FoodLists.map(food => 
      food._id === updatedFood._id ? updatedFood : food
    );
    setFoodLists(updatedFoodLists);
    seteditTab(false);
  };

  return (
    <AdminLayout>
            <div>
              <div className="page-header">
                <h2 className="page-title">Food Items Management</h2>
                <button 
                  onClick={() => setActiveTab(true)}
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
                        <td>&#8377;{food.price}</td>
                        <td>{food.category}</td>
                        <td className="image-cell">
                            <div className="table-image-container">
                              <img 
                               src={food.image} 
                               alt={food.name} 
                               className="table-image" 
                               onError={(e) => {
                               e.target.src = '/placeholder-food.png'; 
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
                          <button onClick={()=>editfood(food)} className="edit-button">Edit</button>
                          <button onClick={()=>foodavailability(food._id,food?.isAvailable)} className={food.isAvailable?"delete-button" : 'available-btn'}>{food.isAvailable===true?"make unavailable":"make available"}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
             {activeTab && <AddFood setActiveTab={setActiveTab}/>}
             {editTab && <EditFood seteditTab={seteditTab } foodDetails={foodDetail}  handleFoodUpdate={handleFoodUpdate}/>}
            </div>
            </AdminLayout>

        
        
         
  )
}

export default FoodTab
