import React, { useContext } from 'react'
import './sign-in-button.css'
import { signInWithGoogle, createUserDocumentFromAuth, signOutUser } from '../../utils/firebase'
import { UserContext } from '../../contexts/user.context'

const SignInButton = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext)

  const signInWithGooglePopup = async () => {
    const { user } = await signInWithGoogle()
    setCurrentUser(user)
    await createUserDocumentFromAuth(user)
    console.log(user)
  }

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null)
  }

  return (
      currentUser ? (
        <button 
          id='sign-in-button'
          onClick={signOutHandler}
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