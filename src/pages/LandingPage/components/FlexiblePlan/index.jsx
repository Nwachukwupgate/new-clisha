import Plan from './Plan';

function index() {
  return (
    <div className="plan py-5 our-plan-box">
      <div className="container  text-center mt-3">
        <h3 className="plan-txt">
          <b>Select our flexible plan</b>
        </h3>
        <p className="col-md-8 m-auto">
          It is a long established fact that a reader will be distracted by the readable content of
          a page when looking at its layout. The point of using Lorem Ipsum is that it has a
          more-or-less normal distribution
        </p>

        <div className="btn-plan-box ">
          <ul className="nav nav-pills mb-3 " id="pills-tab" role="tablist">
            <li className="nav-item  " role="presentation">
              <a
                className="nav-link left-btn active"
                id="pills-home-tab"
                data-toggle="pill"
                href="#pills-home"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Home
              </a>
            </li>
            <li className="nav-item  " role="presentation">
              <a
                className="nav-link right-btn"
                id="pills-profile-tab"
                data-toggle="pill"
                href="#pills-profile"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Profile
              </a>
            </li>
          </ul>

          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <Plan />
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit autem porro laborum
              commodi voluptatum magni, consequuntur alias odit qui, minus harum laudantium fuga
              animi sit quas dolores totam beatae sapiente?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
