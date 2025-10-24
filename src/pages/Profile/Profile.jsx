import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ShowProfile from './components/ShowProfile';
import EditProfile from './components/EditProfile';
import Header from '../../layouts/Header';
import Sidebar from './Layouts/Sidebar';
import SidebarTour from '../../layouts/SidebarTour';
import { getUserSurveyProfile } from '../../store/General';
import SurveyForm from './components/survey/SurveyForm';


function Profile() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.data);
  const surveyProfile = useSelector((state) => state.general.surveyProfile);
  const completeSurveyProfile = useSelector((state) => state.general.completeSurveyProfile);
  const [showSurvey, setShowSurvey] = useState(false)
  const dispatch = useDispatch();
  const [isEditable, setisEditable] = useState(false);
  window.localStorage.setItem('isProfile', true);

  useEffect(() => {
    if (!surveyProfile) {
      dispatch(getUserSurveyProfile());
    }
  }, [surveyProfile, dispatch]);

  return (
    <div className="body-content">
      <div className="bg-muted">
        <Header />
        <div className="row m-0 ">
          <div className="col-md-4 col-lg-3 p-0 bg-white">
            <Sidebar user={user} />
            <SidebarTour />
          </div>
          <div className="col-md-8 col-lg-9 scroll-bg mx-auto py-3 bg-white p-0 p-md-3">
            <div className="container">
              <Link to="/dashboard" className="navigator d-none d-md-block text-dark small link">
                <i className="fa fa-long-arrow-left " aria-hidden="true" />
                <span> {t('profilePage.backToDashboard')}</span>
              </Link>
              <Link
                to="/dashboard/profile-image"
                className="navigator d-block d-md-none text-dark small link"
              >
                <i className="fa fa-long-arrow-left " aria-hidden="true" />
                <span> {t('profilePage.showProfilePhoto')}</span>
              </Link>

              <div className="header row m-0 py-4">
                <p className="col-md-6 p-0">
                  <b>{user?.user?.username}</b>
                  {user?.user?.hometown && (
                    <small>
                      <i className="fa fa-map-marker text-danger ml-2 mr-1" />
                      <span>{user?.user?.hometown}</span>
                    </small>
                  )}
                  <span className="d-block ">
                    {/* Real Estate Broker */}
                    <small className="bg-warning ml-2 rounded p-1 b">{user?.rank?.rankName}</small>
                  </span>
                </p>
                <p className="col-12 col-md-6 d-flex flex-column flex-md-row justify-content-md-end align-items-center gap-2 p-0 p-md-2">
                  {!isEditable && (
                    <button
                      onClick={() => setisEditable(true)}
                      className="btn btn-purple py-2 px-4 rounded-x shadow flex-fill flex-md-none mr-4"
                    >
                      {t('profilePage.editProfile')}
                    </button>
                  )}
                  {!isEditable && (
                    <button
                      onClick={() => setShowSurvey(true)}
                      className="btn btn-purple py-2 px-4 rounded-x shadow flex-fill flex-md-none"
                    >
                      Update Survey Profile
                    </button>
                  )}
                  {isEditable && (
                    <button
                      onClick={() => setisEditable(false)}
                      className="btn btn-purple col-8 col-md-8 m-auto py-md-3 py-2 b rounded-x shadow "
                    >
                      {t('profilePage.closeEditor')}
                    </button>
                  )}
                </p>
              </div>
              <div className="body">
                {!isEditable && <ShowProfile user={user} isEditable={isEditable} surveyProfile={surveyProfile} />}
                {isEditable && <EditProfile user={user} isEditable={isEditable} />}
                {showSurvey && <SurveyForm initialSurveyData={completeSurveyProfile?.survey} initialStep={completeSurveyProfile?.currentStep || 1} isUpdate={completeSurveyProfile?.isUpdate || false} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
