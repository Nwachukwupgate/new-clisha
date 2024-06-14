import React from 'react'

export default function VendoLogin({
  loginWithVendo,
  setSignInMethod,
  setSignupDetails,
  signupDetails,
  isPassword,
  showPassword
}) {
  return (
    <div className="vendoLoginModal">
          <form className="p-lg-3 pt-5" onSubmit={loginWithVendo}>
            <p
              onClick={() => setSignInMethod("clisha")}
              className="goback"
            >{`<< Go back`}</p>
            <div className="vHead">
              <h2 data-aos="fade-down" data-aos-duration="400">
                Login With
              </h2>
              <img src="vendo.png" alt="vendo" className="vendoLogo" />
            </div>

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
                <i
                className={`fa ${isPassword ? 'fa-eye-slash' : 'fa-eye'} text-muted link`}
                onClick={showPassword}
                aria-hidden="true"
              ></i>         
              </div>
              <small id="emailHelpId" className="form-text d-none text-danger">
                Help text
              </small>
              <a
                href={process.env.REACT_APP_VENDO_USER_DASHBOARD}
                target="_blank"
                rel="noreferrer"
                id="emailHelpId"
                className="form-text  float-right text-muted"
                style={{ cursor: "pointer" }}
              >
                Forgot vendo password?
              </a>
            </div>

            <div className="form-group authBtns pt-3 mt-5">
              <button
                type="submit"
                className="btn btn-primary vendoBtn w-100"
                id="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
  )
}
