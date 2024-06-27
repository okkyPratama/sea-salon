import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { useAuth } from '../../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import Alert from '../Alert';  

const DashboardLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 640);
    const {user} = useAuth();
    const [alertInfo, setAlertInfo] = useState<{type: 'danger' | 'success'; message: string} | null>(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if (!user) {
        return <Navigate to='/' replace/>
    }

    return (
        <div className='flex h-screen bg-gray-100'>
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
            <div className='flex flex-col flex-1 overflow-hidden'>
                <Topbar toggleSidebar={toggleSidebar} setAlertInfo={setAlertInfo} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 mt-14 sm:ml-64">
                    <Outlet />
                </main> 
            </div>
            {alertInfo && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="max-w-sm w-full">
                        <Alert 
                            type={alertInfo.type} 
                            message={alertInfo.message} 
                            onClose={() => setAlertInfo(null)}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default DashboardLayout