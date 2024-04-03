import React from "react";
import cards from "../../../json/cards.json";
function HowPartnerValidate() {
  const card = cards;
  return (
    <div className="how_partner_validate text-center">
      <h1>How Partner Validiate Our Platform</h1>
      <p className="col-8 mx-auto">
        Nam id mi sollicitudin magna dictum pellentesque non ac purus. Etiam leo
        nibh, finibus eget porttitor sit amet, consequat ac lacus. Quisque
        ornare, arcu quis lacinia hendrerit, quam metus hendrerit mauris, sit
        amet luctus turpis sem nec diam. Aliquam feugiat nibh tortor, a varius
        leo tristique nec
      </p>

      <div className="bg-we-love-2">
        <div className="container ">
          <div className="row m-0 mt-5 ">
            {card &&
              card.card4.map((item, index) => (
                <div
                  className="card maincard last-card mt-4 bg-transparent shadow text-center p-2 pt-5 mx-auto col-lg-6 "
                  key={index}
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                  // data-aos-delay="600"
                >
                  <img
                    className={`card-img m-auto img-getters mb-3  `}
                    src={item.img}
                    alt=""
                  />

                  <div className="card-body">
                    <p className="text-left p-0 row m-0">
                      <span className="small col-5 p-0">Rank : #102</span>
                      <span className="col-7 text-right  p-0 small">
                        Investment : 26m
                      </span>
                    </p>
                    <p className="card-text small py-3">
                      At nam minimum ponderum. Est audiam animal molestiae te.
                      Ex duo eripuit mentitum.
                    </p>
                    <a
                      href="/"
                      className="text-success  text-decoration-underline "
                    >
                      View More
                    </a>
                  </div>
                </div>
              ))}
          </div>

          <div className="reviews mt-4">
            <span>
              Our <b>partners</b> always love to give review us !{" "}
            </span>
            <i className="fa fa-star text-warning mx-1"></i>
            <i className="fa fa-star text-warning mx-1"></i>
            <i className="fa fa-star text-warning mx-1"></i>
            <i className="fa fa-star text-warning mx-1"></i>
            <i className="fa fa-star-o mx-1 text-muted"></i>

            <span>
              <b>4.95</b> based on <b className="text-warning">1848</b> Review
            </span>
            <img src="/images/partner/alexa.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowPartnerValidate;
