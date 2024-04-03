import React from "react";
import { useSelector } from "react-redux";
import ProfilePicture from "../../../utils/ProfilePicture";

function HeaderWelcome(props) {
  const user = props?.user;
  const rank = useSelector((state) => state.rank);

  let username = localStorage.getItem("username");
  const list = () => {
    const rank = user?.rank?.rankName?.slice(7);
    let arr = 0;
    if (rank === "Bronze") arr = 1;
    else if (rank === "Silver") arr = 2;
    else if (rank === "Gold") arr = 3;
    else if (rank === "Platinium") arr = 4;
    else if (rank === "Diamond") arr = 5;
    else if (rank === "Master") arr = 6;
    else if (rank === "Grandmaster") arr = 7;
    return [...Array(arr)];
  };

  return (
    <div className="welcome my-4  d-none d-lg-block">
      <span className="text-muted font-weight-bold  text-capitalize ">
        hello, {username}!
      </span>
      <div className="section-head">
        <h4 className=" text-capitalize mt-3 d-inline">
          <b>
            {" "}
            your Ranking Position {user && user?.rank?.position}/
            {rank?.data?.totalItems}
          </b>
        </h4>
        <span className="float-right">{props.date}</span>
      </div>

      <div className="section-star-rank ">
        <div className="row m-0">
          <div className="col-lg-7">
            <img
              src={ProfilePicture({
                gender: user?.user?.gender,
                photo: user?.user?.photo,
              })}
              className="avatar "
              alt=""
            />
            <span className="ml-2 username my-username">
              {(user && user?.user?.firstname) ?? username}
              {/* THE */}
            </span>
            {/* <img
              src={`/images/stars/${user?.rank?.rankName
                .slice(7) ?? "bronze"}.png`}
              className="stars mt-4"
              alt=""
            /> */}
            <div className="secondnameDiv ">
              <span className="secondname text-white impact">
                {user && user?.user?.lastname}
              </span>
              <span className="starsModel ml-3">
                {list() &&
                  list()?.map((item, index) => (
                    <i
                      key={index}
                      className="fa fa-star"
                      aria-hidden="true"
                    ></i>
                  ))}
              </span>
            </div>
          </div>
          <div className="col-md-5 text-right pt-5 pr-2">
            <img
              src={`/images/rank/${user?.rank?.rankName
                ?.slice(7)
                .toLowerCase()}.png`}
              className="latest_rank"
              alt=""
            />
            <span className="rank_text mt-4 text-white impact">AdStar</span>

            <span className="rank_name impact">
              {user && user?.rank?.rankName?.slice(6)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderWelcome;
