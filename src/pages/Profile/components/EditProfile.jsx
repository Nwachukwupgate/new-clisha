import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import { Country } from 'country-state-city';
import timezones from 'timezones-list';
import Loading from '../../../components/Alerts/Loading';

function ShowProfile(props) {
  const countryList = Country.getAllCountries();
  const api = process.env.REACT_APP_API;

  const token = window.localStorage.getItem('token');
  const config = { headers: { Authorization: `bearer ${token}` } };
  const [loading, setIsLoading] = useState(false);

  const { user } = props;
  const data = user.user;
  const [userDetails, setUserDetails] = useState({
    firstname: data?.firstname,
    lastname: data?.lastname,
    gender: data?.gender,
    phone: data?.phone,
    country: data?.country,
    language: data?.language,
    birth_date: moment(data?.birth_date).format('YYYY-MM-DD'),
    region: data?.region,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${api}/user/profile`, userDetails, config)
      .then((res) => {
        setIsLoading(false);
        window.location.href = '/dashboard/profile';
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status === 400) {
          toast.error('Oops all input is required!');
        } else {
          toast.error('Oops try again!');
        }
        // console.log(err);
      });
  };

  return (
    <div>
      {loading && <Loading />}

      <form onSubmit={handleSubmit}>
        <div className="personal-info border rounded shadow-sm py-2">
          <span className="headText  ">PERSONAL INFO</span>
          <div className="row m-0 bodyText p-0">
            <div className="col-lg-3 col-md-4 p-2">
              <small>NAME</small>
              <input
                type="text"
                value={userDetails?.firstname}
                id="firstname"
                className="editInput mb-2 shadow-none form-control"
                onChange={(e) => setUserDetails({ ...userDetails, firstname: e.target.value })}
                placeholder="first name"
              />
              <input
                type="text"
                value={userDetails?.lastname}
                id="lastname"
                className="editInput mb-2 shadow-none form-control"
                onChange={(e) => setUserDetails({ ...userDetails, lastname: e.target.value })}
                placeholder="last name"
              />
            </div>
            <div className="col-lg-3 col-md-4 p-2">
              <small>GENDER</small>

              <div className="form-check d-inline  link border-0 m-0">
                <label htmlFor="male" className="form-check-label link">
                  <input
                    type="radio"
                    className="form-check-input "
                    name="gender"
                    id="male"
                    value="Male"
                    checked={userDetails?.gender === 'Male' && true}
                    onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.value })}
                  />
                  Male
                </label>
              </div>
              <div className="form-check  d-inline link border-0 m-0 ml-3">
                <label htmlFor="female" className="form-check-label link">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="gender"
                    id="female"
                    value="Female"
                    checked={userDetails?.gender === 'Female' && true}
                    onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.value })}
                  />
                  Female
                </label>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 p-2">
              <small>BIRTH DATE</small>
              <input
                type="date"
                className="editInput shadow-none form-control"
                placeholder="birth date"
                id="birth_date"
                value={userDetails?.birth_date}
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    birth_date: e.target.value,
                  });
                }}
              />
            </div>
            <div className="col-lg-3 col-md-4 p-2">
              <small>Phone</small>
              <input
                value={userDetails?.phone}
                type="text"
                id="phone"
                className="editInput shadow-none form-control"
                placeholder="Phone"
                onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="personal-info border rounded shadow-sm py-2 mt-3">
          <span className="headText  ">CONTACT INFO</span>
          <div className="row m-0 bodyText p-0">
            <div className="col-lg-3 col-md-4 p-2">
              <small>COUNTRY</small>
              <select
                className="editInput shadow-none form-control link "
                onChange={(e) => {
                  console.log(e.target.value);
                  setUserDetails({ ...userDetails, country: e.target.value });
                }}
                id="country"
              >
                <option>{userDetails?.country ? userDetails?.country : 'Select Country'}</option>

                {countryList &&
                  countryList.map((item, key) => <option key={item.name}>{item.name}</option>)}
              </select>
            </div>

            <div className="col-lg-3 col-md-4 p-2">
              <small>LANGUAGE</small>
              <select
                defaultValue={userDetails?.language}
                className="editInput shadow-none form-control link"
                onChange={(e) => setUserDetails({ ...userDetails, language: e.target.value })}
                id="language"
              >
                <option>{userDetails?.language ? userDetails?.language : 'Select Langauge'}</option>
                <option>English</option>
                <option>Deutsch</option>
                <option>French</option>
                <option>Portuguese</option>
              </select>
            </div>

            <div className="col-lg-3 col-md-4 p-2">
              <small>REGION</small>
              <select
                defaultValue={userDetails?.region}
                className="editInput shadow-none form-control link"
                onChange={(e) => setUserDetails({ ...userDetails, region: e.target.value })}
                id="region"
              >
                <option>{userDetails?.region ? userDetails?.region : 'Select Region'}</option>
                {timezones?.map((item) => (
                  <option key={item.tzCode}>{item?.tzCode}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="div mt-4">
          <button className="btn btn-purple col-8 col-md-4 m-auto mt-3 py-md-3 py-2 b rounded-x shadow ">
            Update Profile
          </button>
        </div>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default ShowProfile;
