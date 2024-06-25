import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
// import url from "../../json/config.json";
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../components/Alerts/Loading';

function Verify() {
  const navigate = useNavigate();

  const username = window.localStorage.getItem('username');
  const email = window.localStorage.getItem('email');
  const [loading, setIsLoading] = useState(false);
  // const [timer, setTimer] = useState(0)
  const auth_api = process.env.REACT_APP_AUTH;
  // const auth_api = url.auth;
  if (!email) navigate(`/signup`);
  const handleSubmit = (e) => {
    // e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${auth_api}/resend`, { email })
      .then((res) => {
        setIsLoading(false);
        toast.success('Email was sent successfully!');
      })
      .catch((err) => {
        setIsLoading(false);
        const error = err.response.data.errors;
        toast.error(error[0].msg);
      });
  };

  return (
    <div>
      {loading && <Loading />}
      <form className="signupform text-center p-lg-3 pt-5 mt-5">
        <i className="fa fa-envelope-open-o text-danger fa-3x" aria-hidden="true" />
        <span className="text-dark   mt-2 d-block">
          Hello <strong className="text-dark">{username}! </strong>
        </span>

        <p className="py-4 text-muted ">
          To start using clisha you need to verify your account{' '}
          <a href={`mailto:${email}`}>{email}</a>. Open your email inbox or spam box to check the
          verification email sent to you
        </p>

        <button className="btn btn-danger w-100 shadow " onClick={handleSubmit} type="button">
          Resend
        </button>
        <Link
          to="/signin"
          id="emailHelpId"
          className="form-text d-block text-center  text-muted text-decoration-none"
        >
          I have verify already
          <b className="text-primary text-decoration-hover-underline ml-2">Signin</b>
        </Link>
        {/* {timer !== 0 && (
              <div className="mt-3 text-dark ">------ {timer} ------</div>
            )} */}
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

export default Verify;
