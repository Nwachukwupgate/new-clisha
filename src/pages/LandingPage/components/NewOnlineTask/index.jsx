import { translate } from '../../../../utils/translation';

function index() {
  return (
    <div className="new-online ">
      <div className="container py-4 mb-5">
        <div className="row mx-0 p-3 py-5">
          <div className="col-md-6 p-lg-2 ">
            <h1
              className="new-online-txt"
              data-aos="zoom-out-right"
              data-aos-duration="1500"
              // data-aos-delay="600"
            >
              New Online Daily Task
            </h1>
            <p
              className="new-online-paragraph"
              data-aos="zoom-out-left"
              data-aos-duration="1500"
              // data-aos-delay="600"
            >
              {translate('dailyTaskParagraph')}
            </p>
            <p
              className="new-online-paragraph d-none d-lg-block"
              data-aos="zoom-out"
              data-aos-duration="1500"
              // data-aos-delay="600"
            >
              {translate('dailyTaskSubParagraph')}
            </p>
            <div className="text-center text-md-left">
              <button
                className="btn signup shadow mx-auto"
                data-aos="fade-right"
                data-aos-duration="1500"
                // data-aos-delay="600"
              >
                Sign Up Today
              </button>
            </div>
          </div>
          <div className="col-md-6 text-right p-0 p-lg-2   order-first order-lg-last">
            <img
              src="images/dailyonlinetask.png"
              className="col-12 col-lg-10 p-0 mt-3 mx-auto"
              data-aos="zoom-in"
              data-aos-duration="1500"
              // data-aos-delay="100"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
