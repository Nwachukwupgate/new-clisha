import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '../../../../components/Pagination';
import { getTaskGoogle } from '../../../../store/Task/index';

import GoogleTask from './GoogleTask';

function TaskCard2(props) {
  const dispatch = useDispatch();
  const list = props;

  const handlePageClick = (event) => {
    const newItems = event.selected + 1;
    dispatch(getTaskGoogle({ page: newItems, types: 'google_search' }));
  };

  return (
    <div>
      {list?.task?.totalItems === 0 ? (
        <div className="  text-center text-muted py-1 m-0">
          <img
            src="/images/No data-amico.png"
            className="notFound p-0 m-0 col-12 shadow col-md-8 mx-auto"
            alt="earn money online, paid to click, social media rewards clisha"
          />
        </div>
      ) : (
        ''
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
        closeOnClick
        pauseOnHover={false}
        draggable
        progress={undefined}
      />
      {list?.task?.totalItems ? (
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

export default TaskCard2;
