import React, { useEffect, useState } from 'react';


import { createUserWithEmailAndPassword, onAuthStateChanged,signOut, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { AuthContext } from './Context';
import { auth } from '../Firebase/firebase-init';
import UseAxios from '../hooks/UseAxios';




const AuthProvider = ({children}) => {
  const [loading,setLoading] =useState(true);
  const [user,setUser]= useState(null);
  const provider = new GoogleAuthProvider();
  const axiosInstance=UseAxios();
  // create user
 const createUser = (email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
 }
//  login User

 const signIn = (email,password)=>{
  setLoading(true)
  return signInWithEmailAndPassword(auth,email,password)
 }
//  user logout
  const SignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      await axiosInstance.post('/logout', {}, { withCredentials: true });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };
//  Update profile
 const updateUserProfile = (profile)=>{
  setLoading(true);
  return updateProfile(auth.currentUser,profile)
 }

//  google login 
const googleSignIn = ()=>{
  setLoading(true);
  return signInWithPopup(auth,provider)
}

// on auth state change
useEffect(()=>{
  const unsubscribe = onAuthStateChanged(auth,currentUser=>{
    setUser(currentUser);
    setLoading(false)
     if (currentUser?.email) {
        const userData = { email: currentUser.email };

        axiosInstance
        .post('/jwt', userData, { withCredentials: true })
          
          .then((res) => {
            console.log('Token after JWT:', res.data);
          })
          .catch((error) => {
            console.error('JWT Error:', error);
          });
      }

      
    });
  return ()=> {
    unsubscribe();
  }

},[axiosInstance])


   const authInfo = {
       loading,
       user,
       createUser,
       signIn,
       SignOut,
       googleSignIn,
       updateUserProfile
   }



    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;