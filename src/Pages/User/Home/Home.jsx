import React from 'react'
import { useState } from 'react'
import Header from '../../../components/user/Header/Header'
import ExploreMenu from '../../../components/user/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../../components/user/FoodDisplay/FoodDisplay'
const Home = () => {
  const [category, setcategory] = useState("all");
  console.log(category)
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setcategory={setcategory}/>
      <FoodDisplay category={category}/>

    </div>
  )
}

export default Home
