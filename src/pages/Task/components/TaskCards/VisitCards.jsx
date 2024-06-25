const banner = (type) => {
  switch (type) {
    case 'google_search':
      return 'Google';
    case 'website_click':
      return 'Website';
    case 'journey':
      return 'Journey';
    case 'search_journey':
      return 'Search';
    default:
      return 'Task';
  }
};

function VisitCards({ item, loadLink, extCode }) {
  return (
    <div className="row m-0 header py-1">
      <div
        className="col-5"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {/* <img src="/images/Task/task2/task.png" alt="" /> */}
        <svg
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.71441 14.3887L8.23442 12.9087L7.42871 13.7144L9.71441 16.0001L14.2858 11.4288L13.4801 10.623L9.71441 14.3887Z"
            fill={item?.token?.foreground ?? 'black'}
          />
          <path
            d="M11.4285 1.71427H9.7142V1.14285C9.7133 0.840024 9.5926 0.549861 9.37847 0.335731C9.16434 0.121602 8.87418 0.000904408 8.57135 0H3.99997C3.69714 0.000904408 3.40698 0.121602 3.19285 0.335731C2.97872 0.549861 2.85802 0.840024 2.85712 1.14285V1.71427H1.14285C0.840024 1.71518 0.549861 1.83587 0.335731 2.05C0.121602 2.26413 0.000904408 2.55429 0 2.85712V14.857C0.000904408 15.1598 0.121602 15.45 0.335731 15.6641C0.549861 15.8783 0.840024 15.999 1.14285 15.9999H6.28566V14.857H1.14285V2.85712H2.85712V4.57139H9.7142V2.85712H11.4285V9.14278H12.5713V2.85712C12.5704 2.55429 12.4497 2.26413 12.2356 2.05C12.0215 1.83587 11.7313 1.71518 11.4285 1.71427ZM8.57135 3.42854H3.99997V1.14285H8.57135V3.42854Z"
            fill={item?.token?.card_colors?.accent_color ?? '#28a745'}
          />
        </svg>

        <small className="text-capitalize ml-1 badge badge-danger shadow ">
          {banner(item.task_type)}
        </small>
        {/* <strong
          className="ml-1"
          style={{
            color: item?.token?.card_colors?.accent_color ?? "black",
          }}
        >
          Task
        </strong> */}
      </div>
      <div className="col-7 text-right">
        <button
          className="btn btn-sm  btn-success"
          onClick={(e) => {
            loadLink(item, extCode);
          }}
          data-toggle={item.type !== 'website_click' ? 'modal' : ''}
          data-target={`#${item.task_type + item.id}`}
          style={{
            backgroundColor: item?.token?.card_colors?.accent_color,
            border: item?.token?.card_colors?.accent_color,
          }}
        >
          <img src="/images/Task/pointer.png" className="link visitImg " alt="" />
          Visit Website
        </button>
      </div>
    </div>
  );
}

export default VisitCards;
