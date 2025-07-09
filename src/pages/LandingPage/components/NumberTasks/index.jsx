import { useTranslation } from 'react-i18next';


function NumberTasks() {
  const { t } = useTranslation();
  return (
    <div className="numbering-task container p-2 ">
      <div className="row m-0 bg-white col-lg-12 mx-auto">
        <div
          className="col-lg-4 col-md-6 mx-auto task shadow mt-3 mt-md-0 "
          data-aos="flip-down"
          data-aos-duration="1200"
          // data-aos-delay="100"
        >
          <h1>1</h1>
          <h4>{t('navbar.signup')}</h4>
          <p>{t('usePlatformSignup')}</p>
        </div>
        <div
          className="col-lg-4 col-md-6 mx-auto task task2 shadow mt-3 mt-md-0"
          data-aos="flip-down"
          data-aos-duration="1200"
          // data-aos-delay="600"
        >
          <h1 className="text-white">2</h1>
          <h4>{t('getTask')}</h4>
          <p>{t('usePlatformGetTask')}</p>
        </div>
        <div
          className="col-lg-4 col-md-6 mx-auto mx-md-auto mx-lg-0 task shadow mt-3 mt-md-0  bg-white"
          data-aos="flip-down"
          data-aos-duration="1200"
          // data-aos-delay="600"
        >
          <h1>3</h1>
          <h4>{t('earnPoint')}</h4>
          <p>{t('usePlatformGainPoint')}</p>
        </div>
      </div>
    </div>
  );
}

export default NumberTasks;
