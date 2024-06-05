import Popup from "../../../../components/Popup";
import { copyAndOpenTab } from "../../../../sass/utils/clipboardUtils";
import TaskCopy from "../TaskCards/TaskCopy";
import TaskFooter from "../TaskCards/TaskFooter";
import TextSection from "../TaskCards/TextSection";

function SearchJourney({ item, extCode }) {
  const handleCopyGo = async (item) => {
    await copyAndOpenTab(item, extCode);
  };

  const text = "Click the link to navigate to your task";

  return (
    <div className="col-lg-4 p-0 p-md-3  ">
      <div
        className="card p-2 task3Cards   "
        style={{ backgroundColor: item?.token?.background }}
      >
        {/* header task */}
        <div className="row m-0 header  py-3">
          <div className="col-12 text-center py-2 pr-0">
            {item?.token?.photo ? (
              <img src={item?.token?.photo} className="link " alt="" />
            ) : (
              <h4 className="task_name">{item?.token?.name}</h4>
            )}
          </div>
        </div>
        {/* section1 task */}

        <div
          className="modal fade"
          id={`${item.task_type + item.id}`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <Popup item={item} handleCopyGo={handleCopyGo} text={text} />
        </div>

        <div className="row m-0 header py-1">
          <div className="col-6">
            <img src="/images/Task/task2/task.png" alt="" />
            <small className="text-capitalize ml-1 badge badge-danger shadow ">
              {item?.task_type === "search_journey" ? "Search/Journey" : ""}
            </small>
          </div>
          <div className="col-6 mx-auto text-right">
            <button
              className="btn btn-sm  btn-success"
              data-toggle="modal"
              data-target={`#${item.task_type + item.id}`}
            >
              <img
                src="/images/Task/pointer.png"
                className="link visitImg "
                alt=""
              />
              Activate Task
            </button>
          </div>
        </div>
        {/* Text Section */}
        <TextSection item={item} />

        {/* ID Section  */}
        <hr />
        <TaskCopy item={item} />
        <hr />

        {/* footer */}
        <TaskFooter item={item} />
      </div>
    </div>
  );
}

export default SearchJourney;
