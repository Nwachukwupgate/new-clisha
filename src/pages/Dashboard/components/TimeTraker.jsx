import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import { Tooltip, OverlayTrigger } from 'react-bootstrap';


function TimeTraker({setShowGuide}) {
  // const [showTooltip, setShowTooltip] = useState(false);
  // const extensionDownloadLink = '/clishaMe20250325-Extension.zip';
  const { t } = useTranslation();
  const [showUpdateTooltip, setShowUpdateTooltip] = useState(false);

  const hasExt = window.localStorage.getItem('hasExt');
  const storedVersion = localStorage.getItem('extensionVersion');
  // update stored version to show popup
  const latestVersion = '1.0.0';

  useEffect(() => {
    if (storedVersion !== latestVersion) {
      setShowUpdateTooltip(true);
    }
  }, [storedVersion, latestVersion]);

  const handleDownload = () => {
    // setShowTooltip(false);
    // setShowGuide(true);
    setShowUpdateTooltip(false);
    localStorage.setItem('extensionVersion', latestVersion);
  };

  const handleUpdateDownload = () => {
    localStorage.setItem('extensionVersion', latestVersion);
  };

  const testServerExt = 'https://chromewebstore.google.com/detail/clishame/fggiejockcliimogohnaiakpbcjaafcl'; 
  const liveServerExt =
    'https://chromewebstore.google.com/detail/clishame/fggiejockcliimogohnaiakpbcjaafcl'
  const { host } = window.location;
  const newHost = 'clisha.me';
  return (
    <div>
      {showUpdateTooltip && (       
        <div
          className="update-tooltip shadow-sm text-center p-2 bg-warning text-dark rounded"
          onClick={handleUpdateDownload}
          style={{ cursor: 'pointer', marginBottom: '3px' }}
        >
          <strong>{t('updateNotice')}</strong>
        </div>
      )}

      {hasExt !== 'true' && (
        <div className="time_tracer_card row m-0 px-md-3 mt-2 shadow">
          <div className="col-9 px-0 ">
            <h6 className="b">{t('cardTitle')}</h6>
            <small>
              {t('cardText')}
            </small> 
          </div>
          {/* <div className="col-3 pl-0 ">
            <img src="/images/timetraker.png" className="link" alt="" />
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
          </div> */}

          <div className="col-3 pl-0 ">
            <div className="tracker_downloader shadow-sm link">
              <a
                title="Open Clisha Extention"
                href={host === newHost ? liveServerExt : testServerExt}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark"
              >
                <i className="fa fa-download" aria-hidden="true" onClick={handleDownload} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeTraker;
