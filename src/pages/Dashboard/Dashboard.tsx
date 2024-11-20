import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../components/Alerts/Loading';
import NotificationMessage from '../../components/Messages/NotificationMessage';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/Sidebar';
import { apiCall } from '../../services/apiRequestManager';
import { RootState } from '../../store/store';
import { User } from '../../types';
import CalenderCard from './components/CalenderCard';
import LoadTask from './components/Load_Task';
import Task from './components/Task_Component';
import TimeTraker from './components/TimeTraker';
import TodaysTask from './components/TodaysTask';
import Wallet from './components/Wallet';
import BonusPopup from './components/BonusPopup';


function Dashboard() {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.data);
  const vendoPackage = useSelector((state: RootState) => state.wallet.vendoPackage);
  const userLoading = useSelector((state: RootState) => state.user.loading);
  const task = useSelector((state: RootState) => state.task.data);
  const [isVqsClaimPeriod, setIsVqsClaimPeriod] = useState(false);
  const [isVqsClaimDay, setIsVqsClaimDay] = useState(false);
  const [isTransferVqsLoading, setIsTransferVqsLoading] = useState(false);
  const vendo_api = process.env.REACT_APP_VENDO_API;
  const task_api = process.env.REACT_APP_API_TASK
  const vendoDashboard = process.env.REACT_APP_VENDO_USER_DASHBOARD;
  const [perProfile, setPerProfile] = useState(100); 
  const [showBonusPopup, setShowBonusPopup] = useState(false);
  const verificationDate = user?.user?.email_verified_at
  // console.log("datee", verificationDate)


  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenBonusPopup');
    if (!hasSeenPopup) {
      setShowBonusPopup(true);
      localStorage.setItem('hasSeenBonusPopup', 'true'); // Set flag in localStorage
    }
  }, []);


  const goTask = useCallback(() => {
    navigate('/dashboard/task');
  }, [navigate]);

  const goToVendoUpgrade = useCallback(() => {
    window.open(`${vendoDashboard}/upgrade`, '__blank');
  }, [vendoDashboard]);

  const date = useCallback(() => moment(Date.now()).format('MMMM DD, YYYY'), []);

  const profileCompletePercentage = useCallback(() => {
    let completed = 0;
    const userEntries: (keyof User)[] = [
      'firstname',
      'lastname',
      'gender',
      'birth_date',
      'phone',
      'country',
      'language',
      'region',
      'photo',
    ];
    userEntries.forEach((entry) => {
      if (user?.user[entry]) {
        completed += 1;
      }
    });

    // check is user data has returned
    const userInputs = Object.entries(user?.user);
    if (userInputs.length > 0) {
      // update user completed profile percentage
      setPerProfile(Math.round((completed / 9) * 100));
    }
  }, [user]);

  // const checkIfVQCliamPeriod = useCallback(() => {
  //   const dateArr = new Set();
  //   const nowDate = moment(Date.now()).format('DD-MM-YYYY');
  //   const lastDate = moment().endOf('month').format('DD-MM-YYYY');

  //   for (let x = 0; x <= 3; x += 1) {
  //     const temp = moment().endOf('month').subtract(x, 'd');
  //     dateArr.add(temp.format('DD-MM-YYYY'));
  //   }

  //   if (dateArr.has(nowDate)) {
  //     setIsVqsClaimPeriod(true);
  //     if (lastDate === nowDate) {
  //       setIsVqsClaimDay(true);
  //     }
  //   }
  // }, []);

  const checkIfVQCliamPeriod = useCallback(() => {
    const nowDate = moment(Date.now()).date();
    const claimDays = new Set([1, 2, 3, 4, 5]);
  
    if (claimDays.has(nowDate)) {
      setIsVqsClaimPeriod(true);
      if (nowDate === 5) {
        setIsVqsClaimDay(true);
      }
    }
  }, []);

  // const getUserVQForVendo = useCallback(
  //   (vqs: number, percentage: number) => (vqs * (percentage / 100)).toFixed(1),
  //   []
  // );

  const transferUserVqsToVendo = useCallback(async () => {
    setIsTransferVqsLoading(true);
    try {
      const token = window.localStorage.getItem('token');
      const config = { headers: { Authorization: `bearer ${token}` } };
      const body = {
        clisha_id: user?.user?.clishaId,
        vqs: user?.rank?.bonus_points,
      };

      const res = await apiCall(`${vendo_api}/clisha-addkickback`, 'post', body, config);
      await axios.get(`${task_api}/clear/vqs`, config);
      
      if (res?.status === 200) {
        toast.success(res?.message);
        window.location.reload();
      }
    } catch (err) {
      toast.error((err as Error)?.message);
    } finally {
      setIsTransferVqsLoading(false);
    }
  }, [user, vendo_api, task_api]);

  useEffect(() => {
    profileCompletePercentage();
  }, [profileCompletePercentage]);

  useEffect(() => {
    checkIfVQCliamPeriod();
  }, [checkIfVQCliamPeriod]);

  return (
    <div>
      {userLoading && <Loading />}

      <NotificationMessage />

      <div className="bg-muted body-content ">
        <Header />
        <div className="row m-0 ">
          <div className="col-md-4 col-lg-2 p-0 bg-white m-0">
            <Sidebar />
          </div>
          <div className="col-md-8 col-lg-10 py-3 bg-white scroll-bg p-md-0 p-2 ">
            <div className="container p-0 ">
              <div className="row m-0 ">
                <div className="col-lg-6 mx-auto p-0 p-md-2">
                  <div className="welcome my-4 ">
                    {isVqsClaimPeriod &&
                      vendoPackage?.status === 200 &&
                      user?.user?.vendoConnectStatus &&
                      vendoPackage.data.package_level !== 'No package' && (
                        <div
                          className="alert shadow-sm rounded-x alert-warning alert-dismissible fade show"
                          role="alert"
                        >
                          <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                          </button>
                          <div>
                            <p
                              className="text-dark"
                              style={{ fontWeight: '700', marginBottom: '8px' }}
                            >
                              As a{' '}
                              <b style={{ color: 'red' }}>
                                {vendoPackage?.data?.package_level === 'proplus'
                                  ? 'Pro+'
                                  : vendoPackage?.data?.package_level}
                              </b>{' '}
                              user, you currently have{' '}
                              {/* {getUserVQForVendo(
                                user?.rank?.bonus_points,
                                vendoPackage?.data?.vqRatio
                              )} */}
                              {user?.rank?.bonus_points?.toFixed() ?? 0}{' '}
                              VQs booked in the Vendo system.
                              {isVqsClaimDay 
                                ? ' Claim Now'                               
                                : vendoPackage?.data?.package_level !== 'proplus'
                                ? ' Upgrade your package to get more VQs or Claim Now.'
                                : null}
                            </p>

                            <p
                              className="text-dark"
                              style={{ fontWeight: '700', marginBottom: '8px' }}
                            >
                              {`You've earned ${user?.rank?.bonus_points?.toFixed() ?? 0} VQs, and as a`}
                              <b style={{ color: 'red' }}>
                                {vendoPackage?.data?.package_level === 'proplus'
                                  ? 'Pro+'
                                  : vendoPackage?.data?.package_level}
                              </b>{' '}
                              user, you currently have access to{' '}
                              {/* {getUserVQForVendo(
                                user?.rank?.bonus_points,
                                vendoPackage?.data?.vqRatio
                              )} */}
                              {user?.rank?.bonus_points?.toFixed() ?? 0}{' '}
                              VQs.
                              {isVqsClaimDay
                                ? ' Claim additional VQs now.'
                                : vendoPackage?.data?.package_level !== 'proplus'
                                ? ' Upgrade your package to claim additional VQs.'
                                : null}
                            </p>
                          </div>

                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '1rem',
                            }}
                            className="authBtns"
                          >
                            {vendoPackage?.data?.package_level !== 'proplus' && (
                              <button className="btn btn-primary" onClick={goToVendoUpgrade}>
                                Upgrade
                              </button>
                            )}
                            {isVqsClaimDay &&
                              user?.rank?.bonus_eligibility &&
                            (
                              <button
                                className=" btn btn-primary vendoBtn"
                                onClick={transferUserVqsToVendo}
                              >
                                {isTransferVqsLoading && <i className="fa fa-spinner fa-spin" />}{' '}
                                Claim bonus
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {!user?.rank?.bonus_eligibility &&
                        isVqsClaimDay &&
                        vendoPackage?.status === 200 &&
                        user?.user?.vendoConnectStatus &&
                        vendoPackage.data.package_level !== 'No package' &&
                        (
                          <div
                          className="alert shadow-sm rounded-x alert-warning alert-dismissible fade show"
                          role="alert"
                          >
                            <button
                              type="button"
                              className="close"
                              data-dismiss="alert"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                              <span className="sr-only">Close</span>
                            </button>
                              <div>
                                <p
                                  className="text-dark"
                                  style={{ fontWeight: '700', marginBottom: '8px' }}
                                >
                                  <p>
                                    <svg fill="#e11414" height="25px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 329.328 329.328" xmlSpace="preserve">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                      <g id="SVGRepo_iconCarrier">
                                        <path d="M164.666,0C73.871,0,0.004,73.871,0.004,164.672c0.009,90.792,73.876,164.656,164.662,164.656 c90.793,0,164.658-73.865,164.658-164.658C329.324,73.871,255.459,0,164.666,0z M164.666,30c31.734,0,60.933,11.042,83.975,29.477 L59.478,248.638c-18.431-23.04-29.471-52.237-29.474-83.967C30.004,90.413,90.413,30,164.666,30z M164.666,299.328 c-31.733,0-60.934-11.042-83.977-29.477L269.854,80.691c18.431,23.043,29.471,52.244,29.471,83.979 C299.324,238.921,238.917,299.328,164.666,299.328z"/>
                                      </g>
                                    </svg>  
                                    {' '} VQ Bonus Points Missed
                                  </p>
                                  We noticed you didn’t qualify for the VQ Bonus Points this month. To earn the bonus next month, simply stay active by engaging with tasks for 25 days and complete minimum of 10 task daily. We look forward to seeing you participate!
                                </p>
                              </div>  
                            </div> 
                        )                
                      }
                        

                    {!userLoading && perProfile < 100 && (
                      <div
                        className="alert shadow-sm rounded-x alert-warning alert-dismissible fade show"
                        role="alert"
                      >
                        <button
                          type="button"
                          className="close"
                          data-dismiss="alert"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                          <span className="sr-only">Close</span>
                        </button>
                        {!user?.user?.email_verified_at ? (
                          <Link to="/verify" className="text-dark">
                            <b>Please verify your account here</b>
                          </Link>
                        ) : (
                          <Link to="/dashboard/profile" className="text-dark">
                            <b>Please update your profile here</b>
                          </Link>
                        )}
                        <span className="d-block ">
                          <span>
                            You are
                            <strong className="badge badge-pill badge-warning mx-2">
                              {perProfile}%
                            </strong>
                            done
                          </span>
                        </span>
                      </div>
                    )}
                    <div className="nav-link point d-block d-md-none m-0 p-0 py-3 shadow-m px-2 rounded my-2 bg-light">
                      <small className="d-block text-secondary pb-2">Total Coin</small>
                      <img src="/images/point.png" className="mail mr-2 " alt="" />
                      <span className="text-dark b">{user && user?.rank?.balance} Points</span>
                    </div>
                    <span className="text-muted font-weight-bold  text-capitalize">
                      hello, {user?.user?.username}!
                    </span>
                    <h4 className=" text-capitalize mt-3 text-secondary">
                      You’ve got{' '}
                      {/* {task?.totalItems && task?.totalItems !== 'Undefined'
                        ? task?.totalItems + ' tasks Today'
                        : ' no task yet'} */}
                    </h4>
                  </div>

                  <div className="seacrh_box mb-3  d-none">
                    <i className="fa fa-search text-muted" aria-hidden="true" />
                    <input
                      type="text"
                      placeholder="Search something..."
                      className="form-control shadow-sm "
                    />
                  </div>
                  <div className="d-block d-md-none">
                    <TimeTraker />
                  </div>

                  {/* only task features card */}

                  <div className="my_task_container p-md-2   mt-1">
                    {/* <h2 className="font-weight-bold text-left ">My tasks</h2> */}
                    <Wallet user={user} vendoPackage={vendoPackage} />
                    {/* //top 10 users */}
                    <Task />
                    <LoadTask task={task} />
                  </div>
                </div>
                <div className="col-lg-5  mx-auto mt-3 mt-md-5 p-0">
                  <div className="d-none d-md-block">
                    <TimeTraker />
                  </div>
                  {/* start task component */}

                  <div className="row mx-0 my-3  mt-5 start_task_component">
                    <div className="col-6">
                      {user?.timezone?.time && (
                        <span>
                          {date()} -{' '}
                          {`${user?.timezone?.time} ${
                            parseInt(user?.timezone?.time.split(':')[0], 10) > 12 ? 'pm' : 'am'
                          }`}
                        </span>
                      )}
                      <h4>Today</h4>
                    </div>
                    <div className="col-6 p-0  text-right">
                      <button
                        onClick={goTask}
                        className="btn btn_task  px-md-5 px-4 shadow py-md-3"
                      >
                        Start tasks
                      </button>
                    </div>
                  </div>
                  <CalenderCard verificationDate={verificationDate} />
                  <TodaysTask user={user} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBonusPopup && (
        <BonusPopup onClose={() => setShowBonusPopup(false)} user={user} vendoPackage={vendoPackage} />
      )}
    </div>
  );
}

export default Dashboard;
