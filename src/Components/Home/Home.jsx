import React from 'react'
import '../Home/Home.css'
function Home() {
  return (
    <div className='pt-5'>
        
            <div className='row pt-5'>
                <div className='col'>
                    <h1 className='p-4'
                        style={{fontSize:60}}
                    >Hiring service experts made easy</h1>
                    
                </div>
                <div className=' col'>
                    <div className='row'>
                        <img className='imageTwo' src="/src/assets/gardening.jpg"/>
                        <img className='imageTwo' src="/src/assets/electricain.avif"/>
                    </div>
                    <div className='row'>
                        <img className='imageTwo' src="/src/assets/homeCleaning.jpg"/>
                        <img className='imageTwo' src="/src/assets/gardening.jpg"/>

                    </div>
                </div>
            </div>
    </div>
  )
}

export default Home