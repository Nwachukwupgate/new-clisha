import { useState } from 'react';
// import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import {
  callenderDateFun,
  emptyDate,
  // generalSelectTaskModalList,
  getCustomDateCallender,
} from '../../../store/General';

export const TaskCompleted = (props) => {
  const [isCopy, setIsCopy] = useState(false);
  const [isDetails, setisDetails] = useState(false);

  const handleCopy = (msg) => {
    navigator.clipboard.writeText(msg).then(() => {
      setIsCopy(true);
      setTimeout(() => {
        setIsCopy(false);
      }, 1000);
    });
  };
  const { item } = props;
  const { isModal } = props;

  return (
    // Todo: fix completed task for all oloers of task
    <div
      className={`m-0 todays_task row pb-4  link ${
        item.status === 1 ? 'completedTask' : 'failedTask'
      }`}
      onClick={() => setisDetails(!isDetails)}
      style={{
        background: item?.token?.background,
        color: item?.token?.foreground,
      }}
      title="Click on the task to see more details"
    >
      {isModal && <div className="hrline" />}
      {isModal && <img src="/images/roundimg.png" className="roundimg" alt="" />}
      <div className="col-10">
        <h6>
          {/* <b>{item?.token?.name ? item?.token?.name : "Venooor"}</b> */}
          <img src={item?.token?.photo} alt="" className="ImgPhoto" />
        </h6>
        {isDetails && (
          <div className="details text-center">
            {item.status === 1 ? (
              <p>
                Task was completed succesfully and your wallet is credited with{' '}
                <b> {item.points} Points</b>
              </p>
            ) : (
              'You have failed this task and you didnt earn any point'
            )}
          </div>
        )}
      </div>
      <div className="col-2 ">
        {item.status === 1 ? (
          <i className="fa fa-check show_todays_task text-success shadow" aria-hidden="true" />
        ) : (
          <i className="fa fa-close show_todays_task shadow text-danger" aria-hidden="true" />
        )}
      </div>
      <div className="col-12 p-0 py-1">
        <div className="row m-0 header p-0">
          <div className="col-5 p-0 text-right">
            <img src="/images/Task/task2/finger.png" alt="" />
            <span>Task ID: </span>
          </div>
          <div className={`col-7 p-0 text-left pl-2 ${!isCopy ? '' : 'text-success'}`}>
            <b>
              {isCopy ? 'Copied ' : item.task_code}

              <i
                className={`link visitImg ml-1 fa ${!isCopy ? 'fa-copy' : ' fa-check'}`}
                onClick={(e) => handleCopy(item.task_code)}
                alt=""
              />
            </b>
          </div>
        </div>
      </div>
    </div>
  );
};

function TodaysTask({ user }) {
  const data = user?.completed;
  const callender_date = useSelector((state) => state.general.callenderDate);
  const callender_length = useSelector((state) => state.general.callender_length);
  const customDateTask = useSelector((state) => state.general.customDateTask);
  // console.log("+++", customDateTask, "--->");
  // const modalList = useSelector(generalSelectTaskModalList);
  const dispatch = useDispatch();
  const closeTodaysList = (item) => {
    dispatch(
      callenderDateFun({
        callenderDate: '',
        callender_length: '',
      })
    );

    dispatch(emptyDate());
  };
  const getCustomDateCallenderFunc = (date) => {
    dispatch(getCustomDateCallender({ callenderDate: date }));
  };

  return (
    <div className="pl-5 border-left mt-3 muted">
      {data?.length !== 0 && (
        <div>
          <div
            className="modal fade"
            id="load"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modelTitleId"
            aria-hidden="true"
            data-keyboard="false"
            data-backdrop="static"
          >
            <div className="modal-dialog document-right " role="document">
              <div className="modal-content ">
                <div className="modal-header">
                  <h6 className="modal-title">
                    Completed Task history {callender_date ? callender_length : data?.length}{' '}
                    task(s)
                  </h6>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => closeTodaysList()}
                  >
                    {' '}
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body  pb-4 pt-0">
                  {customDateTask?.data?.completed?.rows?.slice(0, 3).map((item, index) => (
                    <TaskCompleted key={index} item={item.task} />
                  ))}

                  {customDateTask?.data?.completed?.rows?.length > 3 && (
                    <div className="text-center p-4">
                      <button
                        // data-toggle="modal"
                        // data-target="#load"
                        to="/dashboard/completed-task"
                        className="text-dark btn shadow border"
                      >
                        Load More {customDateTask.data.completed.rows.length - 3}
                        <i className="fa fa-long-arrow-right ml-2 shadow-none" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <h6> Completed Task history {data && data?.length} task(s)</h6>
          {data?.slice(0, 4).map((item, index) => (
            <TaskCompleted key={index} item={item} isModal />
          ))}
          <div className="viewTodaysTasks">
            <div className="viewBtn text-center p-3">
              <button
                data-toggle="modal"
                data-target="#load"
                className="btn shadow border "
                onClick={() => getCustomDateCallenderFunc(callender_date)}
              >
                View All Task History <i className="fa fa-long-arrow-right" aria-hidden="true" />
              </button>
            </div>

            {/* {customDateTask?.data &&
              customDateTask?.data?.completed?.rows.map((item, index) => (
                <TaskCompleted key={index} item={item?.task} />
              ))} */}
          </div>
        </div>
      )}
    </div>
  );
}

export default TodaysTask;
