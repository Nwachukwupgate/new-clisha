import React from "react";
import { useSelector } from "react-redux";
import ProfilePicture from "../../../utils/ProfilePicture";

function HeaderWelcomeMobile(props) {
  let username = localStorage.getItem("username");
  const user = props?.user;
  const rank = useSelector((state) => state.rank);

  return (
    <div className="welcome mobile p-0 my-4  d-block d-lg-none">
      <span className="text-muted font-weight-bold d-block text-capitalize p-2">
        hello, {username}! <small className="float-right">{props.date}</small>
      </span>
      <div className="section-head p-2">
        <h6 className=" text-capitalize mt-3 d-inline">
          <b>
            {" "}
            your Ranking Position {user && user?.rank?.position}/
            {rank?.data?.totalItems}
          </b>
        </h6>
      </div>
      {/* Fix Mobile Screen for Rank well */}
      <div className="section-star-rank ">
        <div className="row m-0">
          <div className="col-12">
            <img
              src={ProfilePicture({
                gender: user?.user?.gender,
                photo: user?.user?.photo,
              })}
              className="avatar"
              alt=""
            />
            <span className="ml-2 username"> {username}</span>
            <img
              src={`/images/stars/${
                user?.rank?.rankName?.slice(7) ?? "bronze"
              }.png`}
              className="stars mt-4"
              alt=""
            />
          </div>
          <div className="check_rank">
            <small>AdStar</small>
            <br />
            <small className=" ml-3">
              {user && user?.rank?.rankName?.slice(6)}
            </small>
          </div>
          <img
            src={`/images/rank/${user?.rank?.rankName
              ?.slice(7)
              .toLowerCase()}.png`}
            className="latest_rank"
            alt=""
          />

          {/* <div className="col-5 text-right pt-5 pr-2"> */}
          {/* 
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default HeaderWelcomeMobile;
