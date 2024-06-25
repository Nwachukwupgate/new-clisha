import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/Sidebar';
import Welcome from '../../components/Welcome/Welcome';
import 'react-calendar/dist/Calendar.css';
import GeneralTask from './components/DefaultTask/GeneralTask';
import TaskCard from './components/WebsiteTask/TaskCard';
import TaskCard2 from './components/GoogleTask/TaskCard2';
import TaskCard3 from './components/JourneyTask/TaskCard3';
import TaskCard4 from './components/SearchJourneyTask/TaskCard4';
import Loading from '../../components/Alerts/Loading';
import {
  getTask,
  getTaskGoogle,
  getTaskJourney,
  getTaskSearchJourney,
  getTaskWebsite,
} from '../../store/Task';

function Task() {
  const task = useSelector((state) => state.task.data);
  const website_click = useSelector((state) => state.task.website_click);
  const google_search = useSelector((state) => state.task.google_search);
  const journey = useSelector((state) => state.task.journey);
  const search_journey = useSelector((state) => state.task.search_journey);
  const getTaskLoading = useSelector((state) => state.task.getTaskLoading);
  const getTaskWebsiteLoading = useSelector((state) => state.task.getTaskWebsiteLoading);
  const getTaskGoogleLoading = useSelector((state) => state.task.getTaskGoogleLoading);
  const getTaskJourneyLoading = useSelector((state) => state.task.getTaskJourneyLoading);
  const getTaskSearchJourneyLoading = useSelector(
    (state) => state.task.getTaskSearchJourneyLoading
  );

  const dispatch = useDispatch();

  const init = useCallback(() => {
    dispatch(getTask({ page: 1 }));
    dispatch(getTaskWebsite({ page: 1 }));
    dispatch(getTaskGoogle({ page: 1 }));
    dispatch(getTaskJourney({ page: 1 }));
    dispatch(getTaskSearchJourney({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div className="body-content">
      {(getTaskLoading ||
        getTaskWebsiteLoading ||
        getTaskGoogleLoading ||
        getTaskJourneyLoading ||
        getTaskSearchJourneyLoading) && <Loading />}

      <div className="bg-muted ">
        <Header />
        <div className="row m-0 ">
          <div className="col-md-4 col-lg-2 p-0 bg-white m-0">
            <Sidebar />
          </div>
          <div className="col-md-8 col-lg-10 py-3 scroll-bg bg-white p-0 p-md-3">
            <div className="container">
              <Welcome welcome="Your Tasks" />
              <nav>
                <div
                  className="nav nav-tabs justify-content-center my_task_nav"
                  id="nav-tab"
                  role="tablist"
                >
                  <a
                    className="nav-link active text-blue"
                    id="nav-home-tab"
                    data-toggle="tab"
                    href="#nav-home"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    <span className="  d-none d-md-block">All Task</span>
                    <i className="fa fa-tags  d-md-none" aria-hidden="true" />
                  </a>
                  <a
                    className="nav-link text-blue"
                    id="nav-profile-tab"
                    data-toggle="tab"
                    href="#nav-profile"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    <span className="  d-none d-md-block">Website Task</span>
                    <i className="fa fa-globe  d-md-none" aria-hidden="true" />
                  </a>
                  <a
                    className="nav-link text-blue"
                    id="nav-contact-tab"
                    data-toggle="tab"
                    href="#nav-contact"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false"
                  >
                    <span className="d-none d-md-block">Google Task</span>
                    <i className="fa fa-search  d-md-none " aria-hidden="true" />
                  </a>
                  <a
                    className="nav-link text-blue"
                    id="nav-journey-tab"
                    data-toggle="tab"
                    href="#nav-journey"
                    role="tab"
                    aria-controls="nav-journey"
                    aria-selected="false"
                  >
                    <span className="  d-none d-md-block">Journey Task</span>
                    <i className="fa fa-search fa-rocket  d-md-none " aria-hidden="true" />
                  </a>
                  <a
                    className="nav-link text-blue"
                    id="nav-search-journey-tab"
                    data-toggle="tab"
                    href="#nav-search-journey"
                    role="tab"
                    aria-controls="nav-search-journey"
                    aria-selected="false"
                  >
                    <span className="d-none d-md-block">Search Journey</span>
                    <i className="fas fa-vr-cardboard d-md-none" />
                  </a>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active py-3"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <GeneralTask task={task} />
                </div>
                <div
                  className="tab-pane fade py-3"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <TaskCard task={website_click} />
                </div>
                <div
                  className="tab-pane fade py-3"
                  id="nav-contact"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab"
                >
                  <TaskCard2 task={google_search} />
                </div>
                <div
                  className="tab-pane fade py-3"
                  id="nav-journey"
                  role="tabpanel"
                  aria-labelledby="nav-journey-tab"
                >
                  <TaskCard3 task={journey} />
                </div>
                <div
                  className="tab-pane fade py-3"
                  id="nav-search-journey"
                  role="tabpanel"
                  aria-labelledby="nav-search-journey-tab"
                >
                  <TaskCard4 task={search_journey} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
