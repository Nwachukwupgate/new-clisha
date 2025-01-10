import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../components/Alerts/Loading';

// import { Helmet } from "react-helmet";
// import url from "../../json/config.json";

const query = new URLSearchParams(window.location.search);
const code = query.get('code');
function Signup() {
  const auth_api = process.env.REACT_APP_AUTH;
  const navigate = useNavigate();
  const [isPassword, setIsPassword] = useState(false);
  // const [itemData, setitemData] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const [signupDetails, setSignupDetails] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    code,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${auth_api}/register`, signupDetails)
      .then((res) => {
        setIsLoading(false);
        window.localStorage.setItem('username', res.data.data.user.username);
        window.localStorage.setItem('email', res.data.data.user.email);
        // window.localStorage.setItem("token", res.data.data.accessToken);
        window.localStorage.setItem('refresh', res.data.data.refreshToken);
        navigate(`/verify`);
        // window.location.href = "/dashboard";
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status === 400) {
          const error = err.response.data.errors;
          toast.error(`${error[0].param}: ${error[0].msg}`);
        } else {
          toast.error('Oops try again later!');
        }
      });
  };
  const showPassword = () => {
    const password = document.querySelector('#password');
    const password2 = document.querySelector('#password2');
    setIsPassword(!isPassword);
    if (password.type === 'text') {
      password.type = 'password';
      password2.type = 'password';
    } else {
      password2.type = 'text';
      password.type = 'text';
    }
  };

  return (
    <div>
      {loading && <Loading />}
      {/* <Helmet>
        <title>Clisha | Signup</title>
        <meta name="description" content="Invitation Link" />
      </Helmet> */}

      <form className="p-lg-3 signupform" onSubmit={handleSubmit}>
        <h2 data-aos="fade-down">Create your account</h2>
        <div className="form-group " data-aos="fade-left">
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            className="form-control "
            id="firstname"
            aria-describedby="emailHelpId"
            placeholder="Firstname e.g(Peter)"
            value={signupDetails.firstname}
            required
            maxLength={25}
            minLength={3}
            onChange={(e) =>
              setSignupDetails({
                ...signupDetails,
                firstname: e.target.value,
              })
            }
          />
          <small id="emailHelpId" className="form-text d-none text-danger">
            Help text
          </small>
        </div>
        <div className="form-group " data-aos="fade-left">
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            className="form-control "
            id="lastname"
            aria-describedby="emailHelpId"
            placeholder="Lastname e.g(Richard)"
            value={signupDetails.lastname}
            required
            maxLength={25}
            minLength={3}
            onChange={(e) =>
              setSignupDetails({
                ...signupDetails,
                lastname: e.target.value,
              })
            }
          />
          <small id="emailHelpId" className="form-text d-none text-danger">
            Help text
          </small>
        </div>
        <div className="form-group" data-aos="fade-left">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control "
            id="email"
            aria-describedby="emailHelpId"
            placeholder="Input your Email"
            value={signupDetails.email}
            required
            onChange={(e) =>
              setSignupDetails({
                ...signupDetails,
                email: e.target.value,
                username: e.target.value.slice(0, e.target.value.indexOf('@')),
              })
            }
          />
          <small id="emailHelpId" className="form-text d-none text-danger">
            Help text
          </small>
        </div>

        <div className="form-group" data-aos="fade-right">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control "
            id="password"
            aria-describedby="emailHelpId"
            placeholder="Minimum Password Length is 8"
            value={signupDetails.password}
            required
            minLength={8}
            onChange={(e) =>
              setSignupDetails({
                ...signupDetails,
                password: e.target.value,
              })
            }
          />
          <div className="check_pword">
            {!isPassword && (
              <i className="fa fa-eye text-muted link " onClick={showPassword} aria-hidden="true" />
            )}
            {isPassword && (
              <i
                className="fa fa-eye-slash text-muted link "
                onClick={showPassword}
                aria-hidden="true"
              />
            )}
          </div>
          <small id="emailHelpId" className="form-text d-none text-danger">
            Help text
          </small>
        </div>
        <div className="form-group" data-aos="fade-right">
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            className="form-control "
            id="password2"
            aria-describedby="emailHelpId"
            placeholder="Retype Password Here "
            value={signupDetails.confirmPassword}
            required
            minLength={8}
            onChange={(e) =>
              setSignupDetails({
                ...signupDetails,
                confirmPassword: e.target.value,
              })
            }
          />

          <small id="emailHelpId" className="form-text d-none text-danger">
            Help text
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="email">Referral Code </label>
          <input
            type="text"
            className="form-control "
            id="code"
            aria-describedby="emailHelpId"
            placeholder="Input your Referral Code"
            value={signupDetails?.code}
          />
          <small id="emailHelpId" className="form-text d-none text-danger">
            Help text
          </small>
        </div>

        <div className="form-group  pt-3">
          <button type="submit" className="btn btn-primary shadow mt-2 w-100" id="submit">
            Signup
          </button>
        </div>

        <Link
          to="/signin"
          id="emailHelpId"
          className="form-text d-block text-center  text-muted text-decoration-none"
        >
          Already have an account?
          <b className="text-primary text-decoration-hover-underline ml-2">Sign in now</b>
        </Link>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
export default Signup;
