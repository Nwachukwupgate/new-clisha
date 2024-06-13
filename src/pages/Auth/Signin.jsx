import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Alerts/Loading";
import ClishaLogin from "./components/ClishaLogin";
import VendoLogin from "./components/VendoLogin";
import { apiCall } from "../../services/apiRequestManager";

function Signin() {
  const auth_api = process.env.REACT_APP_AUTH;
  const navigate = useNavigate();
  // let dispatch = useDispatch();
  const [signInMethod, setSignInMethod] = useState("clisha");
  const [loading, setIsLoading] = useState(false);
  const dateEmail = (date) => moment(date).format("DD/MM/YYYY");
  const StartDate = 1675010512555;
  const [signupDetails, setSignupDetails] = useState({
    email: "",
    password: "",
  });
  const [isPassword, setIsPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await apiCall(`${auth_api}/login`, "post", signupDetails);
      window.localStorage.setItem("username", res.data.user.username);
      window.localStorage.setItem("email", res.data.user.email);

      if (
        !res.data.user?.email_verified_at &&
        dateEmail(StartDate) >= dateEmail(res.data.user?.createdAt)
      ) {
        toast.error("Please Verify your Email");
        return (window.location.href = "/verify");
      }

      window.localStorage.setItem("token", res.data.accessToken);
      window.localStorage.setItem("refresh", res.data.refreshToken);
      window.location.href = "/dashboard";
      console.log("what is happening")
       setIsLoading(false);
    } catch (err) {
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
    }
  };

  const persistUserData = (res) => {
    if (res) {
      window.localStorage.setItem("username", res.data.user.username);
      window.localStorage.setItem("email", res.data.user.email);

      window.localStorage.setItem("token", res.data.accessToken); //access token
      window.localStorage.setItem("refresh", res.data.refreshToken);
      window.location.href = "/dashboard";
    }
  };

  const loginWithVendo = async (e) => {
    e?.preventDefault();
    setIsLoading(true);

    try {
      const vendoData = await checkVendoAccount();
      if (!vendoData) return;
      const config = {
        headers: { Authorization: `bearer ${vendoData.token}` },
      };

      let clishaRes = await checkClishaUser(vendoData, config);
      if (!clishaRes) {
        clishaRes = await registerClishaUser(vendoData, config);
        if (!clishaRes) return;
      }

      persistUserData(clishaRes);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const checkVendoAccount = async () => {
    const res = await apiCall(
      `${process.env.REACT_APP_VENDO_API}/login`,
      "post",
      signupDetails
    );

    if (res?.error) {
      if (res?.error === "Email not found") {
        toast.error("No vendo user found with this email");
      } else {
        toast.error(res?.error);
      }
      return null;
    }

    return res.data;
  };

  const checkClishaUser = async (config) => {
    try {
      return await apiCall(`${auth_api}/login`, "post", signupDetails, config);
    } catch (err) {
      if (err?.response?.data?.message !== "User Not found.") {
        toast.error(err?.response?.data?.message);
        return null;
      }
    }
  };

  const registerClishaUser = async (vendoData, config) => {
    let firstname = vendoData?.name?.split(" ")[0],
      secondname = vendoData?.name?.split(" ")[1];

    const data = {
      username: vendoData?.username ?? firstname + secondname,
      firstname: firstname,
      lastname: secondname,
      email: vendoData?.user,
      password: signupDetails?.password,
      confirmPassword: signupDetails?.password,
      code: "",
      isRegWithVendo: true,
    };

    return await apiCall(`${auth_api}/register`, "post", data, config);
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

      {signInMethod === "clisha" ? (
        <ClishaLogin
          handleSubmit={handleSubmit}
          isPassword={isPassword}
          showPassword={showPassword}
          navigate={navigate}
          setSignupDetails={setSignupDetails}
          setSignInMethod={setSignInMethod}
          signupDetails={signupDetails}
        />
      ) : (
        <VendoLogin
          loginWithVendo={loginWithVendo}
          setSignInMethod={setSignInMethod}
          setSignupDetails={setSignupDetails}
          signupDetails={signupDetails}
          isPassword={isPassword}
          showPassword={showPassword}
        />
      )}
    </div>
  );
}

export default Signin;
