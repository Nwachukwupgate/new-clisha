import { useState, useEffect } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';


function TimeTraker({setShowGuide}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const extensionDownloadLink = '/clishaMe202502011044-Extension.zip';
  const [showUpdateTooltip, setShowUpdateTooltip] = useState(false);

  const hasExt = window.localStorage.getItem('hasExt');
  const storedVersion = localStorage.getItem('extensionVersion');
  // update stored version to show popup
  const latestVersion = '1.0.3';

  useEffect(() => {
    if (storedVersion !== latestVersion) {
      setShowUpdateTooltip(true);
    }
  }, [storedVersion, latestVersion]);

  const handleDownload = () => {
    setShowTooltip(false);
    setShowGuide(true);
    setShowUpdateTooltip(false);
    localStorage.setItem('extensionVersion', latestVersion);
  };

  const handleUpdateDownload = () => {
    localStorage.setItem('extensionVersion', latestVersion);
  };

  // const testServerExt = 'https://chrome.google.com/webstore/detail/clisha-extension/jagnnnnnooogbbpgjidbpockglhfoban'; 
  // const liveServerExt =
  //   'https://chrome.google.com/webstore/detail/clisha-extension/jagnnnnnooogbbpgjidbpockglhfoban';
  // const { host } = window.location;
  // const newHost = 'clisha-frontend.suna.ai';
  return (
    <div>
      {showUpdateTooltip && (       
        <div
          className="update-tooltip shadow-sm text-center p-2 bg-warning text-dark rounded"
          onClick={handleUpdateDownload}
          style={{ cursor: 'pointer', marginBottom: '3px' }}
        >
          <strong>Download New Extension Update</strong>
        </div>
      )}

      {hasExt !== 'true' && (
        <div className="time_tracer_card row m-0 px-md-3 mt-2 shadow">
          <div className="col-9 px-0 ">
            <h6 className="b">Get More Reward</h6>
            <small>
              click to add or update latest Chrome Browser Extension for more tasks and more rewards
            </small> 
          </div>
          <div className="col-3 pl-0 ">
            {/* <img src="/images/timetraker.png" className="link" alt="" /> */}
            <div className="tracker_downloader shadow-sm link">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip-top">Click to download manually and open installation guide</Tooltip>}
                show={showTooltip}
              >
                <a
                  title="Download Clisha Extention"
                  // href={host === newHost ? liveServerExt : testServerExt}
                  href={extensionDownloadLink}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onClick={handleDownload}
                >
                  <i className="fa fa-download" aria-hidden="true" />
                </a>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeTraker;
