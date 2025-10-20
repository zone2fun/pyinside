import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import SidebarLeft from './components/SidebarLeft'
import SidebarRight from './components/SidebarRight'
import { Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import News from './page/News'

function App() {
  
  return (
      <div className='h-screen flex flex-col overflow-hidden'>
         <Navbar/>
          <div className='flex flex-1 w-2/3 mx-auto mt-5 overflow-hidden'>
            <SidebarLeft/>
               <div className='flex-1 w-full h-full overflow-y-auto'>
                   <Routes>
                  
                 <Route path="/" element={<Home/>}/>
                 <Route path="/news" element={<News/>}/>
                  

              </Routes>
               </div>
            <SidebarRight/>
          </div>
         
        
      </div>
  )
}

export default App
