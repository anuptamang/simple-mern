import axios from 'axios'
import { API_URL } from '../../configs'
import { LoginProps } from '../../types'
import { delay } from '../../utils/delay'
import { notify } from '../../utils/notification'
import {
  userLogin,
  userLoginError,
  userLoginSuccess,
  userLogout,
  userLogoutError,
  userLogoutSuccess,
} from './authSlice'

interface LoginPayloadProps {
  email: string
  password: string
}

type DispatchLoginProps = {
  payload: LoginProps | undefined
  type: 'auth/userLogin' | 'auth/userLoginSuccess' | 'auth/userLoginError'
}

type DispatchLogoutProps = {
  payload: LoginProps | undefined
  type: 'auth/userLogout' | 'auth/userLogoutSuccess' | 'auth/userLogoutError'
}

export const login =
  (payload: LoginPayloadProps, reset: any) =>
  async (dispatch: (arg0: DispatchLoginProps) => any) => {
    dispatch(userLogin())

    try {
      const response = await axios.post(`${API_URL}/user/login`, payload)

      console.log(response)

      await delay(3000)
      dispatch(userLoginSuccess(response.data))
      notify('Login Successfull', 'login-success', 'success')
      reset()
    } catch (err: any) {
      dispatch(userLoginError(err))
      notify(err.response.data.message, 'login-failed', 'error')
    }
  }

export const logout =
  (navigate: any) => async (dispatch: (arg0: DispatchLogoutProps) => any) => {
    dispatch(userLogout())
    try {
      await delay(3000)
      localStorage.clear()

      dispatch(userLogoutSuccess())
    } catch (err: any) {
      dispatch(userLogoutError(err))
      notify('Logout Failed', 'Logout-failed', 'error')
    }
  }
