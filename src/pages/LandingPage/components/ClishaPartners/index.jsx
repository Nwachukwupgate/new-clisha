import React from 'react'

function index({ card, type }) {
  return (
    <div className={`top-companies partners ${(type === 'partners2') ? 'partners2' : ''}`}>
      <div div className="container mt-5" >
        <div className="row mb-4 mx-0">
          <div className="col-7 col-lg-6">
            <h3 className="top-companies-txt ml-md-3">
              <b className={`${(type === 'partners2') ? "text-white" : ""}`}>Clisha Partners</b>
            </h3>
          </div>
          <div className="col-5 col-lg-6 text-right ">
            <select
              name=""
              id=""
              className="partners d-none d-lg-inline mr-2 p-1 px-5"
            >
              <option>All Partners</option>
              <option>4 Partners</option>
              <option>8 Partners</option>
            </select>
            <button className="btn-angle disabledLink shadow-sm border mr-2">
              <i className="fa fa-angle-left       "></i>
            </button>
            <button className="btn-angle activeLink shadow-sm  mr-md-3 border">
              <i className="fa fa-angle-right text-white      "></i>
            </button>
          </div>
        </div>
        {/* cards */}
        <div className="bg-we-love-2">
          <div className="container ">
            <div className="row m-0 mt-5 ">
              {card &&
                card.card4.map((item, index) => (
                  <div
                    className="card maincard last-card mt-4 bg-white shadow text-center p-2 pt-5 mx-auto col-lg-6 "
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
          </div>
        </div>
      </div >
    </div >
  );
}

export default index