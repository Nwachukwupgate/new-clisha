import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBarScroll from '../../../utils/NavBarScroll';
import MainNavbar from '../../../components/Nav/MainNavbar';
import FirstNavbar from '../../../components/Nav/FirstNavbar';

function Header() {
  useEffect(() => NavBarScroll(), []);

  return (
    <div>
      {/* first header ends */}

      {/* bg start */}
      <div className="bg ">
        <div className="nav-bg ">
          {/* first header start */}
          <FirstNavbar />
          {/* navbar start */}
          <MainNavbar navColor=" bg-transparent     navbar-light " />
          {/* navbar ends */}
        </div>

        {/* start bg-content */}
        <div className="bg-content text-center text-white">
          <p
            data-aos="fade-down"
            data-aos-easing="ease-in-sine"
            data-aos-duration="900"
            data-aos-delay="1000"
          >
            The future for digital advertising
          </p>
          <h2
            className="col-lg-6 col-12 mx-auto my-lg-2"
            data-aos="fade-left"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <b>Click, Like, Share, and get profits from the companies.</b>
          </h2>
          <div className=" mt-4 row m-0">
            <div className="col-8 mx-auto">
              <Link
                to="/signup"
                className="btn mr-lg-1 btn-hero px-4 mx-2 user-btn   shadow my-2 my-sm-0   "
                type="button"
                data-aos="fade-right"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1000"
                data-aos-delay="1200"
              >
                Sign Up
              </Link>
              <Link
                to="/become-partner"
                className="btn py-2   btn-hero px-4 ml-lg-1 mx-2  publisher-btn shadow my-2 my-sm-0"
                type="button"
                data-aos="fade-left"
                data-aos-easing="ease-in-sine"
                data-aos-duration="700"
                data-aos-delay="900"
              >
                Become A Publisher
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* bg ends */}
    </div>
  );
}

export default Header;
