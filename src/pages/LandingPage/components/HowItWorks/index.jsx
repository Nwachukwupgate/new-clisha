import { translate } from '../../../../utils/translation';

function index() {
  return (
    <div className="how-it-works text-center p-4 ">
      <div className="col-md-8 col-lg-5 m-auto " data-aos="fade-right" data-aos-duration="1000">
        <h2 className="howitworktxt">
          <b>How User Work Our Platform</b>
        </h2>
        <p data-aos="fade-left" data-aos-duration="1200">
          {translate('usePlatform')}
        </p>
      </div>

      <img
        data-aos="zoom-in"
        data-aos-duration="1700"
        src="images/howitworksimage 2.png"
        className="w-75 d-none d-lg-block mt-2 mx-auto"
        alt=""
      />
      <img
        data-aos="zoom-in"
        data-aos-duration="1700"
        src="images/howitworksimage 2 (1).png"
        className="w-100 d-block d-lg-none mt-2"
        alt=""
      />
    </div>
  );
}

export default index;
