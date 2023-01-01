import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from '../PrivateRoute'

const General = lazy(() => import('../../layouts/General'))
const Home = lazy(() => import('../../pages/Home'))
const Contact = lazy(() => import('../../pages/Contact'))
const Login = lazy(() => import('../../pages/Auth/Login'))
const NotFound = lazy(() => import('../../pages/NotFound'))

const Dashboard = lazy(() => import('../../pages/User/Dashboard'))
const Posts = lazy(() => import('../../pages/Posts'))
const Tasks = lazy(() => import('../../pages/Tasks'))

const AppRouter = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<General />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />

          <Route path="user" element={<PrivateRoute redirect="/login" />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="posts" element={<Posts />} />
            <Route path="tasks" element={<Tasks />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRouter
