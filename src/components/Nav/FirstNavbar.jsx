function FirstNavbar({ bg }) {
  return (
    <div className="nav-bg ">
      {/* first header start */}
      <div className={`first-header  p-2   ${bg}`}>
        <div className="container  small ">
          <ul className="p-0">
            {/* <li className="border-right pr-3 border-warning">
              <a href="/">Contact Us</a>
            </li>
            <li className="border-right pr-3 border-warning">
              <a href="/#about">About Us</a>
            </li> */}
            <li className="border-right pr-2 border-0">
              <a href="mailto:daniel.meyer@vqualis.com">Support</a>
            </li>
          </ul>

          <ul className="second-ul p-0 d-none d-lg-flex">
            <li>
              <a href="/">
                <img src="/images/mapmaker.png" className="link mr-1" alt="" title="Visit" />
                <span>VQualis Limited, Grand Industrial Building, Office 7/F</span>
              </a>
            </li>
            {/* <li> */}
            {/* <a href="/">
                                <img
                                    src="/images/bi_phone.png"
                                    className="mr-1"
                                    alt=""
                                    title="Visit"
                                /> 
                               <span>+49 21 296 140 1204</span> 
                            </a> */}
            {/* </li> */}
            <li>
              <a href="mailto:daniel.meyer@vqualis.com">
                <img src="/images/globe.png" className="link mr-1" alt="" title="Visit" />
                <span>daniel.meyer@vqualis.com</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FirstNavbar;
