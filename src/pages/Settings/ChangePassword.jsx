import axios from 'axios';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
// import { useDispatch } from 'react-redux';
import Loading from '../../components/Alerts/Loading';
// import { ChangePasswordData } from '../../store/General';

function ChangePassword() {
  const api = process.env.REACT_APP_API;
  const token = window.localStorage.getItem('token');
  const config = { headers: { Authorization: `bearer ${token}` } };
  const [userDetails, setUserDetails] = useState();
  const [loading, setIsLoading] = useState(false);
  const {t} = useTranslation();
  // const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${api}/user/account/update/password`, userDetails, config)
      .then((result) => {
        setIsLoading(false);
        toast.success('Successfully Updated Password');
      })
      .catch((err) => {
        toast.error('Invalid Passwords details');
        setIsLoading(false);
      });
  };

  return (
    <div className="changepassword shadow pt-4">
      {loading && <Loading />}

      {/* <p> */}
      <h6 className="p-0 m-0">
        {t('account.change_password')}
        <a
          className="link float-right text-dark p-1 "
          data-toggle="collapse"
          href="#changepassword"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <i className="fa fa-pencil" aria-hidden="true" />
        </a>
      </h6>
      {/* </p> */}
      <form className="collapse show" id="changepassword" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={t('account.current_password')}
          className="form-control"
          onChange={(e) => setUserDetails({ ...userDetails, currentPassword: e.target.value })}
        />
        <input
          type="text"
          placeholder={t('account.new_password')}
          className="form-control"
          value={userDetails?.password}
          onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
        />
        <input
          type="text"
          placeholder={t('account.confirm_password')}
          className="form-control"
          onChange={(e) => setUserDetails({ ...userDetails, confirmPassword: e.target.value })}
        />
        <button className="btn btn-primary">{t('account.update')}</button>
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

export default ChangePassword;
