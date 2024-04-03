import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeNotify } from "../../store/General";

/*eslint-disable*/

function NotificationMessage({ item }) {
  const message = useSelector((state) => state.general.message);
  const user = useSelector((state) => state.user.data?.user);

  const dispatch = useDispatch();
  const toggleModal = (status) => {
    if (status === "close") {
      $("#dailyMessage").modal("hide");
      dispatch(closeNotify(message?.id));
    }
  };
  const OpenToggle = () => {
    $("#dailyMessage").modal("show");
  };
  useEffect(() => {
    if (message) OpenToggle();
  }, [message]);

  const showMessage = (lang, msg) => {
    let text;
    if (lang === "English") {
      text = msg?.message_english;
    } else if (lang === "Deutsch") {
      text = msg?.message_deutsch;
    } else if (lang === "French") {
      text = msg?.message_french;
    } else if (lang === "Portuguese") {
      text = msg?.message_portuguese;
    } else {
      text = msg?.message_english;
    }
    return text;
  };

  return (
    <div
      className="modal fade "
      id="dailyMessage"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div className="modal-dialog NotificationMessage" role="document">
        <div className="modal-content bg-transparent">
          <div className=" border-0 text-center">
            <img src="/images/clishalogo2.png" className="imgBox" alt="" />
            <button className="btn-close " onClick={() => toggleModal("close")}>
              <img src="/images/closeBtn.png" alt="" />
            </button>
          </div>
          <div className="modal-body border-0">
            <h2>ATTENTION !!!</h2>

            <p className="modal-info text-center">
              {showMessage(user?.language, message)}
            </p>
            {/* <p>{message.message_english}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationMessage;
