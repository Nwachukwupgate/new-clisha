import React from 'react'

function index() {
  return (
    <div className="plan py-5 becomepartner">
      <div className="container  text-center mt-3">
        <h2
          className="faq-txt"
          data-aos="fade-down"
          data-aos-duration="1000"
          // data-aos-delay="600"
        >
          <b>Ready to start become our partner ?</b>
        </h2>
        <p
          className="col-md-8 m-auto"
          data-aos="fade-down"
          data-aos-duration="1000"
          // data-aos-delay="600"
        >
          It’s easy and just follow some step .
        </p>

        <div className="partners-body p-2 py-lg-4 pb-5 col-lg-10 mx-auto">
          <div className="row m-0  px-lg-3">
            <div
              className="step1 step col-lg-5  mx-auto"
              data-aos="zoom-right"
              data-aos-duration="1000"
              // data-aos-delay="600"
            >
              <h2>Step 1</h2>
              <p>
                Nam id mi sollicitudin magna dictum pellentesque non ac purus.
                Etiam leo nibh, finibus eget porttitor
              </p>

              <button className="btn btn-danger rounded-x">Sign Up</button>
            </div>
            <div
              className="step2 step col-lg-5  mx-auto"
              data-aos="zoom-up"
              data-aos-duration="1000"
              // data-aos-delay="600"
            >
              <h2>Step 2</h2>
              <p>
                Nam id mi sollicitudin magna dictum pellentesque non ac purus.
                Etiam leo nibh, finibus eget porttitor
              </p>

              <button className="btn btn-danger rounded-x">
                Verify your business
              </button>
            </div>
            <div
              className="step3 step col-lg-5  mx-auto"
              data-aos="zoom-in-down"
              data-aos-duration="1000"
              // data-aos-delay="600"
            >
              <h2>Step 3</h2>
              <p>
                Nam id mi sollicitudin magna dictum pellentesque non ac purus.
                Etiam leo nibh, finibus eget porttitor
              </p>

              <button className="btn btn-danger rounded-x">
                Configure System
              </button>
            </div>
            <div
              className="step4 step col-lg-5  mx-auto"
              data-aos="zoom-in-left"
              data-aos-duration="1000"
              // data-aos-delay="600"
            >
              <h2>Step 4</h2>
              <p>
                Nam id mi sollicitudin magna dictum pellentesque non ac purus.
                Etiam leo nibh, finibus eget porttitor
              </p>

              <button className="btn btn-danger rounded-x">See Result</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index