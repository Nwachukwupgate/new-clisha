import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import {SelectExtension, LoadUnpacked, ManageExt, PickExtension, SelectMenu, SelectExt, DownloadExt, DevOn} from '../../../assets/image/guide/index';


function GuidePopup({ show, onClose }) {
  const [, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    onClose()
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className='text-center' style={{ textAlign: 'center' }}>
        <Modal.Title className='fs-6' style={{ fontSize: '20px' }}>Steps to Manually Install Clisha Chrome Extension</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light px-4" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
        {/* Step 1 */}
        <div className="mb-4">
          <h5 className="fw-semibold">1. Download the Extension Files</h5>
          <p>
            Obtain the extension's files. If it's in a `.crx` format, you may
            need to extract it into a folder using a tool like 7-Zip or an
            online extract tool.
          </p>
          <img
            src={DownloadExt}
            alt="Download files"
            className="img-fluid rounded shadow-sm"
          />
        </div>
        {/* Step 2 */}
        <div className="mb-4">
          <h5 className="fw-semibold">2. Select the menu icon on Chrome</h5>
          <p>
            Open Chrome and select the three dots menu icon on the top-right
            corner.
          </p>
          <img
            src={SelectMenu}
            alt="Chrome menu icon"
            className="img-fluid rounded shadow-sm"
          />
        </div>
        {/* Step 3 */}
        <div className="mb-4">
          <h5 className="fw-semibold">3. Select Extensions</h5>
          <p>Select the extensions icon from the dropdown list.</p>
          <img
            src={PickExtension}
            alt="Select extensions"
            className="img-fluid rounded shadow-sm"
          />
        </div>
        {/* Step 4 */}
        <div className="mb-4">
          <h5 className="fw-semibold">4. Select manage extensions</h5>
          <p>
            Select the extensions icon button the dropdown list
          </p>
          <img
            src={SelectExt}
            alt="Enable Developer Mode"
            className="img-fluid rounded shadow-sm"
          />
        </div>
        {/* Step 5 */}
        <div className="mb-4">
          <h5 className="fw-semibold">5. Enable Developer Mode</h5>
          <p>
            At the top right, toggle on Developer Mode.
          </p>
          <img
            src={DevOn}
            alt="Enable Developer Mode"
            className="img-fluid rounded shadow-sm"
          />
        </div>
        {/* Step 6 */}
        <div className="mb-4">
          <h5 className="fw-semibold">6. Load the Extension</h5>
          <p>
            Select the extensions icon button the dropdown list
          </p>
          <img
            src={LoadUnpacked}
            alt="Enable Developer Mode"
            className="img-fluid rounded shadow-sm"
          />
        </div>
        {/* Step 7 */}
        <div className="mb-4">
          <h5 className="fw-semibold">7. Select Extension Folder</h5>
          <p>
            Navigate to the folder containing the unpacked extension files and select it
          </p>
          <img
            src={SelectExtension}
            alt="Enable Developer Mode"
            className="img-fluid rounded shadow-sm"
          />
        </div>
        {/* Step 8 */}
        <div className="mb-4">
          <h5 className="fw-semibold">8. Test the Extension</h5>
          <p>
          Use the extension to ensure it’s functioning correctly.
          </p>
          <img
            src={ManageExt}
            alt="Enable Developer Mode"
            className="img-fluid rounded shadow-sm"
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default GuidePopup;
