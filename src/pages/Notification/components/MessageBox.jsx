import moment from 'moment';

function MessageBox({ item }) {
  return (
    <div className="messageBox-inbox ">
      <img src="/logo.png" alt="" />
      <p>{item?.banner?.message_english ?? item?.message}</p>
      <div className="time">
        <span>{moment(item.createdAt).format('DD/MM/YYYY')}</span>
      </div>
    </div>
  );
}

export default MessageBox;
