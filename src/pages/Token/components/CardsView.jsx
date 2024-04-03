import React from "react";
import { useSelector } from "react-redux";
import AllToken from "./AllToken";
import EarnToken from "./EarnToken";
import VqualisToken from "./VqualisToken";

function CardsView() {
  const earnedToken = useSelector((state) => state.token?.earnedToken);
  const allToken = useSelector((state) => state.token?.allToken?.tokens);
  const bonusToken = useSelector((state) => state.token?.bonus);
  // console.log(bonusToken);
  return (
    <div>
      {/* Earn Token */}
      <EarnToken earnedToken={earnedToken}/>

      {/* All Token */}
      <AllToken allToken={allToken}/>

      {/* Vqualis Token */}
      <VqualisToken bonusToken={bonusToken}/>
     
    </div>
  );
}

export default CardsView;
