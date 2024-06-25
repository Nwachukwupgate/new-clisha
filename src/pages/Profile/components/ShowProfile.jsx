import moment from 'moment';

function ShowProfile(props) {
  const formatDate = (dob) => moment(dob).format('Do MMMM YYYY');
  const { user } = props;
  const data = user.user;
  return (
    <div>
      <div className="personal-info border rounded shadow-sm py-2">
        <span className="headText  ">PERSONAL INFO</span>

        <div className="row m-0 bodyText p-0">
          <div className="col-lg-3 col-md-4">
            <small>NAME</small>
            <span>
              {data?.firstname} {data?.lastname}
            </span>
          </div>
          <div className="col-lg-3 col-md-4">
            <small>GENDER</small>
            <span>{data?.gender}</span>
          </div>
          <div className="col-lg-3 col-md-4">
            <small>BIRTH DATE</small>
            <span>{formatDate(data?.birth_date)}</span>
          </div>
          {/* <div className="col-lg-3 col-md-4 d-none">
            <small>PLACE OF BIRTH</small>
            <span>{data?.birth_place}</span>
          </div> */}

          {/* <div className="col-lg-3 col-md-4 ">
            <small>HOME TOWN</small>
            <span>{data?.hometown}</span>
          </div> */}
        </div>
      </div>
      <div className="personal-info my-4 border rounded shadow-sm py-2">
        <span className="headText  ">CONTACT INFO</span>

        <div className="row m-0 bodyText p-0">
          <div className="col-lg-3 col-md-4">
            <small>E-MAIL</small>
            <span>{data?.email}</span>
          </div>
          <div className="col-lg-3 col-md-4">
            <small>PHONE</small>
            <span>{data?.phone}</span>
          </div>
          <div className="col-lg-3 col-md-4">
            <small>COUNTRY</small>
            <span>{data?.country}</span>
          </div>
          <div className="col-lg-3 col-md-4">
            <small>LANGUAGE</small>
            <span>{data?.language}</span>
          </div>
          <div className="col-lg-3 col-md-4">
            <small>REGION</small>
            <span>{data?.region}</span>
          </div>
        </div>
      </div>
      <div className="personal-info border rounded shadow-sm py-2 d-none">
        <span className="headText">HOBBIE</span>
        <div className="row m-0 bodyText p-0">
          <div className="col-lg-3 col-md-4">
            <small>FEVOURITE MOVIE</small>
            <span>{data?.UserHobby?.favourite_movie}</span>
          </div>
          <div className="col-lg-3 col-md-4">
            <small>GAME</small>
            <span>{data?.UserHobby?.game}</span>
          </div>
          <div className="col-lg-3 col-md-4">
            <small>PLACE </small>
            <span>{data?.UserHobby?.place}</span>
          </div>
          <div className="col-lg-3 col-md-4">
            <small>SINGER</small>
            <span>{data?.UserHobby?.singer}</span>
          </div>
          <div className="col-lg-3 col-md-4">
            <small>PLAYER</small>
            <span>{data?.UserHobby?.player}</span>
          </div>
          <div className="col-lg-3 col-md-4">
            <small>BRAND</small>
            <span>{data?.UserHobby?.brand}</span>
          </div>
          <div className="col-lg-3 col-md-4">
            <small>FOOD</small>
            <span>{data?.UserHobby?.food}</span>
          </div>
          <div className="col-lg-3 col-md-4">
            <small>DAY</small>
            <span>{data?.UserHobby?.day}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowProfile;
