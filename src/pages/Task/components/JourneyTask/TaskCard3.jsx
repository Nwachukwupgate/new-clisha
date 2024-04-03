import React from "react";
import { getTaskJourney } from "../../../../store/Task/index.js";
import { useDispatch } from "react-redux";
import Pagination from "../../../../components/Pagination";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JourneyClick from "./JourneyClick.jsx";

function TaskCard2(props) {
  const dispatch = useDispatch();
  const list = props;

  const handlePageClick = (event) => {
    const newItems = event.selected + 1;
    dispatch(getTaskJourney({ page: newItems, types: "journey" }));
  };

  return (
    <div>
      {list?.task?.totalItems === 0 ? (
        <div className="  text-center text-muted py-1 m-0">
          <img
            src="/images/No data-amico.png"
            className="notFound p-0 m-0 col-12 col-md-8 shadow mx-auto"
            alt=""
          />
        </div>
      ) : (
        ""
      )}

      <div className={`row m-0   taskCards p-0 `}>
        {list &&
          list?.task?.tasks?.map((item, index) => (
            <JourneyClick
              item={item}
              index={index}
              key={index}
              extCode={list?.task?.extensionCode}
              isGen={false}
            />
          ))}
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={4993}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={true}
        progress={undefined}
      />
      {list?.task?.totalPages ? (
        <Pagination
          pageCount={list?.task?.totalPages}
          onPageChange={handlePageClick}
          pageRangeDisplayed={9}
          justify={"center"}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default TaskCard2;
