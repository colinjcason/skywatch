import React, { useContext } from 'react'
import './sign-in-button.css'
import { signInWithGoogle, signOutUser } from '../../utils/firebase'
import { UserContext } from '../../contexts/user.context'

const SignInButton = () => {
  const { currentUser } = useContext(UserContext)

  const signInWithGooglePopup = async () => {
    await signInWithGoogle()
  }

  return (
      currentUser ? (
        <button 
          id='sign-in-button'
          onClick={signOutUser}
        >
          Sign out
        </button>
      ) : (
        <button 
          id='sign-in-button'
          onClick={signInWithGooglePopup}
        >
          Sign in
        </button>
      )    
  )
}

export default SignInButton