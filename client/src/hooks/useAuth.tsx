import { authSelector } from '../redux/auth/authSlice'
import { useAppSelector } from '../redux/hooks'

function useAuth() {
  const auth = useAppSelector(authSelector)

  return auth
}

export { useAuth }
