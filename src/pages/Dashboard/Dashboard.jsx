import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../layouts/Header";
import Sidebar from "../../layouts/Sidebar";
import LoadTask from "./components/Load_Task";
import Task from "./components/Task_Component";
import TimeTraker from "./components/TimeTraker";
import TodaysTask from "./components/TodaysTask";
import { useSelector } from "react-redux";
import moment from "moment";
import CalenderCard from "./components/CalenderCard";
import Wallet from "./components/Wallet";
import NotificationMessage from "../../components/Messages/NotificationMessage";
import Loading from "../../components/Alerts/Loading";

function Dashboard() {
  let navigate = useNavigate();

  const user = useSelector((state) => state.user.data);
  const vendoPackage = useSelector((state) => state.wallet.vendoPackage);
  const userLoading = useSelector((state) => state.user.loading);
  const task = useSelector((state) => state.task.data);
  const isProfile = window.localStorage.getItem("isProfile");

  const [perProfile, setPerProfile] = useState(100);

  const goTask = () => {
    navigate("/dashboard/task");
  };

  const profileCompletePercentage = (userArr) => {
    let completed = 0;
    const userEntries = [
      "firstname",
      "lastname",
      "gender",
      "birth_date",
      "phone",
      "country",
      "language",
      "region",
      "photo",
    ];
    userEntries.forEach((entry) => {
      if (user?.user[entry]) {
        completed += 1;
      }
    });

    // check is user data has returned
    const userInputs = Object.entries(user.user);
    if (userInputs.length > 0) {
      // update user completed profile percentage
      setPerProfile(Math.round((completed / 9) * 100));
    }
  };

  useEffect(() => {
    profileCompletePercentage();
  });

  const date = () => moment(Date.now()).format("MMMM DD, YYYY");

  return (
    <div>
      {userLoading && <Loading />}

      <NotificationMessage />

      <div className="bg-muted body-content ">
        <Header />
        <div className="row m-0 ">
          <div className="col-md-4 col-lg-2 p-0 bg-white m-0">
            <Sidebar />
          </div>
          <div className="col-md-8 col-lg-10 py-3 bg-white scroll-bg p-md-0 p-2 ">
            <div className="container p-0 ">
              <div className="row m-0 ">
                <div className="col-lg-6 mx-auto p-0 p-md-2">
                  <div className="welcome my-4 ">
                    {!userLoading && perProfile < 100 && (
                      <div
                        className="alert shadow-sm rounded-x alert-warning alert-dismissible fade show"
                        role="alert"
                      >
                        <button
                          type="button"
                          className="close"
                          data-dismiss="alert"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                          <span className="sr-only">Close</span>
                        </button>
                        {!user?.user?.email_verified_at ? (
                          <Link to={"/verify"} className="text-dark">
                            <b>Please verify your account here</b>
                          </Link>
                        ) : (
                          <Link to={"/dashboard/profile"} className="text-dark">
                            <b>Please update your profile here</b>
                          </Link>
                        )}
                        <span className="d-block ">
                          <span>
                            You are
                            <strong className="badge badge-pill badge-warning mx-2">
                              {isProfile ? perProfile : 0}%
                            </strong>
                            done
                          </span>
                          {/* <span>
                          You are
                          <strong className="badge badge-pill badge-warning mx-2">
                            {isProfile ? perProfile : 0}%
                          </strong>
                          done
                        </span> */}
                        </span>
                      </div>
                    )}
                    <div className="nav-link point d-block d-md-none m-0 p-0 py-3 shadow-m px-2 rounded my-2 bg-light">
                      <small className="d-block text-secondary pb-2">
                        Total Coin
                      </small>
                      <img
                        src="/images/point.png"
                        className="mail mr-2 "
                        alt=""
                      />
                      <span className="text-dark b">
                        {user && user?.rank?.balance} PTS
                      </span>
                    </div>
                    <span className="text-muted font-weight-bold  text-capitalize">
                      hello, {user?.user?.username}!
                    </span>
                    <h4 className=" text-capitalize mt-3 text-secondary">
                      You’ve got{" "}
                      {task?.totalItems && task?.totalItems !== "Undefined"
                        ? task?.totalItems + " tasks Today"
                        : " no task yet"}
                    </h4>
                  </div>

                  <div className="seacrh_box mb-3  d-none">
                    <i
                      className="fa fa-search text-muted"
                      aria-hidden="true"
                    ></i>
                    <input
                      type="text"
                      placeholder="Search something..."
                      className="form-control shadow-sm "
                    />
                  </div>
                  <div className="d-block d-md-none">
                    <TimeTraker />
                  </div>

                  {/* only task features card */}

                  <div className="my_task_container p-md-2   mt-1">
                    {/* <h2 className="font-weight-bold text-left ">My tasks</h2> */}
                    <Wallet user={user} vendoPackage={vendoPackage} />
                    {/* //top 10 users */}
                    <Task />
                    <LoadTask task={task} />
                  </div>
                </div>
                <div className="col-lg-5  mx-auto mt-3 mt-md-5 p-0">
                  <div className="d-none d-md-block">
                    <TimeTraker />
                  </div>
                  {/* start task component */}

                  <div className="row mx-0 my-3  mt-5 start_task_component">
                    <div className="col-6">
                      {user?.timezone?.time && (
                        <span>
                          {date()} -{" "}
                          {`${user?.timezone?.time} ${
                            parseInt(user?.timezone?.time.split(":")[0]) > 12
                              ? "pm"
                              : "am"
                          }`}
                        </span>
                      )}
                      <h4>Today</h4>
                    </div>
                    <div className="col-6 p-0  text-right">
                      <button
                        onClick={goTask}
                        className="btn btn_task  px-md-5 px-4 shadow py-md-3"
                      >
                        Start tasks
                      </button>
                    </div>
                  </div>
                  <CalenderCard />
                  <TodaysTask user={user} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
