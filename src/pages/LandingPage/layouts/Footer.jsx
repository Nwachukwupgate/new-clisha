import { openInNewTab } from "../../../utils/functions/functions";

function Footer() {
  return (
    <footer>
      <div className="container pt-5">
        <div className="row m-0">
          <div className="col-lg-5">
            <img src="images/Group 2311.png" alt="" />
            <span className="en-txt">EN</span>
          </div>
        </div>
        <div className="row m-0 mt-5">
          <div className="col-md-4 ">
            <h6>
              <i className="fa fa-map-marker" aria-hidden="true" /> Address Information{' '}
            </h6>
            <p>
              <small>
                VQualis Limited, Grand Industrial Building, Office 7/F <br />
                159-165 Wo Yi Hop Road Kwai Chung, Hongkong. <br />
              </small>
            </p>
          </div>
          <div className="col-md-4 ">
            <h6>
              <i className="fa fa-envelope" aria-hidden="true" /> Email Information{' '}
            </h6>
            <a href="malto:service@clisha.me" className="text-white ">
              <small>service@clisha.me</small>
            </a>
          </div>
          <div className="col-md-4 ">
            <h6>
              <i className="fa fa-globe" aria-hidden="true" /> Other Links{' '}
            </h6>
            {/* <ul className="p-0">
              <li>Pricing</li>
              <li>Become Partner</li>
              <li>Blog</li>
              <li>Partner Support Center</li>
              <li>Contact</li>
            </ul> */}
            <p className="p-0">Clisha will soon be present on various social media platforms. Get ready for a future full of creative videos and exciting social media campaigns</p>
          </div>

          <div className="col-lg-7 p-0">
            <ul className="footer-list2 text-center text-lg-left link  p-0">
              <li onClick={() => openInNewTab("https://vqualis.com/privacy-policy/")}>Privacy</li>
              <li onClick={() => openInNewTab("https://vqualis.com/terms-of-service/")}>
                Terms of Service
              </li>
              {/* <li>Affiliation</li>
              <li>Reward Program</li>
              <li>Support Center</li> */}
            </ul>
          </div>
          <div className="col-lg-5 text-right">
            <span className="follow-txt d-block text-center d-md-inline">
              Follow Us on social media
            </span>
            <div className="border-span d-none d-md-inline  " />
            <br className="d-block d-md-none" />
            <div className="social-link d-inline">
              <img src="images/Vector (1).png" className="ml-3" alt="" />
              <img src="images/Vector (2).png" className="ml-3" alt="" />
              <img src="images/Vector (3).png" className="ml-3" alt="" />
              <img src="images/Vector (4).png" className="ml-3" alt="" />
            </div>
          </div>
        </div>
      </div>
      <hr className="border-secondary" />
      <div className="container">
        <div className="copy-right row m-0  p-3">
          {/* <div className="col-lg-7 text-center small mt-1">
            <span>Mobile Apps : </span>
            <img src="images/Vector (5).png" className="link ml-3" alt="" />
            <img src="images/Vector (6).png" className="ml-2 link" alt="" />
          </div> */}
          <div className="col-12  text-center  small mt-2">
          <span>© Copyright {new Date().getFullYear()} clisha.me powered by VQualis. All right reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
