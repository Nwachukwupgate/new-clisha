import React, { useEffect, useState } from "react";
import { getTaskGoogle } from "../../../../store/Task/index.js";
import { useDispatch } from "react-redux";
import Pagination from "../../../../components/Pagination";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GoogleTask from "./GoogleTask.jsx";
function TaskCard2(props) {
  const [currentItems] = useState(1);
  const list = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaskGoogle({ page: currentItems, types: "google_search" }));
  }, []);

  const handlePageClick = (event) => {
    const newItems = event.selected + 1;
    dispatch(getTaskGoogle({ page: newItems, types: "google_search" }));
  };

  return (
    <div>
      {list?.task?.totalItems === 0 ? (
        <div className="  text-center text-muted py-1 m-0">
          <img
            src="/images/No data-amico.png"
            className="notFound shadow p-0 m-0 col-12 col-md-8 mx-auto"
            alt=""
          />
        </div>
      ) : (
        ""
      )}

      <div className={`row m-0   taskCards p-0 `}>
        {list &&
          list?.task?.tasks?.map((item, index) => (
            <GoogleTask
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
      {list?.task?.totalItems === 0 ? (
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
