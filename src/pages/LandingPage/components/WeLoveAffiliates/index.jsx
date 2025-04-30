import { translate } from '../../../../utils/translation';

function index({ card }) {
  return (
    <div className="we-love-affiliate p-md-4 p-1 pt-5">
      <div className="container text-center mt-3">
        <h3
          className="howitworktxt2"
          data-aos="zoom-in"
          data-aos-duration="1000"
          // data-aos-delay="100"
        >
          <b>We Love Our Users</b>
        </h3>
        <p
          className="col-md-8  m-auto p-0 p-lg-2"
          data-aos="fade-left"
          data-aos-duration="1300"
          // data-aos-delay="600"
        >
          {translate('weLoveAffifialte')}
        </p>
      </div>
      <div className="bg-we-love-2">
        <div className="container pt-lg-5">
          <div className="row m-0 mt-5">
            {card &&
              card.card1.map((item, innerIndex) => (
                <div
                  className="card maincard mb-4 bg-white shadow text-center p-3 mx-auto col-lg-6 "
                  key={innerIndex}
                  data-aos="zoom-in"
                  data-aos-duration="1300"
                  // data-aos-delay="600"
                >
                  <img
                    className={`card-img m-auto ${innerIndex === 3 ? 'img2' : ''}`}
                    src={item.img}
                    alt="earn money online, paid to click, social media rewards clisha"
                  />

                  <div className="card-body">
                    <h4 className="card-title">{item.title}</h4>
                    <p className="card-text ">{item.description}</p>
                    {/* <a href="/" className="text-success  text-decoration-underline small">
                      View More
                    </a> */}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
