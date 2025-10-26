import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { ThemeContext } from '../Context/ThemeContext';

const MainLayout = () => {
    const { theme } = useContext(ThemeContext);
    const dark = theme === 'dark';

    return (
      
        <div 
            
        >
            
            <Navbar />

            <main className={`flex flex-col min-h-screen flex-grow transition-colors duration-500 ${
                dark ? '' : 'bg-gradient-to-b from-primary/10 to-gray-50'
            }`}>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;