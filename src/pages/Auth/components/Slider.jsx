function Slider() {
  return (
    <div>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators d-">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active fa fa-circle btn btn-sm text-primary"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
            className=" fa fa-circle btn btn-sm text-danger"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
            className=" fa fa-circle btn btn-sm text-muted"
          />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/images/bgsignin.png"
              alt="social media rewards clisha"
              data-aos="zoom-in"
              data-aos-duration="1100"
              data-aos-delay="1000"
              className="d-block w-100"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/bgsignup.png"
              alt="social media rewards clisha"
              data-aos="zoom-in"
              data-aos-duration="1100"
              data-aos-delay="1000"
              className="d-block w-100"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/bgsignin.png"
              alt="social media rewards clisha"
              data-aos="zoom-in"
              data-aos-duration="1100"
              data-aos-delay="1000"
              className="d-block w-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
