import { useState } from "react";
import Countdown from "react-countdown";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Pagination from "../../../../components/Pagination";
import { getTaskWebsite } from "../../../../store/Task/index.ts";
import renderer from "../../../../utils/Renderer/index.js";
import WebsiteClick from "./WebsiteClick.jsx";

function TaskCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const list = props;
  const [showCounter, setshowCounter] = useState(false);
  const [timerCounter, setTimerCounter] = useState(0);
  const secTime = (time) => {
    return time * 1000;
  };
  const loadLink = (data) => {
    setshowCounter(true);
    setTimerCounter(
      secTime(data.website_click?.duration ?? data?.token?.duration)
    );

    // let height = window.screen.height;
    // let width = window.screen.width;
    // const url =
    // const newTask = window.open(
    //   data.url,
    //   "_blank"
    //   // `width=${width},height=${height - 150},top=0`
    // );

    // newTask.moveTo(300, 70);
    // const timer = setInterval(() => {
    //   window.addEventListener("beforeunload", function (e) {
    //     // newTask.close();
    //   });

    //   if (newTask.closed) {
    //     clearInterval(timer);
    //     // window.location.href = `/dashboard/reward?t=${data.id}&p=${data.points}&status=failed`;
    //     window.location.reload();
    //   }
    // }, 500);

    setInterval(() => {
      // newTask.close();
      navigate(
        `/dashboard/reward?t=${data.id}&p=${data.points}&status=done&b=${data?.bonus_points}`
      );
    }, secTime(data.website_click?.duration ?? data?.token?.duration));
  };

  // const [currentItems] = useState(1);
  // useEffect(() => {
  //   dispatch(getTaskWebsite({ page: currentItems, types: "website_click" }));
  // }, [dispatch, currentItems]);

  const handlePageClick = (event) => {
    const page = event.selected + 1;
    dispatch(getTaskWebsite({ page, types: "website_click" }));
  };

  return (
    <div>
      {list?.task?.totalItems === 0 ? (
        <div className="  text-center text-muted py-1 m-0">
          {/* <h6>
            No task today, Please Try again later
          </h6> */}
          <img
            src="/images/No data-amico.png"
            className="notFound p-0 m-0 col-12 col-md-8 shadow mx-auto"
            alt=""
          />
        </div>
      ) : (
        ""
      )}

      {showCounter && (
        <Countdown date={Date.now() + timerCounter} renderer={renderer} />
      )}

      <div className={`row m-0   taskCards p-0 `}>
        {list &&
          list?.task?.tasks?.map((item, index) => (
            <WebsiteClick
                item={item}
                index={index}
                key={index}
                loadLink={loadLink}
              />
          ))}
      </div>

      {/* pagination component  */}
      {list?.task?.totalItems ? (
        <Pagination
          pageCount={list?.task?.totalPages}
          onPageChange={handlePageClick}
          pageRangeDisplayed={9}
          justify={"center"}
        />
      ) : (
        ""
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={4993}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={true}
        progress={undefined}
      />
    </div>
  );
}

export default TaskCard;
