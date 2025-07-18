import React, { useEffect, useState } from 'react';


import { createUserWithEmailAndPassword, onAuthStateChanged,signOut, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { AuthContext } from './Context';
import { auth } from '../Firebase/firebase-init';


const AuthProvider = ({children}) => {
  const [loading,setLoading] =useState(true);
  const [user,setUser]= useState(null);
  const provider = new GoogleAuthProvider();

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
 const SignOut= ()=>{
  setLoading(true);
  return signOut(auth)
 }
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
    console.log('current user',currentUser)
  })
  return ()=> {
    unsubscribe();
  }

},[])


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