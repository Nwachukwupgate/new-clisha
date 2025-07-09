import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Sidebar from '../../layouts/Sidebar';
import Header from '../../layouts/Header';
import SidebarTour from '../../layouts/SidebarTour';
import Loading from '../../components/Alerts/Loading';

function Help() {
  const { t } = useTranslation();
  const api = process.env.REACT_APP_API;
  const token = window.localStorage.getItem('token');
  const user = useSelector((state) => state.user.data);

  const config = { headers: { Authorization: `bearer ${token}` } };
  const [userDetails, setUserDetails] = useState();
  const [loading, setIsLoading] = useState(false);
  // const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(
        `${api}/contact`,
        {
          ...userDetails,
          email: user?.user?.email,
        },
        config
      )
      .then((result) => {
        setIsLoading(false);
        toast.success('Message sent successfully!, We will respond within 24hours');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        toast.error('Message was not sent');
        setIsLoading(false);
      });
  };
  return (
    <div className="body-content">
      {loading && <Loading />}

      <div className="bg-muted ">
        <Header />
        <div className="row m-0 ">
          <div className="col-md-4 col-lg-2 p-0 bg-white m-0">
            <Sidebar />
            <SidebarTour />
          </div>
          <div className="col-md-8 col-lg-10 py-3 scroll-bg bg-white p-0">
            <div className="container text-center p-0 p-md-3 pt-4">
              <form className="changepassword col-md-6 shadow" onSubmit={handleSubmit}>
                <h6>{t('help.contact_us')}</h6>
                <input
                  type="text"
                  placeholder={t('help.subject')}
                  className="form-control"
                  onChange={(e) => setUserDetails({ ...userDetails, subject: e.target.value })}
                />
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder={t('help.message_placeholder')}
                  className="form-control mb-3"
                  onChange={(e) => setUserDetails({ ...userDetails, message: e.target.value })}
                />
                <button className="btn btn-primary">
                  {t('help.post')} <i className="fa fa-paper-plane" aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
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

export default Help;
