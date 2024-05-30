import React, { useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function EmailVerification() {
  const auth_api = process.env.REACT_APP_AUTH;
  const query = useMemo(() => new URLSearchParams(window.location.search), []);
  const navigate = useNavigate();

  const verifyEmail = useCallback(() => {
    const _token = query.get("token");

    if (_token) {
      axios
        .get(`${auth_api}/confirm/${_token}`)
        .then((res) => {
            console.log(res.data)
          if (res.data.status === 200) {
            toast.success("Email verified successfully");
            navigate("/signin");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          navigate("/signin");
        });
    } else {
      navigate("/signin");
    }
  }, [auth_api, query, navigate]);

  useEffect(() => {
    verifyEmail();
  }, [verifyEmail]);

  return (
    <div
      className="signupform text-center p-lg-3 pt-5 mt-5 d-flex flex-column align-items-center justify-content-center"
      style={{ height: "80vh" }}
    >
      <div className="dot-spinner">
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
      </div>
      <p className="py-4 text-muted">
        We're verifying your account to ensure everything is in order. Please
        stay with us, this won't take long! You'll be automatically redirected
        to the login page shortly.
      </p>
    </div>
  );
}
