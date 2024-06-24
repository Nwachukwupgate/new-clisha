import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeNotify } from '../../store/General';
import { AppDispatch, RootState } from '../../store/store';
import { MessageType } from '../../types';

function NotificationMessage() {
  const message = useSelector((state: RootState) => state.general.message);
  const user = useSelector((state: RootState) => state.user.data?.user);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const toggleModal = (status: string) => {
    if (status === 'close' && modalRef.current) {
      modalRef.current.style.display = 'none';
      if (message?.id) {
        dispatch(closeNotify(message.id));
      }
    }
  };

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.style.display = 'block';
    }
  };

  useEffect(() => {
    if (message) openModal();
  }, [message]);

  const showMessage = (lang: string, msg: MessageType) => {
    let text;
    if (lang === 'English') {
      text = msg?.message_english;
    } else if (lang === 'Deutsch') {
      text = msg?.message_deutsch;
    } else if (lang === 'French') {
      text = msg?.message_french;
    } else if (lang === 'Portuguese') {
      text = msg?.message_portuguese;
    } else {
      text = msg?.message_english;
    }
    return text;
  };

  return (
    <div
      ref={modalRef}
      className="modal fade "
      id="dailyMessage"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div className="modal-dialog NotificationMessage" role="document">
        <div className="modal-content bg-transparent">
          <div className=" border-0 text-center">
            <img src="/images/clishalogo2.png" className="imgBox" alt="" />
            <button className="btn-close " onClick={() => toggleModal('close')}>
              <img src="/images/closeBtn.png" alt="" />
            </button>
          </div>
          <div className="modal-body border-0">
            <h2>ATTENTION !!!</h2>

            {message && (
              <p className="modal-info text-center">{showMessage(user?.language, message)}</p>
            )}
            {/* <p>{message.message_english}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationMessage;
