import { useDispatch, useSelector } from 'react-redux';
import {
  updateWalletAddress,
  updateWalletInput,
  walletSelectAddStatus,
  walletSelectWalletInput,
} from '../../../store/Wallet';

function AddWallets() {
  const dispatch = useDispatch();
  const status = useSelector(walletSelectAddStatus);
  const walletInput = useSelector(walletSelectWalletInput);

  const walletBtnDisabled = status === 'loading' || !walletInput;

  return (
    <div className="AddWallets ml-auto addWallets">
      <span>Payout wallet address</span>
      <p>Please select your preferred withdrawal method </p>

      <div className="row">
        <div className="col-md-4 mt-3">
          <button
            className={`btn addWallets__btn ${walletBtnDisabled ? 'disabled' : ''}`}
            onClick={() => {
              if (!walletBtnDisabled) {
                dispatch(updateWalletAddress(walletInput));
              }
            }}
          >
            {status === 'loading' ? ' Adding...' : ` Add Wallet`}
          </button>
        </div>
        <div className="col-md-8 mt-3">
          <input
            type="text"
            placeholder="Wallet ID"
            className="form-control"
            value={walletInput}
            onChange={(e) => {
              dispatch(updateWalletInput(e.target.value));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AddWallets;
