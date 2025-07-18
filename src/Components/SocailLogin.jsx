import React from 'react';

import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router';
import UseAuth from '../hooks/UseAuth';

const SocailLogin = ({from}) => {
    const {googleSignIn}= UseAuth();
 
    const navigate= useNavigate();
    
    const handleGoogleLogin= ()=>{
        googleSignIn()
         .then((result) => {
            console.log(result.user);
            toast.success("YOur Account LogIn successfully !");
             navigate(from || '/')
          })
          .catch((error) => {
            const errorCode = error.code;
        
            console.log(errorCode);
             toast.error(error.code);
          })

    }
    return (
          <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Or login with</p>
                   <button
  onClick={handleGoogleLogin}
    className="mt-2 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
              >
           Google
            </button>
                </div>
    );
};

export default SocailLogin;