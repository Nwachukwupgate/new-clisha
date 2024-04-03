import React from 'react'
import { translate } from '../../../../utils/translation';

function index() {
  return (
    <div className="numbering-task container p-2 ">
      <div className="row m-0 bg-white col-lg-12 mx-auto">
        <div
          className="col-lg-4 col-md-6 mx-auto task shadow mt-3 mt-md-0 "
          data-aos="flip-down"
          data-aos-duration="1200"
        // data-aos-delay="100"
        >
          <h1>1</h1>
          <h4>Signup</h4>
          <p>
            {translate("usePlatformSignup")}
          </p>
        </div>
        <div
          className="col-lg-4 col-md-6 mx-auto task task2 shadow mt-3 mt-md-0"
          data-aos="flip-down"
          data-aos-duration="1200"
        // data-aos-delay="600"
        >
          <h1 className="text-white">2</h1>
          <h4>Get Task</h4>
          <p>
            {translate("usePlatformGetTask")}
          </p>
        </div>
        <div
          className="col-lg-4 col-md-6 mx-auto mx-md-auto mx-lg-0 task shadow mt-3 mt-md-0  bg-white"
          data-aos="flip-down"
          data-aos-duration="1200"
        // data-aos-delay="600"
        >
          <h1>3</h1>
          <h4>Earn Point</h4>
          <p>
            {translate("usePlatformGainPoint")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default index