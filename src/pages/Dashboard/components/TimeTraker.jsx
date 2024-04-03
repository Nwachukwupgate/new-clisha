import React from "react";

function TimeTraker() {
  const hasExt = window.localStorage.getItem("hasExt");
  const testServerExt =
    "https://clisha-assets.fra1.digitaloceanspaces.com/extension%2Fclicha-extension-150.crx";
  const liveServerExt =
    "https://chrome.google.com/webstore/detail/clisha-extension/jagnnnnnooogbbpgjidbpockglhfoban";
  const host = window.location.host;
  const newHost = "clisha.me";
  return (
    <div>
      {hasExt !== "true" && (
        <div className="time_tracer_card row m-0 px-md-3 mt-4 shadow">
          <div className="col-9 px-0 ">
            <h6 className="b">Get More Reward</h6>
            <small>
              click to add or update latest Chrome Browser Extension for more
              tasks and more rewards
            </small>
          </div>
          <div className="col-3 pl-0 ">
            {/* <img src="/images/timetraker.png" className="link" alt="" /> */}
            <div className="tracker_downloader shadow-sm link">
              <a
                title="Open Clisha Extention"
                href={host === newHost ? liveServerExt : testServerExt}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark"
              >
                <i className="fa fa-download" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeTraker;
