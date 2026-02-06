import { Link } from 'react-router-dom';

export default function ClishaLogin({
  handleSubmit,
  setSignupDetails,
  signupDetails,
  isPassword,
  showPassword,
  navigate,
  loginWithVendo,
  handleSignIn,
  isLoading,
  handleSignUp
}) {
  return (
    <form className="p-lg-3 pt-5" onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
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
          placeholder="Input Your Email"
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
          placeholder="Input Your Password "
          onChange={(e) =>
            setSignupDetails({
              ...signupDetails,
              password: e.target.value,
            })
          }
        />
        <div className="check_pword">
          <i
            className={`fa ${isPassword ? 'fa-eye-slash' : 'fa-eye'} text-muted link`}
            onClick={showPassword}
            aria-hidden="true"
          />
        </div>
        <small id="emailHelpId" className="form-text d-none text-danger">
          Help text
        </small>
        <p
          onClick={() =>
            navigate('/forgot-password', {
              state: {
                site: 'clisha',
              },
            })
          }
          id="emailHelpId"
          className="form-text  float-right text-muted"
          style={{ cursor: 'pointer' }}
        >
          Forgot password?
        </p>
      </div>

      <div className="form-group authBtns pt-3 mt-5">
        <button type="submit" className="btn btn-primary w-100" id="submit" onClick={handleSubmit}>
          Login
        </button>
        <button
          type=""
          className="btn btn-primary vendoBtn w-100"
          // onClick={loginWithVendo}
          onClick={loginWithVendo}
        >
          Login with vendo
        </button>

        {/* Login with Clisha (OIDC) – commented out; sign-in is email/password only */}
        {/* <button
          type="button"
          className="btn btn-primary vendoBtn w-100"
          onClick={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Login with Clisha Account'}
        </button> */}
      </div>

      

      <Link
        to="/signup"
        // onClick={handleSignUp}
        id="emailHelpId"
        className="form-text d-block text-center  text-muted text-decoration-none"
      >
        Doesn’t have an account?
        <b className="text-primary text-decoration-hover-underline ml-2">Signup</b>
      </Link>
    </form>
  );
}
