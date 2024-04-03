import React from 'react'

function index() {
  return (

    <div className="plan py-5 faq" >
      <div className="container  text-center mt-3">
        <h2
          className="faq-txt"
          data-aos="fade-right"
          data-aos-duration="1000"
        // data-aos-delay="600"
        >
          <b>Frequintly Asked Questions</b>
        </h2>
        <p
          className="col-md-8 m-auto"
          data-aos="fade-up-right"
          data-aos-duration="1000"
        // data-aos-delay="600"
        >
          Have Questions? We’re here to help
        </p>
        <div className="input-box col-md-8 m-auto">
          <i className="fa fa-search" aria-hidden="true"></i>
          <input type="text" placeholder="Search" />
        </div>

        {/* faq body */}
        <div
          className="accordion text-left col-lg-10 mx-auto "
          id="accordionExample"
        >
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                What is Clisha ?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Nam id mi sollicitudin magna dictum pellentesque non ac purus.
                Etiam leo nibh, finibus eget porttitor sit amet, consequat ac
                lacus. Quisque ornare, arcu quis lacinia hendrerit, quam metus
                hendrerit mauris, sit amet luctus turpis sem nec diam. Aliquam
                feugiat nibh tortor, a varius leo tristique nec. Curabitur
                dignissim aliquet erat, in elementum nisi dignissim nec.
                Curabitur id vulputate elit, a pulvinar felis.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                How Clisha Work ?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Nam id mi sollicitudin magna dictum pellentesque non ac purus.
                Etiam leo nibh, finibus eget porttitor sit amet, consequat ac
                lacus. Quisque ornare, arcu quis lacinia hendrerit, quam metus
                hendrerit mauris, sit amet luctus turpis sem nec diam. Aliquam
                feugiat nibh tortor, a varius leo tristique nec. Curabitur
                dignissim aliquet erat, in elementum nisi dignissim nec.
                Curabitur id vulputate elit, a pulvinar felis.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Nam id mi sollicitudin magna dictum pellentesque non ?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Nam id mi sollicitudin magna dictum pellentesque non ac purus.
                Etiam leo nibh, finibus eget porttitor sit amet, consequat ac
                lacus. Quisque ornare, arcu quis lacinia hendrerit, quam metus
                hendrerit mauris, sit amet luctus turpis sem nec diam. Aliquam
                feugiat nibh tortor, a varius leo tristique nec. Curabitur
                dignissim aliquet erat, in elementum nisi dignissim nec.
                Curabitur id vulputate elit, a pulvinar felis.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                Curabitur id vulputate elit, a pulvinar felis ?
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Nam id mi sollicitudin magna dictum pellentesque non ac purus.
                Etiam leo nibh, finibus eget porttitor sit amet, consequat ac
                lacus. Quisque ornare, arcu quis lacinia hendrerit, quam metus
                hendrerit mauris, sit amet luctus turpis sem nec diam. Aliquam
                feugiat nibh tortor, a varius leo tristique nec. Curabitur
                dignissim aliquet erat, in elementum nisi dignissim nec.
                Curabitur id vulputate elit, a pulvinar felis.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                Aliquam feugiat nibh tortor, a varius leo tristique nec ?
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="headingFive"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Nam id mi sollicitudin magna dictum pellentesque non ac purus.
                Etiam leo nibh, finibus eget porttitor sit amet, consequat ac
                lacus. Quisque ornare, arcu quis lacinia hendrerit, quam metus
                hendrerit mauris, sit amet luctus turpis sem nec diam. Aliquam
                feugiat nibh tortor, a varius leo tristique nec. Curabitur
                dignissim aliquet erat, in elementum nisi dignissim nec.
                Curabitur id vulputate elit, a pulvinar felis.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSix">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSix"
                aria-expanded="false"
                aria-controls="collapseSix"
              >
                Curabitur id vulputate elit, a pulvinar felis ?
              </button>
            </h2>
            <div
              id="collapseSix"
              className="accordion-collapse collapse"
              aria-labelledby="headingSix"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Nam id mi sollicitudin magna dictum pellentesque non ac purus.
                Etiam leo nibh, finibus eget porttitor sit amet, consequat ac
                lacus. Quisque ornare, arcu quis lacinia hendrerit, quam metus
                hendrerit mauris, sit amet luctus turpis sem nec diam. Aliquam
                feugiat nibh tortor, a varius leo tristique nec. Curabitur
                dignissim aliquet erat, in elementum nisi dignissim nec.
                Curabitur id vulputate elit, a pulvinar felis.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSeven">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSeven"
                aria-expanded="false"
                aria-controls="collapseSeven"
              >
                How Clisha Work ?
              </button>
            </h2>
            <div
              id="collapseSeven"
              className="accordion-collapse collapse"
              aria-labelledby="headingSeven"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Nam id mi sollicitudin magna dictum pellentesque non ac purus.
                Etiam leo nibh, finibus eget porttitor sit amet, consequat ac
                lacus. Quisque ornare, arcu quis lacinia hendrerit, quam metus
                hendrerit mauris, sit amet luctus turpis sem nec diam. Aliquam
                feugiat nibh tortor, a varius leo tristique nec. Curabitur
                dignissim aliquet erat, in elementum nisi dignissim nec.
                Curabitur id vulputate elit, a pulvinar felis.
              </div>
            </div>
          </div>
        </div>

        <div className="team-faq">
          <div className="team-img">
            <img src="images/Ellipse 506.png" className="item item1" alt="" />
            <img src="images/Ellipse 504.png" className="item item2" alt="" />
            <img src="images/Ellipse 505.png" className="item item3" alt="" />
          </div>
          <h6>Still have questions ?</h6>
          <p className="col-lg-8 mx-auto">
            Can’t Find the answer your’re looking for ? Please chat to our
            friendly team,
          </p>
        </div>
      </div>
    </div>
  );
}

export default index