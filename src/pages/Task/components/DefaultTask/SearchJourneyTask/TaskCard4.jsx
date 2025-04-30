import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Pagination from '../../../../../components/Pagination';
import { getTaskJourney } from '../../../../../store/Task/index';
import JourneyClick from './SearchJourney';
import 'react-toastify/dist/ReactToastify.css';

function TaskCard4(props) {
  const dispatch = useDispatch();
  const list = props;

  const [currentItems] = useState(1);
  useEffect(() => {
    dispatch(getTaskJourney({ page: currentItems, types: 'search_journey' }));
  }, [currentItems, dispatch]);

  const handlePageClick = (event) => {
    const newItems = event.selected + 1;
    dispatch(getTaskJourney({ page: newItems, types: 'search_journey' }));
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
            alt="earn money online, paid to click, social media rewards, clisha"
          />
        </div>
      ) : (
        ''
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
        closeOnClick
        pauseOnHover={false}
        draggable
        progress={undefined}
      />
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
    </div>
  );
}

export default TaskCard4;
