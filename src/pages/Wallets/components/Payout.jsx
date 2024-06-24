import { useState } from "react";
import { userSelectPoints, userSelectWalletID } from "../../../store/Auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { pointsToDollar } from "../../../utils/functions/functions";
import { requestPayout, walletSelectPayoutStatus } from "../../../store/Wallet";

function Payout() {
  const walletID = useSelector(userSelectWalletID);
  const userPoints = useSelector(userSelectPoints);
  const status = useSelector(walletSelectPayoutStatus);

  const [pointInput, setPointinput] = useState(0);

  const amount = pointsToDollar(pointInput);

  const payoutBtnDisabled =
    userPoints < parseFloat(pointInput) ||
    status === "loading" ||
    pointInput <= 0 ||
    amount < 1; // change later to value based on rate

  const dispatch = useDispatch();

  return (
    <div className="payout">
      <h4 className="payout__header">Payout</h4>
      <hr />
      <div className="payout__row">
        <div className="payout__text">
          You can transfer the commission to your Wallet as USDT.TRC20
          {/* <b className="text-warning d-block" style={{ display: "none" }}>
            ${pointsToDollar(userPoints)} available for payout.
          </b> */}
          Due to transaction fees we recommend a payout of not less than $100.
          To which address would you like to withdraw the funds?
          <b className="text-blue d-block">Your USDT.TRC20 wallet address</b>
        </div>
        <div className="payout__action">
          <div className="payout__amount">
            {/* <h3>${amount}</h3> */}
            <h3>${0}</h3>
            <input
              className="payout__input"
              type="text"
              placeholder="No Wallet ID"
              readOnly
              value={walletID ?? ""}
            />
          </div>
          <div className="payout__submit">
            <input
              className="payout__input"
              type="number"
              placeholder="Amount of points"
              min={1}
              onChange={(e) => {
                setPointinput(e.target.value);
              }}
            />
            <button
              className={`btn payout__btn ${
                payoutBtnDisabled ? "disabled" : ""
              }`}
              onClick={() => {
                if (!payoutBtnDisabled) {
                  dispatch(requestPayout({ amount, points: pointInput }));
                }
              }}
            >
              {pointInput <= 0
                ? "Input valid amount"
                : userPoints < parseFloat(pointInput)
                ? "Insufficient points"
                : amount < 1 // change later to value based on rate
                ? "Low payout amount"
                : status === "loading"
                ? "Sending request..."
                : "Confirm payout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payout;
