function index({ card }) {
  return (
    <div className="powertool">
      <div className="container text-center mt-3">
        <h3
          className="powertool-txt"
          data-aos="fade-left"
          data-aos-duration="1000"
          // data-aos-delay="600"
        >
          <b>Powerful Tools</b>
        </h3>
        <p
          className="col-md-8 m-auto"
          data-aos="fade-right"
          data-aos-duration="1300"
          // data-aos-delay="600"
        >
          Nam id mi sollicitudin magna dictum pellentesque non ac purus. Etiam leo nibh, finibus
          eget porttitor sit amet, consequat ac lacus. Quisque ornare
        </p>

        <div className="row m-0 mt-5">
          {card &&
            card.card2.map((item, innerIndex) => (
              <div
                className="card secondcard bg-white shadow text-center p-3 col-md-6 col-lg-4 mx-auto "
                key={innerIndex}
                data-aos="zoom-in"
                data-aos-duration="1000"
                // data-aos-delay="600"
              >
                <img
                  className={`card-img m-auto ${innerIndex === 3 ? 'img2' : ''}`}
                  src={item.img}
                  alt=""
                />

                <div className="card-body">
                  <h4 className="card-title">{item.title}</h4>
                  <p className="card-text">{item.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default index;
