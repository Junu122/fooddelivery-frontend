import React, { useContext, useEffect, useState, useRef } from 'react'
import "./FoodDisplay.css"
import { Storecontext } from '../../../Context/StoreContext'
import FoodList from '../FoodList/FoodList'
import { food_images } from '../../../assets/assets'

function FoodDisplay({category, searchQuery}) {
  const { food_lists } = useContext(Storecontext);
  const [filteredItems, setFilteredItems] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [visibleItems, setVisibleItems] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const loaderRef = useRef(null)
  const ITEMS_PER_PAGE = 8 

  const foodWithImage = food_lists.map((food)=>{
     const matchingImage=food_images.find(food_image=>food_image.name==food.name)
     return{
      ...food,
      image:matchingImage.image 
     }
  })

  
  useEffect(() => {
    setFilteredItems(foodWithImage)
    setMenuItems(foodWithImage)
  }, [food_lists])

 
  useEffect(() => {
    let results = menuItems;
    
  
    if (category !== 'all') {
      results = results.filter(item => item.category === category);
    }
    
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredItems(results);
    setPage(1); 
  }, [searchQuery, category, menuItems]);


  useEffect(() => {
    const itemsToShow = filteredItems.slice(0, page * ITEMS_PER_PAGE);
    setVisibleItems(itemsToShow);
    setLoading(false);
  }, [filteredItems, page]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && visibleItems.length < filteredItems.length) {
          setLoading(true);
        
          setTimeout(() => {
            setPage(prevPage => prevPage + 1);
          }, 300);
        }
      },
      { threshold: 0.5 }
    );
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [visibleItems, filteredItems, loading]);

  return (
    <div className='food-display' id='food-display'>
      <h1>Top dishes for you ({filteredItems.length})</h1>
      <div>
        {filteredItems.length === 0 ? (
          <div className="no-results">
            <h2>No items found</h2>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="food-display-list">
              {visibleItems.map((item, index) => (
                <FoodList 
                  key={index} 
                  id={item._id} 
                  price={item.price} 
                  name={item.name} 
                  description={item.description} 
                  category={item.category} 
                  image={item.image}
                />
              ))}
            </div>
            {visibleItems.length < filteredItems.length && (
              <div ref={loaderRef} className="loader">
                {loading ? 'Loading more items...' : 'Scroll for more'}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default FoodDisplay