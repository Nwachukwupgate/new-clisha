import axios from "axios";
import moment from "moment/moment";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Bonus() {
  const sound = new Audio();
  const [accepted, setAccepted] = useState(false);
  let token = window.localStorage.getItem("token");
  const config = { headers: { Authorization: `bearer ${token}` } };
  const api = process.env.REACT_APP_API;
  const user = useSelector((state) => state.user.data);
  const task = useSelector((state) => state.task.data);
  const data = user?.user;
  const claimBonus = async () => {
    setAccepted(!accepted);
    await axios
      .post(
        `${api}/contact`,
        {
          email: user?.user?.email,
          subject: "Congratulations, Your Bonus from Vendo!",
          message: `${user?.user?.email} Deserve a Congratulations gift from Vendo, End of the year package`,
        },
        config
      )
      .then((result) => {
        toast.success(
          "Message sent successfully!, We will respond within 24hours"
        );
        window.localStorage.setItem("bClaimed", false);
        sound.src = "/audio/success.mp3";
        sound.play();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        toast.error("Message was not sent");
      });
  };
  console.log(task?.tasks?.length);
  useEffect(() => {
    const bClaimed = window.localStorage.getItem("bClaimed");
    const today = moment(Date.now()).format("DD/MM/YYYY");
    if (today === "31/12/2022" && !bClaimed && !task?.tasks?.length) {
      window.onload = () => {
        document.querySelector('[data-target="#bonusModal"]').click();
      };
    }
  }, []);
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary btn-lg d-none"
        data-toggle="modal"
        data-target="#bonusModal"
      >
        Launch
      </button>
      <div
        className="modal fade"
        id="bonusModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body p-0">
              {accepted && (
                <div className="bonus">
                  <img src="/images/congrat.png" className="w-100" alt="" />
                </div>
              )}
              {!accepted && (
                <form action="" className="getBonus ">
                  <h1>Congratulations</h1>
                  <h3> here is your gift from Vendo</h3>

                  <div className="inputPot ">
                    <label htmlFor="name">Name</label>
                    <input type="text" readOnly value={data?.firstname} />
                  </div>
                  <div className="inputPot">
                    <label htmlFor="name">SURENAME</label>
                    <input type="text" readOnly value={data?.lastname} />
                  </div>
                  <div className="inputPot">
                    <label htmlFor="name">EMAIL</label>
                    <input
                      type="text"
                      readOnly
                      name="email"
                      value={data?.email}
                    />
                  </div>

                  <div className="btnPot">
                    <button
                      className="btn"
                      type="button"
                      onClick={() => claimBonus()}
                    >
                      Claim Now
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bonus;
