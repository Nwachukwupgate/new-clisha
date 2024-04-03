import React from "react";
import moment from "moment";
import { shortenWalletID } from "../../../utils/functions/functions";

const LatestTransactions = ({ currentItems }) => {
  return (
    <div className="latestTransactions">
      <h4 className="latestTransactions__header">Latest Transactions</h4>
      <div className="latestTransactions__row">
        <div className="latestTransactions__column">
          <div className="latestTransactions__column--header">Date</div>
          <div className="latestTransactions__column--body">
            {currentItems.map((transaction, ind) => (
              <span className="latestTransactions__item date" key={ind}>
                {moment(parseInt(transaction.createdAt)).format("DD/MM/YYYY")}
              </span>
            ))}
          </div>
        </div>
        <div className="latestTransactions__column">
          <div className="latestTransactions__column--header">Amount $</div>
          <div className="latestTransactions__column--body">
            {currentItems.map((transaction, ind) => (
              <span className="latestTransactions__item" key={ind}>
                {transaction.amount}
              </span>
            ))}
          </div>
        </div>
        <div className="latestTransactions__column">
          <div className="latestTransactions__column--header">
            Transaction ID
          </div>
          <div className="latestTransactions__column--body">
            {currentItems.map((transaction, ind) => (
              <span className="latestTransactions__item" key={ind}>
                {shortenWalletID(transaction.trx_id)}
              </span>
            ))}
          </div>
        </div>
        <div className="latestTransactions__column">
          <div className="latestTransactions__column--header">Status</div>
          <div className="latestTransactions__column--body">
            {currentItems.map((transaction, ind) => (
              <span
                className={`latestTransactions__item ${
                  transaction.status === 0
                    ? "cancel"
                    : transaction.status === 1
                    ? "pending"
                    : transaction.status === 2
                    ? "approved"
                    : transaction.status === 3
                    ? "success"
                    : transaction.status === 4
                    ? "failed"
                    : ""
                }`}
                // className="latestTransactions__item"
                key={ind}
              >
                {transaction.status === 0
                  ? "cancel"
                  : transaction.status === 1
                  ? "pending"
                  : transaction.status === 2
                  ? "approved"
                  : transaction.status === 3
                  ? "success"
                  : transaction.status === 4
                  ? "failed"
                  : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="latestTransactions__footer"></div>
    </div>
  );
};

export default LatestTransactions;
