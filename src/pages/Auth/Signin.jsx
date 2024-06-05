import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Alerts/Loading";

function Signin() {
  const auth_api = process.env.REACT_APP_AUTH;
  // let navigate = useNavigate();
  // let dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  const dateEmail = (date) => moment(date).format("DD/MM/YYYY");
  const StartDate = 1675010512555;
  const [signupDetails, setSignupDetails] = useState({
    email: "",
    password: "",
  });
  const [isPassword, setIsPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${auth_api}/login`, signupDetails)
      .then((res) => {
        setIsLoading(false);
        window.localStorage.setItem("username", res.data.data.user.username);
        window.localStorage.setItem("email", res.data.data.user.email);

        if (
          !res.data.data?.user?.email_verified_at &&
          dateEmail(StartDate) >= dateEmail(res.data.data?.user?.createdAt)
        ) {
          //if you have verify your account and if the day you register is not from {StartDate} above then you are not eligible
          toast.error("Please Verify your Email");
          return (window.location.href = "/verify");
        }

        window.localStorage.setItem("token", res.data.data.accessToken); //access token
        window.localStorage.setItem("refresh", res.data.data.refreshToken);
        window.location.href = "/dashboard";
      })

      .catch((err) => {
        setIsLoading(false);
        if (err.response.status === 403) {
          return toast.error(err.response.data.message);
        }
        if (err.response.status === 404) {
          const error = err.response.data.message;
          toast.error(error);
        } else if (err.response.status === 400) {
          const error = err.response.data.errors;
          toast.error(error[0].msg);
        } else if (err.response.status === 401) {
          toast.error("Incorrect Passoword or Email");
        } else {
          toast.error("Oops try again later!");
        }
      });
  };




  const showPassword = () => {
    let password = document.querySelector("#password");
    setIsPassword(!isPassword);
    if (password.type === "text") {
      password.type = "password";
    } else {
      password.type = "text";
    }
  };
  return (
    <div>
      {loading && <Loading />}

      <form className="p-lg-3 pt-5" onSubmit={handleSubmit}>
        <h2 data-aos="fade-down" data-aos-duration="1000">
          Welcome back!
        </h2>

        <div className="form-group" data-aos="fade-left">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control "
            id="email"
            aria-describedby="emailHelpId"
            placeholder="input your email"
            onChange={(e) =>
              setSignupDetails({
                ...signupDetails,
                email: e.target.value,
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
            placeholder="input your password "
            onChange={(e) =>
              setSignupDetails({
                ...signupDetails,
                password: e.target.value,
              })
            }
          />
          <div className="check_pword">
            {!isPassword && (
              <i
                className="fa fa-eye text-muted link "
                onClick={showPassword}
                aria-hidden="true"
              ></i>
            )}
            {isPassword && (
              <i
                className="fa fa-eye-slash text-muted link "
                onClick={showPassword}
                aria-hidden="true"
              ></i>
            )}
          </div>
          <small id="emailHelpId" className="form-text d-none text-danger">
            Help text
          </small>
          <Link
            to="/forgot-password"
            id="emailHelpId"
            className="form-text  float-right text-muted"
          >
            Forgot password?
          </Link>
        </div>

        <div className="form-group  pt-3">
          <button
            type="submit"
            className="btn btn-primary mt-5 w-100"
            id="submit"
          >
            Login
          </button>
        </div>

        <Link
          to="/signup"
          id="emailHelpId"
          className="form-text d-block text-center  text-muted text-decoration-none"
        >
          Doesn’t have an account?
          <b className="text-primary text-decoration-hover-underline ml-2">
            Signup
          </b>
        </Link>
      </form>

    </div>
  );
}

export default Signin;
