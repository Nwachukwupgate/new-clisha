import React from "react";
import TaskCopy from "../TaskCards/TaskCopy";
import TaskFooter from "../TaskCards/TaskFooter";
import TaskLogo from "../TaskCards/TaskLogo";
import TextSection from "../TaskCards/TextSection";
import VisitCards from "../TaskCards/VisitCards";

function WebsiteClick({ item, index, loadLink, extCode }) {
  return (
    <div className="col-lg-4 p-0 p-md-3 ">
      <div
        className="card p-2   "
        style={{
          backgroundColor: item?.token?.background,
          color: item?.token?.foreground ?? "#fff",
        }}
      >
        {/* header task */}
        <TaskLogo item={item} />

        {/* section1 task */}
        <VisitCards item={item} loadLink={loadLink} extCode={extCode} />

        {/* Text Section */}
        <TextSection item={item} />

        {/* ID Section  */}
        <hr />
        {/* task copy */}
        <TaskCopy item={item} loadLink={loadLink} />
        <hr />

        {/* foooter cards */}
        <TaskFooter item={item} />
      </div>
    </div>
  );
}

export default WebsiteClick;
