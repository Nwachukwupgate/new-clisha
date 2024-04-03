import React from "react";

function Popup({ item, text, handleCopyGo }) {
  const testServerExt =
    "https://clisha-assets.fra1.digitaloceanspaces.com/extension%2Fclicha-extension-150.crx";
  const liveServerExt =
    "https://chrome.google.com/webstore/detail/clisha-extension/jagnnnnnooogbbpgjidbpockglhfoban";
  const hasExt = window.localStorage.getItem("hasExt");
  const history = window.location?.host;
  const newHost = "clisha.me";

  console.log(item);
  return (
    <div className="modal-dialog modal-sm" role="document">
      <div className="modal-content  task2_popup clisha_bg">
        <div className="modal-body text-center ">
          <div className="my-3">
            <img src="/images/popup/Group 1948 (1).png" alt="" />
          </div>

          <div>
            <img src="/images/popup/Group 76566.png" alt="" />
          </div>
          {item?.task_type === "website_click" && (
            <div>
              <small>
                {
                  "Please Visit this website and stay for 30sec and then come back to here claim your bonus "
                }
              </small>

              <input
                type="text"
                className="form-control mt-1"
                value={item && item?.google_search?.search_phrase}
                readOnly
              />
            </div>
          )}
          {(hasExt === "true" || history !== newHost) &&
          item?.task_type !== "website_click" ? (
            <div>
              <small>{"Click the button below to start your task"}</small>
              {item.task_type === "google_search" && (
                <input
                  type="text"
                  className="form-control mt-1"
                  value={item && item?.google_search?.search_phrase}
                  readOnly
                />
              )}
              {item?.task_type === "search_journey" && (
                <input
                  type="text"
                  className="form-control mt-1"
                  value={item && item?.google_search?.search_phrase}
                  readOnly
                />
              )}
              {item?.task_type === "journey" && (
                <input
                  type="text"
                  className="form-control mt-1"
                  value={item && item?.journey[0]?.description}
                  readOnly
                />
              )}
              <button
                className="btn btn_copy shadow border-0"
                onClick={(e) => {
                  handleCopyGo(item);
                }}
              >
                Copy
              </button>
            </div>
          ) : (
            <div>
              Please
              <a
                title="Open Clisha Extention"
                href={history === newHost ? liveServerExt : testServerExt}
                target="_blank"
                rel="noopener noreferrer"
                className="text-warning px-2"
              >
                Install and Activate Or Update
              </a>
              the Chrome Extention here before you solve this tasks, Reload the
              page after Installation
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Popup;
