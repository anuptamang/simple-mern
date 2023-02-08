import { isTokenValid } from 'utils/isTokenValid';
import { notify } from 'utils/notification';
import { authSelector } from '../redux/auth/authSlice';
import { useAppSelector } from '../redux/hooks';
import { redirect } from 'react-router-dom';

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
