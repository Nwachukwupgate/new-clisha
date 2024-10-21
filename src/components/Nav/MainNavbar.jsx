import { Link, useLocation } from 'react-router-dom';
import { nav } from '../../json/nav';

function MainNavbar({ bg }) {
  const onHandleToggle = () => {
    const myNav = document.getElementById('mynav_bar');
    const navbar_brand = document.getElementById('navbar-brand');
    myNav.classList.remove('bg-transparent');
    myNav.classList.add('bg-white');
    navbar_brand.src = 'logo.png';
  };
  const link = useLocation()?.pathname;
  return (
    <nav id="mynav_bar" className={`navbar  navbar-expand-lg border-bottom     w-100 ${bg}`}>
      <div className="container">
        <a className="navbar-brand " href="/">
          {bg === undefined && <img src="logo2.png" id="navbar-brand" alt="" />}
          {bg === 'nav-white-bg' && <img src="/images/logo4.png" id="navbar-brand" alt="" />}
        </a>
        <button
          className="navbar-toggler shadow-sm p-2  d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
          id="toggle_btn"
          onClick={onHandleToggle}
        >
          {/* {isMenu && <i className="fa fa-bars    "></i>}
                {!isMenu && <i className="fa fa-close    "></i>} */}
          <i className="fa fa-bars    " />
        </button>
        <div className="collapse navbar-collapse " id="collapsibleNavId">
          <ul id="navbarsItems" className="navbar-nav  mr-auto mt-2 mt-lg-0">
            {nav?.map((item, key) => (
              <li key={key} className="nav-item">
                <Link
                  className={`nav-link ${item?.url === link ? 'active-link' : ''}`}
                  to={item?.url}
                >
                  {item?.name}
                </Link>
              </li>
            ))}
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <Link
              to="/signin"
              className="btn mr-lg-2   m-0 heaad-btn head-login-btn  login-btn  shadow my-2 my-sm-0   "
              type="button"
              id="login_btn"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="btn ml-2  heaad-btn registration-btn shadow my-2 my-sm-0"
              type="button"
            >
              Sign Up
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default MainNavbar;
