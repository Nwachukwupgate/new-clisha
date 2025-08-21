import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Sidebar from '../../layouts/Sidebar';
import Header from '../../layouts/Header';
import SidebarTour from '../../layouts/SidebarTour';
import Loading from '../../components/Alerts/Loading';
import GuidePopup from '../Dashboard/components/GuidePopup';

function Help() {
  const api = process.env.REACT_APP_API;
  const token = window.localStorage.getItem('token');
  const user = useSelector((state) => state.user.data);

  const config = { headers: { Authorization: `bearer ${token}` } };
  const [userDetails, setUserDetails] = useState();
  const [loading, setIsLoading] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  
  const extensionDownloadLink = '/clishaextension20250821.zip';

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(
        `${api}/contact`,
        {
          ...userDetails,
          email: user?.user?.email,
        },
        config
      )
      .then((result) => {
        setIsLoading(false);
        toast.success('Message sent successfully!, We will respond within 24hours');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        toast.error('Message was not sent');
        setIsLoading(false);
      });
  };

  const handleExtensionDownload = () => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = extensionDownloadLink;
    link.download = 'clishaMe-Extension.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    toast.success('Extension downloaded successfully!');
    
    // Open the guide modal after a short delay
    setTimeout(() => {
      setShowGuideModal(true);
    }, 1000);
  };

  return (
    <div className="body-content">
      {loading && <Loading />}

      <div className="bg-muted">
        <Header />
        <div className="row m-0">
          <div className="col-md-4 col-lg-2 p-0 bg-white m-0">
            <Sidebar />
            <SidebarTour />
          </div>
          <div className="col-md-8 col-lg-10 py-3 scroll-bg bg-white p-0">
            <div className="container text-center p-0 p-md-3 pt-4">
              <form className="changepassword col-md-6 shadow" onSubmit={handleSubmit}>
                <h6>Contact Us</h6>
                <input
                  type="text"
                  placeholder="Subject"
                  className="form-control"
                  onChange={(e) => setUserDetails({ ...userDetails, subject: e.target.value })}
                />
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Write here..."
                  className="form-control mb-3"
                  onChange={(e) => setUserDetails({ ...userDetails, message: e.target.value })}
                />
                <button className="btn btn-primary">
                  Post <i className="fa fa-paper-plane" aria-hidden="true" />
                </button>
              </form>

              {/* Extension Download Section */}
              <div className="extension-download-section mx-auto col-md-8 mt-5">
                <div className="card border-0 rounded-4 overflow-hidden">
                  <div className="card-body p-3">
                    <div className="row align-items-center">
                      <div className=" text-start">                     
                        <button 
                          className="btn btn-primary btn-blue btn-sm rounded-pill px-4 py-3 shadow-sm"
                          onClick={handleExtensionDownload}
                          style={{
                            // background: '#0e223b',
                            border: 'none',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseOver={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            
                          }}
                          onMouseOut={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            // e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                          }}
                        >
                          <i className="fas fa-download me-2" />
                          Download Extension
                        </button>
                      </div>
                    </div>

                    <div className="installation-note mt-2 p-3 bg-light rounded-3">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-info-circle text-info me-2" />
                        <small className="text-muted">
                          <strong>Note:</strong> After downloading, a detailed installation guide will appear to help you set up the extension manually.
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Modal */}
      <GuidePopup 
        show={showGuideModal} 
        onClose={() => setShowGuideModal(false)} 
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Help;