function HeadBox() {
  return (
    <div className="headBox">
      <div className="row m-0">
        <div className="col-md-6 order-md-last p-0">
          <img src="/images/partner/headBox2.png" className="w-100" alt="earn money online, paid to click, social media rewards clisha" />
        </div>
        <div className="col-md-6 order-md-first p-0">
          <h3 className="headText">Click and Share</h3>
          <p className="bodyText">Best use of task and earn reward</p>
          <p className="smallBodyText">
            Nam id mi sollicitudin magna dictum pellentesque non ac purus. Etiam leo nibh, finibus
            eget porttitor sit amet, consequat ac lacus. Quisque ornare, arcu quis lacinia
            hendrerit, quam metus hendrerit mauris, sit amet luctus turpis sem nec diam. Aliquam
            feugiat nibh tortor, a varius leo tristique nec
          </p>

          <div className="inputX">
            <input type="text" placeholder="Your email" className="form-control" />
            <button className="btn-warning btn btn2  d-md-flex d-none ">Sign up</button>

            <button className="btn-warning btn btn3 w-100 d-md-none mt-2 ">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeadBox;
