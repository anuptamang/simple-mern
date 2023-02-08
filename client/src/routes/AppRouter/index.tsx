import { useAuth } from 'hooks/useAuth';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';

const General = lazy(() => import('../../layouts/General'));

const Home = lazy(() => import('../../pages/public/Home'));
const Contact = lazy(() => import('../../pages/public/Contact'));
const About = lazy(() => import('../../pages/public/About'));
const Portfolio = lazy(() => import('../../pages/public/Portfolio'));
const Login = lazy(() => import('../../pages/public/Auth/Login'));
const Register = lazy(() => import('../../pages/public/Auth/Register'));
const ForgotPassword = lazy(
  () => import('../../pages/public/Auth/ForgotPassword')
);
const PrivacyPolicy = lazy(() => import('../../pages/public/PrivacyPolicy'));
const UserPrivacyPolicy = lazy(
  () => import('../../pages/private/User/PrivacyPolicy')
);
const NotFound = lazy(() => import('../../pages/public/NotFound'));

const User = lazy(() => import('../../pages/private/User'));
const Dashboard = lazy(() => import('../../pages/private/User/Dashboard'));
const UserSettings = lazy(() => import('../../pages/private/User/Settings'));
const Posts = lazy(() => import('../../pages/private/Posts'));
const Tasks = lazy(() => import('../../pages/private/Tasks'));

const SinglePost = lazy(() => import('../../pages/public/SinglePost'));

const AppRouter = () => {
  const auth = useAuth();
  const isAuthenticated = auth?.token;

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<General />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="posts/:id" element={<SinglePost />} />

          <Route path="user" element={<PrivateRoute redirect="/login" />}>
            <Route index element={<User />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<UserSettings />} />
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
            <Route path="/">
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
