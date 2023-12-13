import React, { useState } from 'react'
import './sign-in-button.css'
import { signInWithGoogle, createUserDocumentFromAuth } from '../../utils/firebase'

const SignInButton = () => {
  // const [userAuth, setUserAuth] = false

  const signInWithGooglePopup = async () => {
    const { user } = await signInWithGoogle()
    await createUserDocumentFromAuth(user)
    console.log(user)
  }

  return (
    <button 
      id='sign-in-button'
      buttonType='google'
      onClick={signInWithGooglePopup}
    >
      Sign in
    </button>
  )
}

export default SignInButton