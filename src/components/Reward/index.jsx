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

  const { reward } = useReward('rewardId', 'confetti');
  const navigate = useNavigate();
  const sound = new Audio();
  const dispatch = useDispatch();
  const [balance, setBalance] = useState(0);
  const [isBonus, setIsBonus] = useState(false);
  // const user = useSelector((state) => state.user.data);

  const query = new URLSearchParams(window.location.search);
  const _task = query.get('t');
  const _isFailed = query.get('status');
  const _point = query.get('p');
  const _bonus = query.get('b');

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
  const handleRedrect = () => {
    window.location.href = '/dashboard/task';
  };

  useEffect(() => {
    reward();
  }, [reward]);

  return (
    <div>
      {_isFailed !== 'failed' ? (
        <div className="confetti text-center ">
          {!isBonus && <h5>💲 Task Completed 💰</h5>}
          {isBonus && <h5> 💲 Congratulations you have Successfully earned 👇</h5>}
          <span
            id="rewardId"
            type="emoji"
            // config={{
            //   lifetime: 200,
            //   angle: 3000,
            //   spread: 2000,
            //   elementCount: 100,
            //   emoji: ["💲", "🤑", "💷", "💱", "💸", "💶", "💵", "💰"],
            //   colors: ["#000000", "#F25555", "#55D8F2", "#499DF2", "#F2CB30"],
            // }}
          />
          <img src="/images/money-bag_1f4b0.png" alt="money" />
          {isBonus && (
            <span>
              <h3 className="text-white mt-3">
                <CountUp start={0} end={balance} duration={1} /> PTS
              </h3>
              <h6 className="text-white">{_bonus} Vqalis Bonus</h6>
              {(!user?.user?.vendoConnectStatus ||
                vendoPackage?.data?.package_level === 'No package') && (
                <h6 className="text-white">(Connect your Vendo account to receive VQ Points)</h6>
              )}
            </span>
          )}

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
        <div className="confetti text-center ">
          {!isBonus && <h5>Task Failed</h5>}

          <img src="/images/error.png" alt="money" className="failed" />

          <p className="text-white mt-3">
            You Earn <CountUp start={0} end={0} duration={1} /> PTS
          </p>
          <h6 className="text-white">
            You have earned Vqalis Bonus (Available to connected Vendo accounts only!)
          </h6>
          <div className="text-center pt-3">
            <button className="btn claim_coin shadow" onClick={handleFailed}>
              Go back
            </button>
          </div>
        </div>
      )}
      {completeTaskLoading && <Loading />}
    </div>
  );
}
