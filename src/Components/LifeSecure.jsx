import React from 'react';
import { Link } from 'react-router';
const LifeSecure = () => {
    return (
       <Link to='/'>
        <div className='flex items-end'>
            <img className='mb-2' src="" alt="" />
            <p className='text-3xl text-primary -ms-2 font-extrabold'>Life Secure</p>
        </div>
       </Link>
    );
};

export default LifeSecure;