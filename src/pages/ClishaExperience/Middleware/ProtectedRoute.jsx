import { Navigate, Outlet } from 'react-router-dom';

const BASE = '/clisha-x';

/**
 * Protects /clisha-x/dashboard — redirects to /clisha-x/login when not authenticated.
 * Does NOT modify the global ProtectedRoutes.
 */
export default function ClishaExperienceProtectedRoute() {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to={`${BASE}/login`} replace />;
  }
  return <Outlet />;
}
