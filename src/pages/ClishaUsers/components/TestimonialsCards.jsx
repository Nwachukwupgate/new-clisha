import { useState } from 'react';

function TestimonialsCards() {
  const data = [1, 2, 3];
  const [isOver, setisOver] = useState();
  return (
    <div className="TestimonialsCards">
      <div className="row m-0">
        {data.map((item, key) => (
          <div className="col-md-4" key={key} onMouseOver={() => setisOver(key)}>
            <div className="card shadow">
              <div className="card-body">
                <h4 className="card-title">
                  <i className="fa fa-star text-warning mx-1" />
                  <i className="fa fa-star text-warning mx-1" />
                  <i className="fa fa-star text-warning mx-1" />
                  <i className="fa fa-star text-warning mx-1" />
                  <i className="fa fa-star-o mx-1 text-muted" />

                  <span className="float-right">
                    <b>4.95</b>
                  </span>
                </h4>
                <p className="card-text">
                  Nam id mi sollicitudin magna dictum pellentesque non ac purus. Etiam leo nibh,
                  finibus eget porttitor sit amet, consequat ac lacus. Quisque ornare, arcu quis
                  lacinia hendrerit, quam metus.
                </p>

                <div className="imgContainer ">
                  <img src="/images/users/avatar.png" alt="earn money online, paid to click, social media rewards clisha" />
                  <div className="lText">
                    <h3>Marina W.</h3>
                    <p className="rankText">Rank #0012</p>
                  </div>
                </div>

                {isOver === key && <button className="btn-danger btn w-100">See Plans</button>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="reviews mt-4 ">
        <span>
          Our <b>user</b> always love to give review us !{' '}
        </span>
        <i className="fa fa-star text-warning mx-1" />
        <i className="fa fa-star text-warning mx-1" />
        <i className="fa fa-star text-warning mx-1" />
        <i className="fa fa-star text-warning mx-1" />
        <i className="fa fa-star-o mx-1 text-muted" />
        <span>
          <b>4.95</b> based on <b className="text-warning">2.5 milion </b> Review
        </span>
        <img src="/images/partner/alexa.png" alt="earn money online, paid to click, social media rewards clisha" />
      </div>
    </div>
  );
}

export default TestimonialsCards;
