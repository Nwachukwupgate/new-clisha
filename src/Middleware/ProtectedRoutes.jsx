import { Navigate, Outlet } from 'react-router-dom';
import { useAuth as useAuthenticate } from '../context/AuthContext';
// import Bonus from "../pages/Bonus";

const useAuth = () => {
  const { loading } = useAuthenticate();
  const isAuth = localStorage.getItem('token');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuth || isAuth === null) {
    return false;
  }
  return true;
};
function ProtectedRoutes() {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/signin" />;
}

export default ProtectedRoutes;
