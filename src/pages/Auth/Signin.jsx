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
      if (err.response.status === 403) {
        toast.error(err.response.data.message);
      }
      if (err.response.status === 404) {
        const error = err.response.data.message;
        toast.error(error);
      } else if (err.response.status === 400) {
        const error = err.response.data.errors;
        toast.error(error[0].msg);
      } else if (err.response.status === 401) {
        toast.error('Incorrect Password or Email');
      } else {
        toast.error('Oops try again later!');
      }
    }
  };

  const writeUserData = (res) => {
    if (res) {
      window.localStorage.setItem('username', res.data.user.username);
      window.localStorage.setItem('email', res.data.user.email);

      if (
        !res.data.user?.email_verified_at &&
        dateEmail(StartDate) >= dateEmail(res.data.user?.createdAt)
      ) {
        toast.error('Please Verify your Email');
        window.location.href = '/verify';
      } else {
        window.localStorage.setItem('token', res.data.accessToken); // access token
        window.localStorage.setItem('refresh', res.data.refreshToken);
        window.location.href = '/dashboard';
      }
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
        />
    
    </div>
  );
}

export default Signin;
