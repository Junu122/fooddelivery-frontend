import React from 'react'
import { useState } from 'react'
import Header from '../../../components/user/Header/Header'
import ExploreMenu from '../../../components/user/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../../components/user/FoodDisplay/FoodDisplay'
import FeaturedFood from '../../../components/user/FeaturedFood/FeaturedFood'
import Works from '../../../components/user/Works/Works'
const Home = () => {
 

  return (
    <>
      <Header />
     
      <FeaturedFood />
      
      
      <Works />
</>
    
  )
}

export default Home
