import React from 'react';
import { Link } from 'react-router';
import logo from '../../public/logo.png'
const LifeSecure = () => {
    return (
       <Link to='/'>
        <div className='flex items-center'>
            <img className='mr-4 w-8 h-8 text-primary '  src={logo} alt="" />
            <p className='text-3xl text-primary -ms-2 font-extrabold'>Life Secure</p>
        </div>
       </Link>
    );
};

export default LifeSecure;