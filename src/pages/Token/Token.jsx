 import React from "react";
import { useSelector } from "react-redux"; 
import Welcome from "../../components/Welcome/Welcome";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import Sidebar from "../../layouts/Sidebar";
import CardsView from "./components/CardsView";
// import CardsView from "./components/CardsView"; 
function Token() {
  const user = useSelector((state) => state.user.data);

  return (
    <div className="body-content">
      <div className="bg-muted ">
        <Header />
        <div className="row m-0 ">
          <div className="col-md-4 col-lg-2 p-0 bg-white m-0">
            <Sidebar />
          </div>
          <div className="col-md-8 col-lg-10 py-3 scroll-bg bg-white p-0">
              <div className="p-0 p-md-3 ">
              <Welcome user={user} />
              <CardsView user={user} />
              {/* <Footer user={user} /> */}
            </div> 
            <div className="container d-none text-center p-0 p-md-3 pt-4">
              {/* <h3 className="soonText text-center">Coming soon</h3>

              <div className="row m-0 p-0">
                <img
                  src="/images/soon5.webp"
                  className="col-md-10 col-12 mx-auto"
                  alt=""
                />
              </div>
              <Link
                to={"/dashboard"}
                className="btn shadow btn-primary mt-5 mt-md-0"
              >
                <i className="fa fa-long-arrow-left" aria-hidden="true"></i>{" "}
                back
              </Link> */}

              {/* <Welcome />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum
              laboriosam soluta porro distinctio, et dicta expedita enim aliquid
              blanditiis modi, hic quos nostrum est. Aut sequi at rerum eveniet
              voluptates! */}
              {/* <TaskCard /> */}
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Token;
