import React, { useEffect, useState } from "react";
import { useReward } from "react-rewards";
/*eslint-disable */
function AnimateExperience() {
  const { reward } = useReward("rewardId", "confetti");
  const [isnewUpdate] = useState(true);
  const sound = new Audio();

  const setisnewUpdateFunc = () => {
    // setisnewUpdate(false)
    // if (isnewUpdate) {
    sound.src = "/audio/success.mp3";
    console.log(sound);
    sound.play();
    // vaudio.oncanplaythrough = (event) => {
    //     var playedPromise = audio.play();
    //     if (playedPromise) {
    //         playedPromise.catch((e) => {
    //             console.log(e)
    //             if (e.name === 'NotAllowedError' || e.name === 'NotSupportedError') {
    //                 console.log(e.name);
    //             }
    //         }).then(() => {
    //             console.log("playing sound !!!");
    //         });
    //     }
    // }
    // }
  };
  useEffect(() => {
    reward();
    setisnewUpdateFunc();
  }, []);

  if (isnewUpdate)
    return (
      <div className="AnimateExperience">
        <div className="confetti text-center " data-aos="zoom-in">
          <h5 data-aos="fade-right">Welcome To Bronze Rank</h5>
          <span
            id="rewardId"
            type="emoji"
            config={{
              lifetime: 200,
              angle: 3000,
              spread: 3000,
              elementCount: 100,
              emoji: ["💲", "🤑", "💷", "💱", "💸", "💶", "💵", "💰"],
              colors: ["#000000", "#F25555", "#55D8F2", "#499DF2", "#F2CB30"],
            }}
          />
          <img
            src="/images/rank/silver.png"
            alt="money"
            data-aos="zoom-out-down"
            data-aos-duration="1000"
          />

          <div className="text-center pt-3">
            <button
              className="btn claim_coin shadow"
              data-aos="fade-left"
              onClick={() => setisnewUpdateFunc()}
            >
              Earn More Experience Point
            </button>
          </div>
        </div>
      </div>
    );
}

export default AnimateExperience;
