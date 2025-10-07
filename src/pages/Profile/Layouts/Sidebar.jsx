import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePhoto from '../components/ProfilePhoto';

function Sidebar(props) {
  const navigate = useNavigate();

  const user = props?.user;
  const { width } = window.screen;
  const uri = !!window.location.pathname.includes('profile-image');

  useEffect(() => {
    if (width >= 767) {
      navigate('/dashboard/profile');
    }
  }, [navigate, width]);
  const [isCopy, setIsCopy] = useState(false);
  const [isCopyUserRef, setisCopyUserRef] = useState(false);
  const copyFunc = (msg) => {
    navigator.clipboard.writeText(msg).then(() => {
      setIsCopy(true);
      setTimeout(() => {
        setIsCopy(false);
      }, 1000);
    });
  };

  const copyRefFunc = (msg) => {
    const data = `${window.location.origin}/signup?code=${msg}`;
    navigator.clipboard.writeText(data).then(() => {
      setisCopyUserRef(true);
      setTimeout(() => {
        setisCopyUserRef(false);
      }, 1000);
    });
  };
  return (
    <div className={`${!uri ? 'd-none' : ''} d-md-block`}>
      <aside className="m-0 profile-sidebar">
        <ProfilePhoto user={user} />
        <div className="text-center mt-3 p-2 ">
          <div className="py-2 profileId">
            <small>CLisha ID/Refferal Code</small>
            <input
              type="text"
              className="form-control w-75 m-auto"
              value={`${(user?.user?.clishaReferralCode || user?.user?.clishaId)?.slice(0, 15)}...`}
              onChange={() => {}}
            />
            <button
              onClick={(e) => copyFunc(user?.user?.clishaId)}
              disabled={isCopy}
              className="btn btn-sm"
            >
              {!isCopy ? 'Copy' : 'Copied'}
            </button>
          </div>
          <div>
            <button
              onClick={(e) => copyRefFunc(user?.user?.clishaId)}
              className="btn rounded-pill text-white btn-sm  my-3 shadow btn-invite"
            >
              {' '}
              {!isCopyUserRef ? 'Invite a friend' : 'Copied'}
            </button>
          </div>
          <h6>
            <b>Recent Ranking</b>
          </h6>

          <img src="/images/bage.png" className="logo-recent-rank mx-2" alt="earn money online, paid to click, social media rewards, clisha" />
          {/* <img
            src="/images/crown1.png"
            className="logo-recent-rank mx-2"
            alt=""
          />
          <img
            src="/images/crown2.png"
            className="logo-recent-rank mx-2"
            alt=""
          /> */}
        </div>
        <div className="text-center mt-4">
          <Link to="/dashboard/profile" className="text-primary small d-md-none text-center mt-2">
            Back To Profile
            <i className="fa fa-long-arrow-right ml-1" aria-hidden="true" />
          </Link>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
