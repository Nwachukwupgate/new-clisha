import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from '../Middleware/ProtectedRoutes';
import PublicRoutes from '../Middleware/PublicRoutes';
import ToastMsg from '../components/Alerts/ToastMsg';
import RewardApp from '../components/Reward';
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
  return (
    <div className="w-100">
      <BrowserRouter>
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
            <Route path="/signup" element={<PublicRoutes />}>
              <Route path="" element={<Signup />} />
            </Route>
            <Route path="/signin" element={<PublicRoutes />}>
              <Route path="" element={<Signin />} />
            </Route>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/new-password" element={<NewPassword />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/verify-account" element={<EmailVerification />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastMsg />
    </div>
  );
}

export default Router;
