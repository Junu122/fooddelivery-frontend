import React from 'react'
import './AddFood.css'

const AddFood = ({ setActiveTab }) => {
  const handleAddUser = (e) => {
    e.preventDefault(); 
    console.log("hello")
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="page-header with-back">
          <button
            onClick={() => setActiveTab(false)}
            className="back-button"
          >
            ← Back
          </button>
          <h2 className="page-title">Add New Food</h2>
        </div>
        <div className="form-container">
          <form onSubmit={handleAddUser}>
            <div className="form-group">
              <label htmlFor="name">Food Name</label>
              <input
                name="name"
                type="text"
                placeholder="Food Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                name="price"
                type="number"
                placeholder="Food price"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Price</label>
              <textarea
                name="description"
                type="number"
                placeholder="Food description"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">category</label>
              <select name="category">
                <option value="Salads">Salads</option>
                <option value="Rolls">Rolls</option>
                <option value="Desserts">Desserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value=" Pure Veg">Pure Veg</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-button">
                Add Food
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddFood
