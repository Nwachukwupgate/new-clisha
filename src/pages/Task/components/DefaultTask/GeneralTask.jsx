import React, { useState } from 'react';
import Countdown from 'react-countdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getTask } from '../../../../store/Task/index';
import Pagination from '../../../../components/Pagination';
import WebsiteClick from '../WebsiteTask/WebsiteClick';
import renderer from '../../../../utils/Renderer/index';
import GenGoogleTask from './GoogleTask/GoogleTask';
import GenJourneyClick from './JourneyTask/JourneyClick';
import GenSearchJourney from './SearchJourneyTask/SearchJourney';

function GeneralTask(props) {
  const getTaskLoading = useSelector((state) => state.task.getTaskLoading);
  const getTaskWebsiteLoading = useSelector((state) => state.task.getTaskWebsiteLoading);
  const getTaskGoogleLoading = useSelector((state) => state.task.getTaskGoogleLoading);
  const getTaskJourneyLoading = useSelector((state) => state.task.getTaskJourneyLoading);
  const getTaskSearchJourneyLoading = useSelector(
    (state) => state.task.getTaskSearchJourneyLoading
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const list = props;
  const [showCounter, setshowCounter] = useState(false);
  const [timerCounter, setTimerCounter] = useState(0);
  const secTime = (time) => time * 1000;

  const loadLink = (data, extCode) => {
    setshowCounter(true);
    // setInterval(() => {
    //   toast.warning("After 30sec and then come back to here claim your bonus ");
    // }, 3000);

    setTimerCounter(secTime(data.website_click?.duration ?? data?.token?.duration));

    const url = data.url.startsWith('http') ? data.url : `https://${data.url}`;

    const newTask = window.open(url, '_blank');
    // newTask.moveTo(300, 70);
    const timer = setInterval(() => {
      window.addEventListener('beforeunload', (e) => {
        // newTask.close();
      });

      if (newTask.closed) {
        clearInterval(timer);
        // window.location.href = `/dashboard/reward?t=${data.id}&p=${data.points}&status=failed`;
        window.location.reload();
      }
    }, 500);
    setInterval(
      () => {
        // newTask.close();
        navigate(
          `/dashboard/reward?t=${data.id}&p=${data.points}&status=done&b=${data?.bonus_points}`
        );
      },
      secTime(data.website_click?.duration ?? data?.token?.duration)
    );
  };

  // const [currentItems] = useState(1);
  // useEffect(() => {
  //   dispatch(getTask({ page: currentItems, types: null }));
  // }, [dispatch, currentItems]);

  const handlePageClick = (event) => {
    const page = event.selected + 1;
    dispatch(getTask({ page, types: null }));
  };

  return (
    <div>
      {list?.task?.totalItems === 0 &&
      !getTaskLoading &&
      !getTaskWebsiteLoading &&
      !getTaskGoogleLoading &&
      !getTaskJourneyLoading &&
      !getTaskSearchJourneyLoading ? (
        <div className="  text-center text-muted py-1 m-0">
          {/* <h6>No task today, Please Try again later</h6> */}
          <img
            src="/images/No data-amico.png"
            className="notFound p-0 m-0 col-12 col-md-8 mx-auto"
            alt=""
          />
        </div>
      ) : (
        ''
      )}

      {showCounter && <Countdown date={Date.now() + timerCounter} renderer={renderer} />}

      <div className={`row m-0  taskCards p-0 `}>
        {list &&
          list?.task?.tasks?.map((item, index) => (
            <React.Fragment key={index}>
              {item.task_type === 'website_click' && (
                <WebsiteClick
                  item={item}
                  index={index}
                  key={index}
                  loadLink={loadLink}
                  extCode={list?.task?.extensionCode}
                />
              )}
              {item.task_type === 'google_search' && (
                <GenGoogleTask
                  item={item}
                  index={index}
                  key={index}
                  extCode={list?.task?.extensionCode}
                  isGen
                />
              )}
              {item.task_type === 'journey' && (
                <GenJourneyClick
                  item={item}
                  index={index}
                  key={index}
                  extCode={list?.task?.extensionCode}
                  isGen
                />
              )}
              {item.task_type === 'search_journey' && (
                <GenSearchJourney
                  item={item}
                  index={index}
                  key={index}
                  extCode={list?.task?.extensionCode}
                  isGen
                />
              )}
            </React.Fragment>
          ))}
      </div>

      {/* pagination component  */}
      {list?.task?.totalPages ? (
        <Pagination
          pageCount={list?.task?.totalPages}
          onPageChange={handlePageClick}
          pageRangeDisplayed={9}
          justify="center"
        />
      ) : (
        ''
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={4993}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={false}
        draggable
        progress={undefined}
      />
    </div>
  );
}

export default GeneralTask;
