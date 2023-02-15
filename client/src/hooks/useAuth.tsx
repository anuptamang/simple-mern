import { isTokenValid } from 'utils/isTokenValid';
import { authSelector } from '../redux/auth/authSlice';
import { useAppSelector } from '../redux/hooks';

function useAuth() {
  const auth = useAppSelector(authSelector);
  let validAuth = {
    ...auth,
  };

  if (auth?.token) {
    if (!isTokenValid(auth.token)) {
      validAuth.token = null;
    }
  }

  return validAuth;
}

export { useAuth };
