import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ProfilePicture from '../../../utils/ProfilePicture';

function HeaderWelcomeMobile(props) {
  const { t } = useTranslation();
  const username = localStorage.getItem('username');
  const { date, user } = props;
  const rank = useSelector((state) => state.rank);

  return (
    <div className="welcome mobile p-0 my-4  d-block d-lg-none">
      <span className="text-muted font-weight-bold d-block text-capitalize p-2">
        {t('headerWelcome.greeting', { username })} <small className="float-right">{date}</small>
      </span>
      <div className="section-head p-2">
        <h6 className=" text-capitalize mt-3 d-inline">
          <b>
            {' '}
            {t('headerWelcome.ranking', {
              position: user && user?.rank?.position,
              total: rank?.data?.totalItems,
            })}
          </b>
        </h6>
      </div>
      {/* Fix Mobile Screen for Rank well */}
      <div className="section-star-rank ">
        <div className="row m-0">
          <div className="col-12">
            <img
              src={ProfilePicture({
                gender: user?.user?.gender,
                photo: user?.user?.photo,
              })}
              className="avatar"
              alt="earn money online, paid to click, social media rewards clisha"
            />
            <span className="ml-2 username"> {username}</span>
            <img
              src={`/images/stars/${user?.rank?.rankName?.slice(7) ?? 'bronze'}.png`}
              className="stars mt-4"
              alt="earn money online, paid to click, social media rewards clisha"
            />
          </div>
          <div className="check_rank">
            <small>AdStar</small>
            <br />
            <small className=" ml-3">{user && user?.rank?.rankName?.slice(6)}</small>
          </div>
          <img
            src={`/images/rank/${user?.rank?.rankName?.slice(7).toLowerCase()}.png`}
            className="latest_rank"
            alt="earn money online, paid to click, social media rewards clisha"
          />

          {/* <div className="col-5 text-right pt-5 pr-2"> */}
          {/* 
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default HeaderWelcomeMobile;
