import React from "react";
import { useSelector } from "react-redux";
import Header from "../../../layouts/Header";
import Sidebar from "../Layouts/Sidebar"; 

function MobileProfileImage() {
  const user = useSelector((state) => state.user.data);

  return (
    <div className="body-content">
      <div className="bg-muted">
        <Header />
        <div className="row m-0 ">
          <div className="col-md-4 col-lg-3 p-0 bg-white">
            <Sidebar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileProfileImage;
