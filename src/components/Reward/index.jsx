import { useEffect, useState } from 'react';
import { useReward } from 'react-rewards';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CountUp from 'react-countup';
import { taskCompleted } from '../../store/Task';
import Loading from '../Alerts/Loading';

export default function RewardApp() {
  const user = useSelector((state) => state.user.data);
  const completeTaskLoading = useSelector((state) => state.task.completeTaskLoading);
  const vendoPackage = useSelector((state) => state.wallet.vendoPackage);
  const packageStatus = useSelector((state) => state.wallet.packageStatus);
  const vendoConnectStatus = user?.user?.vendoConnectStatus

  // console.log("vendoConnectStatus", vendoPackage);

  const vendoBonus = vendoPackage && vendoPackage?.data?.package_level

  const vqPoints = vendoBonus === 'basic' ? 10 :
                   vendoBonus === 'plus' ? 20 :
                   vendoBonus === 'pro' ? 40 :
                   vendoBonus === 'proplus' ? 100 : 0;
  
  // console.log("vqPoints", vqPoints)

  const { reward } = useReward('rewardId', 'confetti');
  const navigate = useNavigate();
  const sound = new Audio();
  const dispatch = useDispatch();
  const [, setBalance] = useState(0);
  const [isBonus, setIsBonus] = useState(false);
  // const user = useSelector((state) => state.user.data);


  const query = new URLSearchParams(window.location.search);
  const _task = query.get('t');
  const _isFailed = query.get('status');
  const _point = query.get('p');
  const _bonus = query.get('b');

  const handleRedrect = () => {
    window.location.href = '/dashboard/task';
  };

  const handleLoad = () => {
    sound.src = '/audio/success.mp3';
    sound.play();
    const task = {
      task: _task,
      status: 1,
    };
    setBalance(_point);
    dispatch(taskCompleted(task));
    reward();
    setIsBonus(true);
    // handleRedrect()
  };
  const handleFailed = () => {
    const task = {
      task: _task,
      status: _isFailed === 'failed' ? 0 : 1,
    };
    setBalance(_point);
    dispatch(taskCompleted(task));
    reward();
    navigate('/dashboard/task');
  };
  

  useEffect(() => {
    reward();
  }, [reward]);

  if (packageStatus === 'loading') {
    return <Loading />;
  }

  return (
    <div>
      {_isFailed !== 'failed' ? (
        <div className="confetti text-center">
          <h5>{!vendoConnectStatus ? "💲 Task Completed 💰" : " 💲 Congratulations on Earning 👇"}</h5>
          <span id="rewardId" />
          <img src="/images/money-bag_1f4b0.png" alt="social media rewards clisha" />
          {vendoConnectStatus ? (
            <>
              <h3 className="text-white mt-3">
                <CountUp start={0} end={_point} duration={1} /> Points
              </h3>
              <h6 className="text-white">{(_bonus === '0' || _bonus == null) ? vqPoints : _bonus} Clishacoins</h6>
            </>
          ) 
        : (
            <span>
                <h3 className="text-white mt-3">
                  <CountUp start={0} end={_point} duration={1} /> Points
                </h3>
                {(!user?.user?.vendoConnectStatus ||
                  vendoPackage?.data?.package_level === 'No package') && (
                  <h6 className="text-white">(Connect your Vendo account to receive Clishacoins)</h6>
                )}
              </span>
          )
        }
          <div className="text-center pt-3">
            {!isBonus ? (
              <button className="btn claim_coin shadow" onClick={handleLoad}>
                Claim Bonus
              </button>
            ) : (
              <button className="btn claim_coin shadow" onClick={handleRedrect}>
                Earn More Points
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="confetti text-center">
          <h5>Task Failed</h5>
          <img src="/images/error.png" alt="error" className="failed" />
          <p className="text-white mt-3">
            You Earn <CountUp start={0} end={0} duration={1} /> POINTS
          </p>
          <h6 className="text-white">
            No Clishacoins (Connect Vendo for Bonus!)
          </h6>
          <button className="btn claim_coin shadow" onClick={handleFailed}>
            Go Back
          </button>
        </div>
      )}
      {completeTaskLoading && <Loading />}
    </div>
  );
}


// {isBonus && (
//   <span>
//     <h3 className="text-white mt-3">
//       <CountUp start={0} end={_point} duration={1} /> PTS
//     </h3>
//     <h6 className="text-white">{_bonus} VQ Points</h6>
//     {(!user?.user?.vendoConnectStatus ||
//       vendoPackage?.data?.package_level === 'No package') && (
//       <h6 className="text-white">(Connect your Vendo account to receive VQ Points)</h6>
//     )}
//   </span>
// )}