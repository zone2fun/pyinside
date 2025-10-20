import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import SidebarLeft from './components/SidebarLeft'
import SidebarRight from './components/SidebarRight'
import { Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import News from './page/News'
import Travel from './page/Travel'
import Shop from './page/Shop'
import Jobs from './page/Jobs'
import Advertisement from './page/Advertisement'

function App() {
  
  return (
      <div className='h-screen flex flex-col overflow-hidden'>
         <Navbar/>
          <div className='flex flex-1 w-2/3 mx-auto mt-5 overflow-hidden'>
            <SidebarLeft/>
               <div className='flex-1 w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500 scroll-smooth'>
                   <Routes>
                  
                 <Route path="/" element={<Home/>}/>
                 <Route path="/news" element={<News/>}/>
                 <Route path="/news/:id" element={<News/>}/>
                 <Route path="/travel" element={<Travel/>}/>
                 <Route path="/travel/:id" element={<Travel/>}/>
                 <Route path="/shop" element={<Shop/>}/>
                 <Route path="/jobs" element={<Jobs/>}/>
                 <Route path="/advertisement" element={<Advertisement/>}/>

                  

              </Routes>
               </div>
            <SidebarRight/>
          </div>
         
        
      </div>
  )
}

export default App
