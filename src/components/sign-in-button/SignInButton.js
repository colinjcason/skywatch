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
        <div
          id='sign-in-button'
          onClick={signOutUser}
        >
          Sign out
        </div>
    ) : (
      <div
        id='sign-in-button'
        onClick={signInWithGooglePopup}
      >
        Sign in
      </div>
    )
  )
}

export default SignInButton