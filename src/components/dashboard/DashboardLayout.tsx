import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const DashboardLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 640);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

  return (
    <div className='flex h-screen bg-gray-100'>
     <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
     <div className='flex flex-col flex-1 overflow-hidden'>
       <Topbar  toggleSidebar={toggleSidebar}/>
       <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 mt-14 sm:ml-64">
       </main> 
     </div>
    </div>
  )
}

export default DashboardLayout