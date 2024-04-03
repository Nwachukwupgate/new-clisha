import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../store/Auth/auth";
import { getAllToken, getBonusToken, getEarnedToken } from "../store/Token";
import {
  getCalenderTask,
  getExperience,
  getMessage,
  getNotification,
  getTeams,
  getTopToken,
  getTopUsers,
} from "../store/General";
import { getRank } from "../store/Rank";
import { refreshToken } from "../store/Auth/refreshToken";
import "aos/dist/aos.css";
import {
  fetchVendoPackageInfo,
  fetchWalletTransactions,
} from "../store/Wallet";

function Loader() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(getEarnedToken());
    dispatch(getAllToken());
    dispatch(getBonusToken());
    dispatch(getCalenderTask({ userId: 5 }));
    dispatch(getExperience());
    dispatch(getRank(1));
    dispatch(fetchWalletTransactions({ page: 1 }));
    dispatch(fetchVendoPackageInfo());
    dispatch(getTopUsers());
    dispatch(getTopToken());
    dispatch(getTeams());
    dispatch(getMessage());
    dispatch(getNotification());
    refreshToken();
  }, [dispatch]);
}

export default Loader;
