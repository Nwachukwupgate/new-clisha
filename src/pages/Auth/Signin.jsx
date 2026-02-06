import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import Loading from '../../components/Alerts/Loading';
import ClishaLogin from './components/ClishaLogin';
import { apiCall } from '../../services/apiRequestManager';


function Signin() {
  const auth_api = process.env.REACT_APP_AUTH;
  const vendoBaseUrl = process.env.REACT_APP_VENDO_API;  
  const clientId = process.env.REACT_APP_VENDO_CLIENT_ID;
  const callbackUrl = process.env.REACT_APP_CLIENT_URL;
  
  const navigate = useNavigate();
  // let dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  const dateEmail = (date) => moment(date).format('DD/MM/YYYY');
  const StartDate = 1675010512555;
  const [signupDetails, setSignupDetails] = useState({
    email: '',
    password: '',
  });
  const [isPassword, setIsPassword] = useState(false);
  const { signIn, loading: isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await apiCall(`${auth_api}/login`, 'post', signupDetails);
      writeUserData(res);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const status = err.response?.status;
      const data = err.response?.data;
      if (status === 403) toast.error(data?.message || 'Account inactive');
      else if (status === 404) toast.error(data?.message || 'User not found');
      else if (status === 400) {
        const errors = data?.errors;
        toast.error(errors?.[0]?.msg || data?.message || 'Invalid request');
      } else if (status === 401) toast.error(data?.message || 'Incorrect password or email');
      else if (status === 503) toast.error(data?.message || 'Service temporarily unavailable');
      else toast.error(data?.message || 'Oops try again later!');
    }
  };

  const writeUserData = (res) => {
    if (!res) return;
    // Backend returns { status, data: { user, accessToken, refreshToken }, message }
    const data = res.data?.data || res.data;
    const user = data?.user;
    if (!user) return;
    window.localStorage.setItem('username', user.username);
    window.localStorage.setItem('email', user.email);

    if (
      !user?.email_verified_at &&
      dateEmail(StartDate) >= dateEmail(user?.createdAt)
    ) {
      toast.error('Please Verify your Email');
      window.location.href = '/verify';
    } else {
      if (data.accessToken) window.localStorage.setItem('token', data.accessToken);
      if (data.refreshToken) window.localStorage.setItem('refresh', data.refreshToken);
      window.location.href = '/dashboard';
    }
  };

  const loginWithVendo = async (e) => {
    e?.preventDefault();
    setIsLoading(true);

    try {
      // const vendoData = await checkVendoAccount();
      // if (!vendoData) return;
      // const config = {
      //   headers: { Authorization: `bearer ${vendoData.token}` },
      // };

      // let clishaRes = await checkClishaUser(vendoData, config);
      // if (!clishaRes) {
      //   clishaRes = await registerClishaUser(vendoData, config);
      //   if (!clishaRes) return;
      // }

      // writeUserData(clishaRes);
      const authUrl = `${vendoBaseUrl}/oauth/authorize?client=${clientId}&callback_url=${callbackUrl}`;
      
      window.location.href = authUrl;
    } catch (err) {
      toast.error('Failed to initiate authentication:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      toast.error('Sign-in error:', error);
    }
  };

  const handleSignUp = async () => {
    try {
      await signIn(null, "signup");
    } catch (error) {
      toast.error('Sign-up error:', error);
    }
  };

  // const checkVendoAccount = async () => {
  //   const res = await apiCall(`${process.env.REACT_APP_VENDO_API}/login`, 'post', signupDetails);

  //   if (res?.error) {
  //     if (res?.error === 'Email not found') {
  //       toast.error('No vendo user found with this email');
  //     } else {
  //       toast.error(res?.error);
  //     }
  //     return null;
  //   }

  //   return res.data;
  // };


  const showPassword = () => {
    const password = document.querySelector('#password');
    setIsPassword(!isPassword);
    if (password.type === 'text') {
      password.type = 'password';
    } else {
      password.type = 'text';
    }
  };

  return (
    <div>
      {loading && <Loading />}

      
        <ClishaLogin
          handleSubmit={handleSubmit}
          isPassword={isPassword}
          showPassword={showPassword}
          navigate={navigate}
          setSignupDetails={setSignupDetails}
          signupDetails={signupDetails}
          loginWithVendo={loginWithVendo}
          handleSignIn={handleSignIn}
          isLoading={isLoading}
          handleSignUp={handleSignUp}
        />
    
    </div>
  );
}

export default Signin;
