import { useSelector } from 'react-redux';

function Task_Component() {
  const topUsers = useSelector((state) => state.general.topUsers);
  // console.log(topUsers)
  // const imgNull = "http://app.clisha.me/api/assets/profile/null";
  // console.log(topUsers)
  return (
    <div className="p-1 ">
      <div className="completed_task">
        <div className="header">
          <nav>
            <div className="nav nav-tabs  border-0" id="nav-tab" role="tablist">
              <button
                className="btn shadow-none  btn_plus active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Latest Top 10
              </button>
            </div>
          </nav>
          <div className="tab-content border-0" id="nav-tabContent">
            <div
              className="tab-pane fade show active border-0"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <span className="text-muted com_Txt  pl-2"> Community Member completed tasks</span>

              {/* images group */}
              <div className="users_groups">
                {topUsers?.slice(0, 10).map((item, key) => (
                  <span key={key}>
                    <img
                      key={key}
                      src={item?.photo ?? '/images/avatar.png'}
                      title={item?.username}
                      className="push-1 shadow mb-4 border link"
                      alt=""
                    />
                    {/* <span>{item?.user?.username?.slice(0, 13)}{".. "}</span> */}
                  </span>
                ))}
              </div>

              {/* <div className="under_progress_bar  pb-2">
                <div className="text_progress_bar mb-2">
                  <b>Progress</b>
                  <b className="text-warning float-right">35%</b>
                </div>
                <div className="progress ">
                  <div
                    className="progress-bar "
                    role="progressbar"
                    style={{ width: "25%" }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div> */}
            </div>
            <div
              className="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              ...
            </div>
            <div
              className="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              ...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task_Component;
