import React, { useEffect } from "react";
import PaginateBtn from "../../../../utils/UPPaginateBtn/PaginateBtn";
import ProfilePicture from "../../../../utils/ProfilePicture";
import { useSelector } from "react-redux";

function Paginate() {
  const rank = useSelector((state) => state.rank);
  useEffect(() => {
    return PaginateBtn({
      containerId: "rankslider",
      leftId: "floatLeft",
      rightId: "floatRight",
    });
  }, []);
  return (
    <div className="top-user">
      <div className="container mt-5">
        <div className="row mb-4 mx-0">
          <div className="col-7">
            <h3 className="top-companies-txt ml-md-3">
              <b>Top 10 Users(Rank)</b>
            </h3>
          </div>
          <div className="col-5 text-right">
            <button
              className="btn-angle disabledLink shadow-sm  mr-2 border"
              id="floatLeft"
            >
              <i className="fa fa-angle-left  "></i>
            </button>
            <button
              className="btn-angle activeLink  shadow-sm border"
              id="floatRight"
            >
              <i className="fa fa-angle-right "></i>
            </button>
          </div>
        </div>

        {/* cards */}
        <div className=" m-0 mt-2 scroll-hor-div" id="rankslider">
          {rank &&
            rank?.data?.ranking?.slice(0, 10).map((item, index) => (
              <div
                className="card thirdcard maincard mt-4 bg-white shadow p-1 pt-3 mx-2 "
                key={index}
                data-aos="zoom-out"
                data-aos-duration="1000"
                // data-aos-delay="600"
              >
                <img
                  className={`card-img images3 `}
                  src="/images/profile_border.png"
                  alt=""
                />
                <img
                  className="Profile_logo_rank"
                  src={ProfilePicture({
                    gender: item?.user?.gender,
                    photo: item?.user?.photo,
                  })}
                  alt=""
                />
                <img
                  className={`card-img images4 rank_landing_page`}
                  src={`/images/rank/${
                    item?.rankName?.slice(7) ?? "bronze"
                  }.png`}
                  alt=""
                />
                <div className="badge-number badge-number2 ">
                  <span>#{item.position}</span>
                </div>

                <div className="card-body px-2">
                  <div className="investment">
                    <small>Total Point</small>
                    <span className="float-right">
                      <span className="m-text">{item.total_points}</span>
                    </span>
                  </div>
                  <div className="active-task mt-2 font-weight-bold">
                    {item?.user?.firstname ?? item?.user?.username}{" "}
                    {item?.user?.lastname ?? ""}
                  </div>
                  <button
                    title="coming soon"
                    className="btn btn-danger mt-3 shadow rounded-x w-100"
                  >
                    <small>View Profile</small>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Paginate;
