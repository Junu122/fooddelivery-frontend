import React, { useState } from 'react'
import './EditFood.css'
import { adminService } from '../../../services/adminServices'
import { toast } from 'react-toastify';
const EditFood = ({ seteditTab,foodDetails ,handleFoodUpdate}) => {
   
    const [formData,setformData]=useState({
        name:foodDetails.name || "",
        price:foodDetails.price || "",
        description:foodDetails.description || "",
        category:foodDetails.category || "",
        

    })

    const handleinputchange=(e)=>{
        const {name,value}=e.target
       setformData({
        ...formData,
        [name]:value
       })
   
    }
  const handleEdituser =async (e) => {
    e.preventDefault(); 
    console.log(formData)
    const response=await adminService.updateFood(formData,foodDetails._id);
    if(response.data.success){
        toast.success(response.data.message);
        handleFoodUpdate(response.data.updatedfood)
        seteditTab(false)
    }

  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="page-header with-back">
          <button
            onClick={() => seteditTab(false)}
            className="back-button"
          >
            ← Back
          </button>
          <h2 className="page-title">edit Food</h2>
        </div>
        <div className="form-container">
          <form onSubmit={handleEdituser}>
            <div className="form-group">
              <label htmlFor="name">Food Name</label>
              <input
              onChange={handleinputchange}
                value={formData.name}
                id="name"
                type="text"
                placeholder="Food Name"
                name="name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                value={formData.price}
                onChange={handleinputchange}
                name="price"
                id="price"
                type="number"
                placeholder="Food price"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">description</label>
              <textarea
              value={formData.description}
              onChange={handleinputchange}
                id="description"
                name='description'
                placeholder="Food description"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">category</label>
              <select id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleinputchange}>
                 
                <option value="Salads">Salads</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-button">
               save food
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditFood
