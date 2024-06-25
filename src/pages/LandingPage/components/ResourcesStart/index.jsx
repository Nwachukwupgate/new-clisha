function index({ card }) {
  return (
    <div className="plan py-5 resources">
      <div className="container  text-center mt-3 m-0 m-auto">
        <h2
          className="faq-txt"
          data-aos="fade-left"
          data-aos-duration="1000"
          // data-aos-delay="600"
        >
          <b>Resources</b>
        </h2>
        <p
          className="col-md-8 m-auto"
          data-aos="fade-down"
          data-aos-duration="1000"
          // data-aos-delay="600"
        >
          At nam minimum ponderum. Est audiam animal molestiae te. Ex duo eripuit mentitum. At nam
          minimum ponderum. Est audiam animal molestiae.
        </p>
        <div className="resources-body mt-4">
          <div className="row m-0">
            {card &&
              card.card5.map((item, innerIndex) => (
                <div
                  key={innerIndex}
                  className="card bg-transparent col-lg-4 last-col p-0 mt-3 mx-auto"
                >
                  <img className="card-img-top" src={item.img} alt="" />
                  <div className="card-body pt-2 pl-2">
                    <div className="card-content p-0 text-left">
                      <span className="span-border">
                        <i className="fa fa-user" /> Admin
                      </span>
                      <span className="pl-3">
                        <i className="fa fa-folder " /> Software Development
                      </span>
                    </div>
                    <h4 className="card-title">Where does it come from? What is Lorem Ipsum?</h4>
                    <hr />
                    <p className="card-text row mx-0 card-down">
                      <div className="readmore col-6">
                        <i className="fa fa-arrow-right mr-2" aria-hidden="true" />
                        <span>Read More</span>
                      </div>
                      <div className="comments col-6">
                        <i className="fa fa-comments mr-2" />
                        <span>(09) Comments</span>
                      </div>
                    </p>
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
