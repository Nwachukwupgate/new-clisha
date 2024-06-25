function AboutProducts() {
  const array = [1, 2, 3, 4];
  return (
    <div className="AboutProducts">
      <div className="bigBg">
        <img src="/images/tech-devices.png" className="w-100" alt="" />
      </div>

      <div className="sliderProducts" />
      <div className="container">
        <div className="about-app">
          <h1>About Vendo</h1>
          <p>
            {`Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC.`}
          </p>
        </div>
        <div className="listProducts">
          <div className="row m-0">
            {array?.map((item, key) => (
              <div className="col-md-3" key={key}>
                <div className="card">
                  <div className="img">
                    <img className="card-img-top" src="/images/system1.png" alt="" />
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">Real Time Product</h4>
                    <p className="card-text">
                      IT solutions to the different Govt. and Private Organizations and solving
                      their problems of aligning IT with business direction.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="summary">
          <p>
            {`Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC.`}
          </p>
          <p>
            {`Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words.`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutProducts;
