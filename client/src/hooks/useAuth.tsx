import jwtDecode from 'jwt-decode';
import { authSelector } from '../redux/auth/authSlice';
import { useAppSelector } from '../redux/hooks';

function useAuth() {
  const auth = useAppSelector(authSelector);
  let validAuth = {
    ...auth,
  };

  if (auth?.token) {
    const decodedToken = jwtDecode(auth.token) as any;
    if (decodedToken?.exp * 1000 < Date.now()) {
      localStorage.removeItem('user');
      validAuth.token = null;
    }
  }

  return validAuth;
}

export { useAuth };
