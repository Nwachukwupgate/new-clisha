import { partnersImg } from '../../../json/nav';

function OurExclusivePartner() {
  return (
    <div className="OurExclusivePartner ">
      <h1>Our Exlcusive Partners Feedback</h1>
      <p className="bodyTextView">
        Nam id mi sollicitudin magna dictum pellentesque non ac purus. Etiam leo nibh, finibus eget
        porttitor sit amet, consequat ac lacus. Quisque ornare, arcu quis lacinia hendrerit, quam
        metus hendrerit mauris, sit amet luctus turpis sem nec diam. Aliquam feugiat nibh tortor, a
        varius leo tristique nec
      </p>

      <div className="cardimg">
        <div className="row m-0">
          {partnersImg?.map((item, key) => (
            <div className="col-md-4 " key={key}>
              <div className="card">
                <img className="card-img-top" src={item?.img} alt="social media rewards clisha" />
                <div className="card-body p-2">
                  <h4 className="card-title">{item?.name}</h4>
                  <p className="card-text">{item?.position}</p>
                  <p className="card-text">{item?.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurExclusivePartner;
