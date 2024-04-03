import React from 'react'

function index({card}) {
  return (
    <div className="top-companies">
      <div className="container mt-5">
        <div className="row mb-4 mx-0">
          <div className="col-7">
            <h3 className="top-companies-txt ml-md-3">
              <b>Top 10 Companies</b>
            </h3>
          </div>
          <div className="col-5 text-right ">
            <button className="btn-angle disabledLink shadow-sm border mr-2">
              <i className="fa fa-angle-left  "></i>
            </button>
            <button className="btn-angle activeLink shadow-sm  mr-md-3 border">
              <i className="fa fa-angle-right text-white      "></i>
            </button>
          </div>
        </div>
        {/* cards */}
        <div className="row m-0 mt-2 ">
          {card &&
            card.card3.map((item, index) => (
              <div
                className="card thirdcard maincard mt-4  text-right bg-white shadow px-2 pt-3 col-md-6 col-lg-3 mx-auto "
                key={index}
                data-aos="zoom-in"
                data-aos-duration="1000"
                // data-aos-delay="600"
              >
                <img
                  className={`card-img images2 ${
                    index === 3 || index === 2 ? "last-img" : ""
                  }`}
                  src={item.img}
                  alt=""
                />
                <div className="badge-number  ">
                  <span>{index + 1}</span>
                </div>

                <div className="card-body px-2 text-left">
                  <div className="investment">
                    <small>Total Investment</small>
                    <span className="float-right">
                      <i className="fa fa-euro-sign money shadow "></i>
                      <span className="m-text"> 565.78k</span>
                    </span>
                  </div>
                  <div className="active-task mt-2">
                    <small>Active Task</small>
                    <span className="float-right m-text">230</span>
                  </div>
                  <div className="rating mt-2">
                    <small>Rating</small>
                    <span className="float-right">
                      <small className="stars">
                        <i className="fa fa-star " aria-hidden="true"></i>
                        <i className="fa fa-star " aria-hidden="true"></i>
                        <i className="fa fa-star " aria-hidden="true"></i>
                        <i className="fa fa-star " aria-hidden="true"></i>
                        <i className="fa fa-star-half-alt text-muted "></i>
                      </small>
                      <span>(4.95)</span>
                    </span>
                  </div>
                  <button className="btn btn-primary mt-3 shadow rounded-x w-100">
                    <small>Start</small>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default index