import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../layouts/Header';
import MessageBox from './components/MessageBox';
import Loading from '../../components/Alerts/Loading';

function Notification() {
  const notification = useSelector((state) => state.general.notification);
  const navigate = useNavigate();
  return (
    <div>
      {!notification && <Loading />}
      <Header />
      <div className="notification_messages container">
        <h4 onClick={() => navigate(-1)}>
          <img src="/images/navlink.png" alt="earn money online, paid to click, social media rewards clisha" /> <span className="ml-2">Messages</span>
        </h4>

        {notification?.length > 0 ? (
          <div className="messages_container col-lg-8 col-md-8 m-auto">
            {notification && notification?.map((item, key) => <MessageBox key={key} item={item} />)}
          </div>
        ) : (
          <div className="row">
            <img src="/images/no_message.webp" alt="earn money online, paid to click, social media rewards clisha" className="  col-md-8 m-auto no_message" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Notification;
