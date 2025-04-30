import { useEffect, useState } from 'react';
import { useReward } from 'react-rewards';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { taskReported } from '../../store/Task';
import Loading from '../Alerts/Loading';

export default function ReportApp() {
  const taskReportLoading = useSelector((state) => state.task.taskReportLoading);
  const reportedData = useSelector((state) => state.task.reportedData);

  const { reward } = useReward('rewardId', 'confetti');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [report, setReport] = useState(null);
//   const [, setBalance] = useState(0);

//   const query = new URLSearchParams(window.location.search);
//   const _task = query.get('t');
//   const _isFailed = query.get('status');
//   const _point = query.get('p');
//   const _bonus = query.get('b');

  const handleRedrect = () => {
    window.location.href = '/dashboard/task';
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const _task = query.get('t');
    const _reason = query.get('r');
    if (_task) {
      const task = {
        taskId: _task,
        reason: _reason,
      };
      dispatch(taskReported(task));
    //   reward();
    }
    // } else {
    //   navigate('/dashboard/task');
    // }
  }, [dispatch, navigate, reward]);

  useEffect(() => {
    if (reportedData) {
      console.log('Reported Data:', reportedData);
      setReport(reportedData?.status);
    }
  }, [reportedData]);


  return (
    <>
        {taskReportLoading 
            ?
             <Loading />
            :
            <div>
                <div className="confetti text-center">
                    <h5>{report ? 'Task Reported Successfully' : 'oppss you have reported this task already'}  </h5>
                    <span id="rewardId" />
                    <img src="/images/mail.png" alt="money" />
                    <div className="text-center pt-3">
                        <button className="btn claim_coin shadow" onClick={handleRedrect}>
                            Earn More Points
                        </button>
                    </div>
                </div>  

                        
            </div>
        }
    </>   
  );
}
