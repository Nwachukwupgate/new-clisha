import React from 'react'
import { Outlet } from 'react-router-dom'

function AuthLayouts() {
    return ( 
        <div className="row m-0 layout-auth">
            <div className="col-md-7 col-lg-8 bgsignin d-none d-md-block">
                <div className="head text-center mt-4">
                    <a
                        className="navbar-brand"
                        href="/"
                        data-aos="zoom-out"
                        data-aos-duration="1000"
                        data-aos-delay="600"
                    >
                        <img src="logo.png" alt="" />
                    </a>
                </div>
                <div className="body row m-0">
                    <img
                        src="images/bgsignup.png"
                        alt=""
                        data-aos="zoom-in"
                        className="col-md-11 col-10 mx-auto"
                    />
                </div>
            </div>
            <div className="col-md-5 col-lg-4 form-col pt-md-5 p-lg-5  p-3 bgsignin2"> 
    
                <Outlet />
            </div>

        </div>
    )
}

export default AuthLayouts