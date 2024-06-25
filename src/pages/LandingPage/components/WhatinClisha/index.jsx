import { translate } from '../../../../utils/translation';

function index() {
  return (
    <div className="what-is-clisha text-white text-center ">
      <div className="container p-4">
        <h2 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
          What’s in Clisha
        </h2>
        <div className="row card2 m-0 mx-auto">
          <div
            className="card  text-left   col-md-6 col-lg-3 mt-3 "
            data-aos="flip-up"
            data-aos-duration="1200"
            // data-aos-delay="800"
          >
            <div className="card-body ">
              <h4 className="card-title">User Activity</h4>
              <p className="card-text text-dark">{translate('whatisClishaUserActivity')}</p>
            </div>
          </div>
          <div
            className="card text-left bg-light col-md-6 col-lg-3 mt-3 "
            data-aos="flip-down"
            data-aos-duration="1000"
            // data-aos-delay="600"
          >
            <div className="card-body ">
              <h4 className="card-title">Daily Task</h4>
              <p className="card-text text-dark">
                {translate('whatisClishaUserActivityDailyTask')}
              </p>
            </div>
          </div>
          <div
            className="card text-left bg-light col-md-6 col-lg-3 mt-3 "
            data-aos="flip-right"
            data-aos-duration="1000"
            // data-aos-delay="600"
          >
            <div className="card-body ">
              <h4 className="card-title">Digital Tools</h4>
              <p className="card-text text-dark">
                {translate('whatisClishaUserActivityDailyTaskDigitalTools')}
              </p>
            </div>
          </div>
          <div
            className="card text-left bg-light col-md-6 col-lg-3 mt-3 "
            data-aos="flip-left"
            data-aos-duration="1000"
            // data-aos-delay="600"
          >
            <div className="card-body ">
              <h4 className="card-title">Publisher Activity</h4>
              <p className="card-text text-dark">
                {translate('whatisClishaUserActivityDailyTaskPublisher')}
              </p>
            </div>
          </div>
        </div>
        <div className="laptopimg">
          <img
            data-aos="zoom-out-up"
            data-aos-duration="1300"
            // data-aos-delay="600"
            src="images/laptop.png"
            className="col-12 col-lg-8  p-0 mt-5 mx-auto"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default index;
