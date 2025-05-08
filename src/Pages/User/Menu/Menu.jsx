
import React, { useState, useEffect } from 'react';
import './Menu.css';
import { Search } from 'lucide-react';
import ExploreMenu from '../../../components/user/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../../components/user/FoodDisplay/FoodDisplay';
const Menu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setcategory] = useState("all");
  return (
    <div className="menu-page">
      <header className="header">
        <div className="container">
          <h1>Delicious Eats</h1>
          <p>Explore our diverse menu options</p>
        </div>
      </header>
      
      <div className="container">
      <ExploreMenu category={category} setcategory={setcategory}/>
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search our menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="search-icon" size={20} />
          </div>
        </div>
        <FoodDisplay category={category} searchQuery={searchQuery}/>
      
      </div>
    </div>
  );
};

export default Menu;