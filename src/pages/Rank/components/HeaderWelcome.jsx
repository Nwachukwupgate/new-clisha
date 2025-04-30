import { useSelector } from 'react-redux';
import ProfilePicture from '../../../utils/ProfilePicture';

function HeaderWelcome(props) {
  const { user, date } = props;
  const rank = useSelector((state) => state.rank);

  const username = localStorage.getItem('username');
  const list = () => {
    const userRank = user?.rank?.rankName?.slice(7);
    let arr = 0;
    if (userRank === 'Bronze') arr = 1;
    else if (userRank === 'Silver') arr = 2;
    else if (userRank === 'Gold') arr = 3;
    else if (userRank === 'Platinium') arr = 4;
    else if (userRank === 'Diamond') arr = 5;
    else if (userRank === 'Master') arr = 6;
    else if (userRank === 'Grandmaster') arr = 7;
    return [...Array(arr)];
  };

  return (
    <div className="welcome my-4  d-none d-lg-block">
      <span className="text-muted font-weight-bold  text-capitalize ">hello, {username}!</span>
      <div className="section-head">
        <h4 className=" text-capitalize mt-3 d-inline">
          <b>
            {' '}
            your Ranking Position {user && user?.rank?.position}/{rank?.data?.totalItems}
          </b>
        </h4>
        <span className="float-right">{date}</span>
      </div>

      <div className="section-star-rank ">
        <div className="row m-0">
          <div className="col-lg-7">
            <img
              src={ProfilePicture({
                gender: user?.user?.gender,
                photo: user?.user?.photo,
              })}
              className="avatar "
              alt="earn money online, paid to click, social media rewards clisha"
            />
            <span className="ml-2 username my-username">
              {(user && user?.user?.firstname) ?? username}
              {/* THE */}
            </span>
            {/* <img
              src={`/images/stars/${user?.rank?.rankName
                .slice(7) ?? "bronze"}.png`}
              className="stars mt-4"
              alt=""
            /> */}
            <div className="secondnameDiv ">
              <span className="secondname text-white impact">{user && user?.user?.lastname}</span>
              <span className="starsModel ml-3">
                {list() &&
                  list()?.map((item, index) => (
                    <i key={index} className="fa fa-star" aria-hidden="true" />
                  ))}
              </span>
            </div>
          </div>
          <div className="col-md-5 text-right pt-5 pr-2">
            <img
              src={`/images/rank/${user?.rank?.rankName?.slice(7).toLowerCase()}.png`}
              className="latest_rank"
              alt="earn money online, paid to click, social media rewards clisha"
            />
            <span className="rank_text mt-4 text-white impact">AdStar</span>

            <span className="rank_name impact">{user && user?.rank?.rankName?.slice(6)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderWelcome;
