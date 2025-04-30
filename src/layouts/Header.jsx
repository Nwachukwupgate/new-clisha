import { useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CountUp from 'react-countup';
import MobileSidebar from './MobileSidebar';
import { logoutAction, getUser } from '../store/Auth/auth';
import ProfilePicture from '../utils/ProfilePicture';


function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const vendoPackage = useSelector((state) => state?.wallet?.vendoPackage);
  const current_route = window.location.pathname;

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const logout = () => {
    dispatch(logoutAction());
  };
  const navigate = useNavigate();
  const balance = window.localStorage.getItem('balance');
  const earned = window.localStorage.getItem('earned');
  const [userBalance, setUserBalance] = useState(balance ?? 0);
  const [userEarned, setUserEarned] = useState(earned ?? 0);

  useEffect(() => {
    setUserBalance(user?.rank?.balance ?? 0);
    setUserEarned(user?.rank?.earned_amount ?? 0);
  }, [user]);

  return (
    <div>
      <div
        className="modal fade"
        id="navabar"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <MobileSidebar />
      </div>
      <nav
        className={`navbar navbar-expand-md border-bottom  navbar-light ${
          current_route === '/profile' ? 'bg-white' : 'bg-lighter'
        } `}
      >
        <div className=" px-4 x-width ">
          <a className="navbar-brand" href="/dashboard">
            <img src="/logo.png" alt=" paid to click, social media rewards clisha" />
          </a>
          <small className="d-md-none d-inline ">
            <img src="/images/point.png" className="mail mr-1 " alt="paid to click, social media rewards clisha" />
            <span className="text-dark b">
              {/* <CountUp
                start={balance ?? 0}
                end={user && user?.rank?.balance}
                // duration={3.75}
              />{" "} */}
              {userBalance}
              Points
            </span>
          </small>
          <button
            className="navbar-toggler bg-white shadow p-2  d-lg-none"
            type="button"
            data-toggle="modal"
            data-target="#navabar"
          >
            <i className="fa fa-bars text-muted" aria-hidden="true" />
          </button>
          <div className="collapse navbar-collapse dashboard-nav" id="collapsibleNavId">
            <ul className="navbar-nav  ml-md-auto mt-2 mt-lg-0">
              <li className="nav-item px-1">
                <span className="nav-link point">
                  <small className="text-dark b ml-1 currency">
                    {/* ${Number(userEarned).toFixed(2)} */}
                    $0
                  </small>
                </span>
              </li>
              {user?.user.vendoConnectStatus &&
                vendoPackage?.data?.package_level !== 'No package' && (
                  <li className="nav-item px-1">
                    <span className="nav-link point">
                      <img src="/images/vqs.png" className="mail" alt="social media rewards clisha" />
                      <small className="text-dark b ml-1">
                        <CountUp
                          start={user?.rank?.bonus_points}
                          end={user && user?.rank?.bonus_points}
                          duration={3.75}
                        />{' '}
                        CC
                      </small>
                    </span>
                  </li>
                )}
              <li className="nav-item px-1 ">
                <span className="nav-link point">
                  <img src="/images/point.png" className="mail" alt="social media rewards clisha" />
                  <small className="text-dark b ml-1">
                    <CountUp
                      start={user?.rank?.total_points ?? 0}
                      end={user && user?.rank?.total_points}
                      duration={3.75}
                    />{" "}
                    {/* {userBalance}  */} POINTS
                  </small>
                </span>
              </li>
            </ul>

            <ul className="navbar-nav  ml-md-auto mt-2 mt-lg-0">
              <li className="nav-item px-1 mt-2" onClick={() => navigate('/notification')}>
                <img src="/images/bell.png" className="mail link" alt=" social media rewards clisha" />
              </li>

              <li className="nav-item ">
                <div className="dropdown">
                  <button
                    className="btn btn-transparent shadow-none "
                    type="button"
                    id="triggerId"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      src={ProfilePicture({
                        gender: user?.user?.gender,
                        photo: user?.user?.photo,
                      })}
                      className="profile_picture shadow mail"
                      alt=""
                    />
                    {/* <div className="user_avatar_mini shadow-sm">
                      {username.slice(0, 1)}
                    </div> */}
                    <span className="name "> {user?.user?.username} </span>

                    <i className="fa fa-angle-down " aria-hidden="true" />
                  </button>
                  <div className="dropdown-menu text-right" aria-labelledby="triggerId">
                    <Link className="dropdown-item text-secondary" to="/dashboard/profile">
                      Profile
                    </Link>

                    <Link className="dropdown-item text-secondary" to="/dashboard">
                      Dashboard
                    </Link>
                    <div className="dropdown-divider" />
                    <a
                      className="dropdown-item font-weight-bold link"
                      onClick={logout}
                      href="/signin"
                    >
                      Logout
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
