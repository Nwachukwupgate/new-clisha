import { useState } from 'react';
// import Calendar from 'react-calendar'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  addCalenderTask,
  callenderDateFun,
  generalSelectReloadingCalendar,
  getCalenderTaskReload,
  getCustomDateCallender,
} from '../../../store/General';
import ThumbsUp from '../../../assets/image/thumbs.jpg'

const CalenderCard = ({verificationDate}) => {
  const [isHover, setIsHover] = useState(null);
  const [openCallender, SetopenCallender] = useState(false);
  const dispatch = useDispatch();
  // const [value, onChange] = useState(new Date());
  const calenderTask = useSelector((state) => state.general?.calenderTask?.monthlyData);
  const { loading } = useSelector((state) => state.general);

  console.log('loading', loading);

  const reloadingCalendar = useSelector(generalSelectReloadingCalendar);
  const parsedVerificationDate = verificationDate ? moment(verificationDate) : null;

  // const callenderDate = useSelector((state) => state.general?.callenderDate);
  const [date, setDate] = useState({
    start_date: calenderTask?.date,
    // end_date: null
  });

  const setDateFunc = (e) => {
    const { value } = e.target;
    setDate({
      ...date,
      [e.target.name]: value,
    });
    SetopenCallender(false);
    dispatch(addCalenderTask(value));
  };

  const getTodaysList = (item) => {
    dispatch(
      callenderDateFun({
        callenderDate: item?.date,
        callender_length: item?.completedTasks,
      })
    );
    dispatch(getCustomDateCallender({ callenderDate: item?.date }));
  };

  const filteredTasks = calenderTask?.filter((item) =>
    parsedVerificationDate ? moment(item.date).isSameOrAfter(parsedVerificationDate, 'day') : true
  );

  return (
    <div className="Calender border rounded-lg text-center ">
      <div className="start_end_Date m-0 py-2 pt-4 text-center">
        <div className="current text-uppercase">
          <div className="calendarCard__header">
            <div className="calendarCard__datePicker">
              {date && moment(date.start_date).format('MMMM YYYY')} Statistics
              <i
                title="Pick Month"
                className="ml-3 link fa fa-calendar"
                onClick={() => SetopenCallender(true)}
                aria-hidden="true"
              />
            </div>
            <div className="calendarCard__icon">
              {reloadingCalendar ? (
                <i className="fa fa-circle-o-notch fa-spin" />
              ) : (
                <i
                  className="fa fa-refresh"
                  aria-hidden="true"
                  onClick={() => {
                    if (!reloadingCalendar) {
                      dispatch(getCalenderTaskReload());
                    }
                  }}
                />
              )}
            </div>
          </div>
          {openCallender && (
            <div className="callender-box shadow ">
              <div className="row m-0">
                <div className="col-12 p-1">
                  <i
                    className=" fa fa-close bg-secondary"
                    onClick={() => SetopenCallender(false)}
                  />
                  <label htmlFor="start_date">Pick Month</label> <br />
                  <input
                    type="month"
                    className="form-control"
                    onChange={setDateFunc}
                    name="start_date"
                  />
                </div>
                {/* <div className="col-6 p-1">
                  <label htmlFor="end_date">End Date</label> <br />
                  <input type="date" className='form-control' onChange={setDateFunc} name="end_date" />
                </div>  */}
              </div>
            </div>
          )}
        </div>
      </div>
      {loading ? (
        <div className="text-center my-3">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <ul className="row m-0 p-0" onMouseLeave={() => setIsHover(null)}>
          {filteredTasks &&
            filteredTasks.map((item, key) => (
              <a href="#/" className="col-2 py-3 link" key={key} onClick={() => setIsHover(key)}>
                {key === isHover && (
                  <div
                    className={`data-event-hover shadow border 
                ${
                  item?.createdTasks && item?.createdTasks <= item?.completedTasks
                    ? 'border-success'
                    : ''
                } 
                ${
                  item?.completedTasks && item?.createdTasks > item?.completedTasks
                    ? 'border-warning'
                    : ''
                } 
                ${
                  !item?.completedTasks &&
                  item?.createdTasks &&
                  moment(item?.date).format('YY-MM-DD') <= moment(Date.now()).format('YY-MM-DD')
                    ? 'border-danger'
                    : ''
                } 
                `}
                    data-toggle="modal"
                    data-target="#load"
                    onClick={() => {
                      getTodaysList(item);
                    }}
                  >
                    {(item.completedTasks > item.createdTasks
                      ? item.createdTasks
                      : item.completedTasks) ?? 0}
                    /{item.createdTasks ?? 0}{' '}
                    {moment(item?.date).format('YY-MM-DD') <= moment(Date.now()).format('YY-MM-DD')
                      ? 'Completed'
                      : 'Future Task'}
                    {item?.createdTasks && item?.createdTasks <= item?.completedTasks ? (
                      <img src="/images/rocket.png" className="emojiCalendersm rot" alt="Rocket" />
                    ) : item.completedTasks >= 10 ? (
                      <img src={ThumbsUp} className="emojiCalendersm" alt="Thumbs Up" />
                    ) : (
                      ''
                    )}
                    {item?.completedTasks && item?.createdTasks > item?.completedTasks ? (
                      <img className="emojiCalendersm" src="/images/smiley.jpeg" alt="" />
                    ) : (
                      ''
                    )}
                    {!item?.completedTasks &&
                    item?.createdTasks &&
                    moment(item?.date).format('YY-MM-DD') <= moment(Date.now()).format('YY-MM-DD') ? (
                      <img className="emojiCalendersm" src="/images/sad.png" alt="" />
                    ) : (
                      ''
                    )}
                  </div>
                )}
                {moment(item.date).format('D')}
                {item?.createdTasks && item?.createdTasks <= item?.completedTasks ? (
  <img src="/images/rocket.png" className="isDate" alt="Rocket" />
) : item?.completedTasks >= 10 ? (
  <img src={ThumbsUp} className="emojiCalender" alt="Thumbs Up" />
) : item?.completedTasks && item?.createdTasks > item?.completedTasks ? (
  <img className="emojiCalender" src="/images/smiley.jpeg" alt="Smiley" />
) : !item?.completedTasks &&
  item?.createdTasks &&
  moment(item?.date).format('YY-MM-DD') <= moment(Date.now()).format('YY-MM-DD') ? (
  <img className="emojiCalender" src="/images/sad.png" alt="Sad" />
) : null}


                {/* {item?.completedTasks && item?.createdTasks > item?.completedTasks ? (
                  <img className="emojiCalender" src="/images/smiley.jpeg" alt="" />
                ) : (
                  ''
                )}
                
                {item.completedTasks >= 10 ? (
                  <img src={ThumbsUp} className="emojiCalendersm" alt="Thumbs Up" />
                    ) : (
                  ''
                )}
                {!item?.completedTasks &&
                item?.createdTasks &&
                moment(item?.date).format('YY-MM-DD') <= moment(Date.now()).format('YY-MM-DD') ? (
                  <img className="emojiCalender" src="/images/sad.png" alt="" />
                ) : (
                  ''
                )}
                {item?.createdTasks && item?.createdTasks <= item?.completedTasks ? (
                  <img src="/images/rocket.png" className="isDate" alt="" />
                ) : (
                  ''
                )} */}
                {/* {item.createdTasks ? <img src="/images/error.png" className='isDate' alt="" /> : ""} */}
              </a>
            ))}
        </ul>
      )}
      {!loading && !calenderTask?.length && (
        <div className="nocalenderTask shadow text-danger">
          There is no task for the month of {moment(date.start_date).format('MMMM')}
        </div>
      )}

      <div className="chart text-left p-4 d-none">
        <div className="">😔 I have not done any task today</div>
        <div className="">😊 I have finished some task today</div>
        <div>
          <img src="/images/rocket.png" alt="" /> I have Finish all my task today
        </div>
      </div>
    </div>
  );
};

export default CalenderCard;
