import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/Alerts/Loading";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
// import url from "../../../json/config.json";

function ForgotPassword() {
  const auth_api = process.env.REACT_APP_AUTH;

  const [IsLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post(`${auth_api}/forgot/password`, { email })
      .then((res) => {
        setIsLoading(false);
        toast.success("link has been sent!");
      })
      .catch((err) => {
        setIsLoading(false);
        // const error = err.response.data.errors;
        toast.error("Oops try again later!");
      });
  };
  const changeData = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      {IsLoading && <Loading />}
      <form className="p-lg-3 pt-5 mt-4" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control "
            id="email"
            aria-describedby="emailHelpId"
            placeholder="Verify your account"
            value={email}
            onChange={changeData}
          />
          <small id="emailHelpId" className="form-text d-none text-danger">
            Help text
          </small>
        </div>

        <div>
          <button
            type="submit"
            className="btn btn-primary mt-2 w-100"
            id="submit"
          >
            Verify
          </button>
        </div>

        <Link
          to="/signup"
          id="emailHelpId"
          className="form-text d-block text-center  text-muted text-decoration-none"
        >
          Doesn’t have an partner account?
          <b className="text-primary text-decoration-hover-underline ml-2">
            Signup
          </b>
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
