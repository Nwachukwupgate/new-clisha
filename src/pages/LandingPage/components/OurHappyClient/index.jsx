function index() {
  return (
    <div className="happy-client pt-5">
      <div className="container  text-center mt-3">
        <h3
          className="plan-txt"
          data-aos="fade-right"
          data-aos-duration="1000"
          // data-aos-delay="600"
        >
          <b>Our Happy Client</b>
        </h3>
        <p
          className="col-md-8 m-auto text-long"
          data-aos="fade-left"
          data-aos-duration="1000"
          // data-aos-delay="600"
        >
          What they say about us
        </p>

        <div className="client">
          <div className=" text-center mt-5 ">
            <button className="btn-angle disabledLink shadow-sm border mr-2">
              <i className="fa fa-angle-left       " />
            </button>
            <button className="btn-angle activeLink shadow-sm  mr-md-3 border">
              <i className="fa fa-angle-right text-white      " />
            </button>
          </div>
          <div className="message-box col-lg-9 col-12 mx-auto p-3 p-lg-4 ">
            <div className="row m-0">
              <div className="logo col-3  d-none d-lg-block">
                <img src="images/image 37.png" alt="" />
              </div>
              <div className="message col-9 text-left">
                <div className="message-star">
                  <i className="fa fa-star" />
                  <i className="fa fa-star " />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                </div>
                <div className="message-body">
                  At nam minimum ponderum. Est audiam animal molestiae te. Ex duo eripuit mentitum.
                  At nam minimum ponderum. Est audiam animal molestiae.
                </div>
              </div>
            </div>
          </div>
          <div className="client-img ">
            <img src="images/Ellipse 9.png" alt="" />
            <div className="client-details pt-2">
              <h3 className="name">Mehedi Hasan</h3>
              <span className="position ">a2i ( ICT Division ).</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
