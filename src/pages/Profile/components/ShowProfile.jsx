import moment from 'moment';
import { useTranslation } from 'react-i18next';

function ShowProfile(props) {
  const { t } = useTranslation();
  const formatDate = (dob) => moment(dob).format('Do MMMM YYYY');
  const { user, surveyProfile } = props;

  function formatKey(key) {
    if (typeof key !== 'string') return '';
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  const data = user.user;
  return (
    <div>
      <div className="personal-info border rounded shadow-sm py-2">
        <span className="headText  ">{t('profile.personal_info')}</span>

        <div className="row m-0 bodyText p-0">
          <div className="col-lg-3 col-md-4">
            <small>{t('profile.name')}</small>
            <span>
              {data?.firstname} {data?.lastname}
            </span>
          </div>
          <div className="col-lg-3 col-md-4">
            <small>{t('profile.gender')}</small>
            <span>{data?.gender}</span>
          </div>
          <div className="col-lg-3 col-md-4">
            <small>{t('profile.birth_date')}</small>
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
        <span className="headText  ">{t('profile.contact_info')}</span>

        <div className="row m-0 bodyText p-0">
          <div className="col-lg-3 col-md-4">
            <small>{t('profile.email')}</small>
            <span>{data?.email}</span>
          </div>
          <div className="col-lg-3 col-md-4">
            <small>{t('profile.phone')}</small>
            <span>{data?.phone}</span>
          </div>
          <div className="col-lg-3 col-md-4">
            <small>{t('profile.country')}</small>
            <span>{data?.country}</span>
          </div>
          <div className="col-lg-3 col-md-4">
            <small>{t('profile.language')}</small>
            <span>{data?.language}</span>
          </div>
          <div className="col-lg-3 col-md-4">
            <small>{t('profile.region')}</small>
            <span>{data?.region}</span>
          </div>
        </div>
      </div>

      <div className="personal-info my-4 border rounded shadow-sm py-2">
        <span className="headText">More Details</span>

        <div className="row m-0 bodyText p-0">
          {surveyProfile?.hasChildren !== null && (
            <div className="col-lg-3 col-md-4">
              <small>Has Children:</small>
              <span> {formatKey(surveyProfile?.hasChildren)}</span>
            </div>
          )}

          {surveyProfile?.numberOfChildren && (
            <div className="col-lg-3 col-md-4">
              <small>Number of Children:</small>
              <span> {surveyProfile?.numberOfChildren}</span>
            </div>
          )}
        </div>
      </div>

      {surveyProfile?.singleChoiceAnswers?.length > 0 && (
        <div className="personal-info my-4 border rounded shadow-sm py-2">
          <span className="headText">Single Choice Answers</span>

          <div className="row m-0 bodyText p-0">
            {surveyProfile.singleChoiceAnswers.map((ans, i) => (
              <div className="col-lg-3 col-md-4" key={i}>
                <small>{formatKey(ans.questionKey)}:</small>
                <span> {ans.value}</span>
              </div>               
            ))}
          </div>
        </div>    
      )}
      
      {surveyProfile?.multiChoiceAnswers?.length > 0 && (
      <div className="personal-info my-4 border rounded shadow-sm py-2">
        <span className="headText">Multi Choice Answers</span>

        <div className="row m-0 bodyText p-0">      
          {Object.entries(
            surveyProfile.multiChoiceAnswers.reduce((acc, ans) => {
              if (!acc[ans.questionKey]) acc[ans.questionKey] = [];
              acc[ans.questionKey].push(ans.value);
              return acc;
            }, {})
          ).map(([questionKey, values]) => (
            <div className="col-lg-3 col-md-4" key={values}>
              <small>{formatKey(questionKey)}:</small>
              <span> {values.join(', ')}</span>
            </div>
          ))}        
        </div>
      </div>
      )}


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
