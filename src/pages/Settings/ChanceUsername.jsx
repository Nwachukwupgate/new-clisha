import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
// import { useDispatch } from 'react-redux';
import Loading from "../../components/Alerts/Loading";
// import { ChangePasswordData } from '../../store/General';

function ChangeUsername() {
  const api = process.env.REACT_APP_API;
  let token = window.localStorage.getItem("token");
  const config = { headers: { Authorization: `bearer ${token}` } };
  const [userDetails, setUserDetails] = useState();
  const [loading, setIsLoading] = useState(false);
  // const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${api}/user/account/update/username`, userDetails, config)
      .then((result) => {
        setIsLoading(false);
        toast.success("Successfully Updated Username");
        window.location.reload();
      })
      .catch((err) => {
        toast.error("Invalid Username details");
        setIsLoading(false);
      });
  };
  return (
    <div className="changepassword shadow pt-4">
      {loading && <Loading />}

      {/* <p> */}
      <h6 className="p-0 m-0">
        Change Username
        <a
          className="link float-right text-dark p-1"
          data-toggle="collapse"
          href="#changeusername"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </a>
      </h6>
      {/* </p> */}
      <form className="collapse" id="changeusername" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New Username"
          className="form-control"
          onChange={(e) =>
            setUserDetails({ ...userDetails, username: e.target.value })
          }
        />

        <button className="btn btn-primary">Update</button>
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

export default ChangeUsername;
