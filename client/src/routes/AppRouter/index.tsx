import { useAuth } from 'hooks/useAuth';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';

const General = lazy(() => import('../../layouts/General'));
const Home = lazy(() => import('../../pages/Home'));
const Contact = lazy(() => import('../../pages/Contact'));
const Login = lazy(() => import('../../pages/Auth/Login'));
const Register = lazy(() => import('../../pages/Auth/Register'));
const PrivacyPolicy = lazy(() => import('../../pages/PrivacyPolicy'));
const UserPrivacyPolicy = lazy(() => import('../../pages/User/PrivacyPolicy'));
const NotFound = lazy(() => import('../../pages/NotFound'));

const User = lazy(() => import('../../pages/User'));
const Dashboard = lazy(() => import('../../pages/User/Dashboard'));
const Posts = lazy(() => import('../../pages/Posts'));
const Tasks = lazy(() => import('../../pages/Tasks'));

const SinglePost = lazy(() => import('../../pages/SinglePost'));

const AppRouter = () => {
  const auth = useAuth();
  const isAuthenticated = auth?.token;

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<General />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="posts/:id" element={<SinglePost />} />

          <Route path="user" element={<PrivateRoute redirect="/login" />}>
            <Route index element={<User />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="posts" element={<Posts />} />
            <Route path="tasks" element={<Tasks />} />
          </Route>

          {isAuthenticated ? (
            <Route
              path="/"
              element={<PrivateRoute redirect="/privacy-policy" />}
            >
              <Route path="privacy-policy" element={<UserPrivacyPolicy />} />
            </Route>
          ) : (
            <Route path="/" element={<General />}>
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
            </Route>
          )}

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
