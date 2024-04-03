import React from 'react' 
// import { TaskCompleted } from "./TodaysTask"

const Today_DetailsTasks = (props) => {
    return (
        <div
            className="modal fade"
            id="load2"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modelTitleId"
            aria-hidden="true"
        >
            <div className="modal-dialog document-right " role="document">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h6 className="modal-title">
                            {/* Task history {data && data.length} task(s) */}
                        </h6>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body pb-4 pt-0">
                        {/* {data?.map((item, index) => (
                            <TaskCompleted key={index} item={item} />
                        ))} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Today_DetailsTasks;
