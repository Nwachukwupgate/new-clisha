import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../components/Alerts/Loading";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
// import url from "../../../json/config.json";
const query = new URLSearchParams(window.location.search);
const _token = query.get("token");
const _email = query.get("email");
const initialValue = {
  email: _email,
  password: "",
  confirmPassword: "",
};

function NewPassword() {
  const navigate = useNavigate()
  const auth_api = process.env.REACT_APP_AUTH;


  const [IsLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${auth_api}/password/reset/${_token}`, data)
      .then((res) => {
        setIsLoading(false);
        toast.success("Password reset succesfully!");
        navigate("/signin")
      })
      .catch((err) => {

        setIsLoading(false);
        const { status, data } = err.response;
        if (status === 400) {
          toast.error(data.errors[0].msg);
        } else {
          toast.error("Oops try again later!");
        }
      });
  };
  const changeData = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value, });
  };
  return (
    <div>
      {IsLoading && <Loading />}

      <form className="p-lg-3 pt-5 pt-5" onSubmit={handleSubmit}>
        <h2
          data-aos="fade-down"
          data-aos-duration="1400"
          data-aos-delay="1000"
        >
          New Password
        </h2>

        <div
          className="form-group"
          data-aos="fade-left" 
        >
          <label htmlFor="email">New Password</label>
          <input
            type="password"
            className="form-control "
            id="password"
            aria-describedby="emailHelpId"
            placeholder="Enter new password"
            value={data.password}
            onChange={changeData}
            required
          />
          <small id="emailHelpId" className="form-text d-none text-danger">
            Help text
          </small>
        </div>

        <div
          className="form-group" 
        >
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control "
            id="confirmPassword"
            aria-describedby="emailHelpId"
            placeholder="Confirm new password"
            value={data.confirmPassword}
            onChange={changeData}
            required
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
            Reset Password
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

export default NewPassword;
