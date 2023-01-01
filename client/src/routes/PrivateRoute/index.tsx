import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../../hooks/useAuth'
import Admin from '../../layouts/Admin'

interface Iprops {
  children?: any
  redirect?: string
}

function PrivateRoute({ children, redirect = '/login' }: Iprops) {
  let auth = useAuth()
  let location = useLocation()

  if (!auth?.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={redirect} state={{ from: location }} replace />
  }

  return <Admin>{children ? children : <Outlet />}</Admin>
}

export default PrivateRoute
