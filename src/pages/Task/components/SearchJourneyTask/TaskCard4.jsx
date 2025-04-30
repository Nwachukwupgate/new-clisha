import { useDispatch } from 'react-redux';
import Pagination from '../../../../components/Pagination';
import { getTaskJourney } from '../../../../store/Task/index';

import JourneyClick from './SearchJourney';

function TaskCard4(props) {
  const dispatch = useDispatch();
  const list = props;

  const handlePageClick = (event) => {
    const newItems = event.selected + 1;
    dispatch(getTaskJourney({ page: newItems, types: 'search_journey' }));
  };

  return (
    <div>
      {list?.task?.totalItems === 0 ? (
        <div className="  text-center text-muted py-1 m-0">
          <img
            src="/images/No data-amico.png"
            className="notFound p-0 m-0 col-12 col-md-8 shadow mx-auto"
            alt="earn money online, paid to click, social media rewards, "
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
