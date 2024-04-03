import React from "react";
import CommingSoon from "../../components/CommingSoon";
import Header from "../../layouts/Header";
import Sidebar from "../../layouts/Sidebar";
import AddWallets from "./components/AddWallets";
import AvailableBallance from "./components/AvailableBallance";
import Payout from "./components/Payout";
import LatestTransactions from "./components/LatestTransactions";
import PaginatedItems from "./components/PaginatedItems";
// import transactions from "../../json/transaction.json";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWalletTransactions,
  walletSelectTransactions,
} from "../../store/Wallet";

function Wallets() {
  // const { data } = transactions;

  const {
    transactions: data,
    // currentPage,
    // totalItems,
    totalPages,
  } = useSelector(walletSelectTransactions);

  const dispatch = useDispatch();

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    dispatch(fetchWalletTransactions({ page: event.selected + 1 }));
  };

  return (
    <div className="body-content">
      <CommingSoon />
      <div className="bg-muted ">
        <Header />
        <div className="row m-0 ">
          <div className="col-md-4 col-lg-2 p-0 bg-white m-0">
            <Sidebar />
          </div>
          <div className="col-md-8 col-lg-10 py-3 scroll-bg bg-white p-0">
            <div className="container text-center p-0 p-md-3 pt-4">
              {/* Available balance */}
              <div className="row m-0">
                <div className="col-md-6 mt-3">
                  <AvailableBallance />
                </div>
                <div className="col-md-6 mt-3">
                  <AddWallets />
                </div>
                <div className="col-12">
                  <Payout />
                </div>
                <div className="col-12">
                  <LatestTransactions currentItems={data} />
                </div>
                {data.length > 0 && (
                  <div className="col-12">
                    <PaginatedItems
                      handlePageClick={handlePageClick}
                      pageCount={totalPages}
                      currentItems={data}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
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

export default Wallets;
