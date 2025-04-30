import { useEffect, useState, useCallback } from 'react';
import {  Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProtectedRoutes from '../Middleware/ProtectedRoutes';
import PublicRoutes from '../Middleware/PublicRoutes';
import Loading from '../components/Alerts/Loading';
import { apiCall } from '../services/apiRequestManager';
import ToastMsg from '../components/Alerts/ToastMsg';
import RewardApp from '../components/Reward';
import ReportApp from '../components/Report';
import AuthLayouts from '../layouts/AuthLayouts';
import AllProducts from '../pages/AllProducts';
import EmailVerification from '../pages/Auth/EmailVerification';
import ForgotPassword from '../pages/Auth/Password/ForgotPassword';
import NewPassword from '../pages/Auth/Password/NewPassword';
import Signin from '../pages/Auth/Signin';
import Signup from '../pages/Auth/Signup';
import Verify from '../pages/Auth/Verify';
import BecomeAPartner from '../pages/BecomeAPartner';
import ClishaUsers from '../pages/ClishaUsers';
import Contact from '../pages/Contacts';
import Dashboard from '../pages/Dashboard/Dashboard';
import Help from '../pages/Help/Help';
import Landingpage from '../pages/LandingPage/Landingpage';
import Membership from '../pages/Membership';
import Notification from '../pages/Notification';
import Profile from '../pages/Profile/Profile';
import MobileProfileImage from '../pages/Profile/components/MobileProfileImage';
import Rank from '../pages/Rank/Rank';
import Settings from '../pages/Settings/Settings';
import Task from '../pages/Task/Task';
import Team from '../pages/Team/Team';
import Token from '../pages/Token/Token';
import Wallets from '../pages/Wallets';

function Router() {
  const [isLoading, setIsLoading] = useState(true); 

  const handleAuthentication = useCallback(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      try {
        const authApi = process.env.REACT_APP_AUTH;
        const response = await apiCall(`${authApi}/authWith/vendor`, 'post', { token });

        if (response) {
          // console.log("response", response);
          
          localStorage.setItem('token', response.data.accessToken);
          localStorage.setItem('username', response.data.user.username);
          localStorage.setItem('email', response.data.user.email);
          localStorage.setItem('refresh', response.data.refreshToken);
          // navigate('/dashboard');
          window.location.href="/dashboard"
        }
      } catch (error) {
        toast.error('Authentication failed. Redirecting to registration.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleAuthentication();
  }, [handleAuthentication]);

  

  if (isLoading) {
    return <Loading />; 
  }
  return (
    <div className="w-100">
      <Routes>
          {/* Protected Route start */}
          <Route path="/dashboard" element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/profile-image" element={<MobileProfileImage />} />
            <Route path="/dashboard/token" element={<Token />} />
            <Route path="/dashboard/team" element={<Team />} />
            <Route path="/dashboard/help" element={<Help />} />
            <Route path="/dashboard/rank" element={<Rank />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/task" element={<Task />} />
            <Route path="/dashboard/reward" element={<RewardApp />} />
            <Route path="/dashboard/report" element={<ReportApp />} />
            <Route path="/dashboard/wallet" element={<Wallets />} />
          </Route>

          {/* Protected Route end */}

          {/* Public Route start */}
          <Route path="/" element={<Landingpage />} />
          <Route path="/become-partner" element={<BecomeAPartner />} />
          <Route path="/clisha-users" element={<ClishaUsers />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/notification" element={<Notification />} />
          {/* Public Route end */}

          {/* Auth Routes */}
          <Route path="/" element={<AuthLayouts />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<PublicRoutes />}>
              <Route path="" element={<Signin />} />
            </Route>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/new-password" element={<NewPassword />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/verify-account" element={<EmailVerification />} />
          </Route>
        </Routes>

      <ToastMsg />
    </div>
  );
}

export default Router;
