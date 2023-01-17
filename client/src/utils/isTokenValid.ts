import jwtDecode from "jwt-decode";

export const isTokenValid = (token: string) => {
  const decodedToken = jwtDecode(token) as any;

  if (decodedToken?.exp * 1000 < Date.now()) {
    localStorage.removeItem('user');
    return false
  } else {
    return true
  }
}