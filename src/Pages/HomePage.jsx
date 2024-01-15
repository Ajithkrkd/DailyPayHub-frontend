import React from 'react'
import Header from '../Components/Header/Header'
import Home from '../Components/Home/Home'
import LocationComponent from '../Components/Location/LocationComponet'
function HomePage() {
  return (
    <div>
        <Header/>
        <Home/>
        <LocationComponent/>
    </div>
  )
}

export default HomePage