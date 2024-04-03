import React, { useEffect, useState } from "react";
import { getTaskJourney } from "../../../../store/Task/index.js";
import { useDispatch } from "react-redux";
import Pagination from "../../../../components/Pagination";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JourneyClick from "./SearchJourney.jsx";

function TaskCard4(props) {
  const dispatch = useDispatch();
  const list = props;

  const [currentItems] = useState(1);
  useEffect(() => {
    dispatch(getTaskJourney({ page: currentItems, types: "search_journey" }));
  }, []);

  const handlePageClick = (event) => {
    const newItems = event.selected + 1;
    dispatch(getTaskJourney({ page: newItems, types: "search_journey" }));
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
            className="notFound p-0 m-0 col-12 shadow col-md-8 mx-auto"
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
      {/* pagination component  */}
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

export default TaskCard4;
