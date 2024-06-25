import { translate } from '../../../../utils/translation';

function index() {
  return (
    <div className="speedy-market pt-5">
      <div className="container text-center mt-3">
        <h3 data-aos="fade-right" data-aos-duration="1300" data-aos-delay="600">
          <b>Speedy Marketing With Community</b>
        </h3>
        <p
          className="col-md-8   m-auto"
          data-aos="fade-left"
          data-aos-duration="1300"
          // data-aos-delay="600"
        >
          {translate('SpeedyMarketing')}
        </p>
        <div className="div">
          <img
            data-aos="zoom-in"
            data-aos-duration="1300"
            // data-aos-delay="600"
            src="images/speedymarketing.png"
            className=" d-none d-lg-block w-75 mx-auto  mt-4"
            alt=""
          />
          <img
            data-aos="zoom-in"
            data-aos-duration="1300"
            // data-aos-delay="600"
            src="images/speedymarketingmobile.png"
            className="mt-4 d-block d-lg-none w-100"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default index;
