import React from 'react'
import { useAppDispatch } from '../app/hooks'
import { useGoogleLogin } from '@react-oauth/google'
import { googleLogin } from '../features/auth/authThunk'
import toast from 'react-hot-toast'


const GoogleLoginButton: React.FC = () => {
    const dispatch = useAppDispatch()

    const login = useGoogleLogin({
        onSuccess: async(response) =>{
            try {
                dispatch(googleLogin(response.access_token))

            } catch (error) {
                toast.error('Login failed')
            }
        },
        onError: () =>{
            console.log('Login failed')
        }
    })
  return (
    <div>
      <button onClick={() => login()}>google login</button>
    </div>
  )
}

export default GoogleLoginButton