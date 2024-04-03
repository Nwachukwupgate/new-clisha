import React from "react";
import { useState } from "react";

function AvailableBallance({ item }) {
  const [value, setValue] = useState(false);
  const setViews = () => {
    setValue(!value);
    window.localStorage.setItem(value);
  };
  return (
    <div className="AvailableBallance">
      <span className="av-balance">Available Balance</span>
      <h1>
        {!value ? "$ 0.00" : "*****"}{" "}
        <button className="btn btn-sm toggleFunds " onClick={() => setViews()}>
          <i className={`fas fa-${!value ? "eye" : "eye-slash"}`}></i>
        </button>
      </h1>

      <div className="col-md-8 p-0 detailedInfor-card">
        <hr />

        <div className="row p-0">
          <div className="col-6 p-0">
            <span className="label">Earned</span>
            <span className="earn">$0.00</span>
          </div>
          <div className="col-6 p-0">
            <span className="label">Widthdraw </span>
            <span className="earn">$0.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvailableBallance;
