import { isTokenValid } from 'utils/isTokenValid';
import { notify } from 'utils/notification';
import { authSelector } from '../redux/auth/authSlice';
import { useAppSelector } from '../redux/hooks';

function useAuth() {
  const auth = useAppSelector(authSelector);
  let validAuth = {
    ...auth,
  };

  if (auth?.token) {
    if (!isTokenValid(auth.token)) {
      localStorage.clear();
      validAuth.token = null;
      notify('User Session Expired', 'session-expire-form', 'warning');
    }
  }

  return validAuth;
}

export { useAuth };
