import { useSelector } from 'react-redux';

function TaskFooter({ item }) {
  // let timeDiff = ;
  // let time = moment.duration(timeDiff);
  // console.log(moment(item.end_at).endOf('day').fromNow())
  const user = useSelector((state) => state.user.data);

  return (
    <>
      {/* last section1 task */}
      <div
        className="row m-0 header py-3 text-bold f-"
        style={{ color: item?.token?.foreground ?? '#fff' }}
      >
        <div className="col-7">
          {/* <img src="/images/Task/task2/Group 771.png" className="mr-2" alt="" /> */}
          <svg
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M5.5102 2.7551C5.5102 4.2767 4.2767 5.5102 2.7551 5.5102C1.2335 5.5102 0 4.2767 0 2.7551C0 1.2335 1.2335 0 2.7551 0C4.2767 0 5.5102 1.2335 5.5102 2.7551ZM0.638058 2.7551C0.638058 3.92431 1.58589 4.87215 2.7551 4.87215C3.92431 4.87215 4.87215 3.92431 4.87215 2.7551C4.87215 1.58589 3.92431 0.638058 2.7551 0.638058C1.58589 0.638058 0.638058 1.58589 0.638058 2.7551Z"
              fill={item?.token?.foreground ?? 'black'}
            />
            <path
              d="M11.7553 2.7551C11.7553 4.2767 10.5218 5.5102 9.00022 5.5102C7.47862 5.5102 6.24512 4.2767 6.24512 2.7551C6.24512 1.2335 7.47862 0 9.00022 0C10.5218 0 11.7553 1.2335 11.7553 2.7551ZM6.88318 2.7551C6.88318 3.92431 7.83101 4.87215 9.00022 4.87215C10.1694 4.87215 11.1173 3.92431 11.1173 2.7551C11.1173 1.58589 10.1694 0.638058 9.00022 0.638058C7.83101 0.638058 6.88318 1.58589 6.88318 2.7551Z"
              fill={item?.token?.foreground ?? 'black'}
            />
            <path
              d="M17.9999 2.7551C17.9999 4.2767 16.7664 5.5102 15.2448 5.5102C13.7232 5.5102 12.4897 4.2767 12.4897 2.7551C12.4897 1.2335 13.7232 0 15.2448 0C16.7664 0 17.9999 1.2335 17.9999 2.7551ZM13.1278 2.7551C13.1278 3.92431 14.0756 4.87215 15.2448 4.87215C16.4141 4.87215 17.3619 3.92431 17.3619 2.7551C17.3619 1.58589 16.4141 0.638058 15.2448 0.638058C14.0756 0.638058 13.1278 1.58589 13.1278 2.7551Z"
              fill={item?.token?.card_colors?.accent_color ?? '#28a745'}
            />
            <path
              d="M5.5102 16.7141C5.5102 18.2357 4.2767 19.4692 2.7551 19.4692C1.2335 19.4692 0 18.2357 0 16.7141C0 15.1925 1.2335 13.959 2.7551 13.959C4.2767 13.959 5.5102 15.1925 5.5102 16.7141ZM0.638058 16.7141C0.638058 17.8833 1.58589 18.8311 2.7551 18.8311C3.92431 18.8311 4.87215 17.8833 4.87215 16.7141C4.87215 15.5449 3.92431 14.597 2.7551 14.597C1.58589 14.597 0.638058 15.5449 0.638058 16.7141Z"
              fill={item?.token?.card_colors?.accent_color ?? '#28a745'}
            />
            <path
              d="M11.7553 16.7141C11.7553 18.2357 10.5218 19.4692 9.00022 19.4692C7.47862 19.4692 6.24512 18.2357 6.24512 16.7141C6.24512 15.1925 7.47862 13.959 9.00022 13.959C10.5218 13.959 11.7553 15.1925 11.7553 16.7141ZM6.88318 16.7141C6.88318 17.8833 7.83101 18.8311 9.00022 18.8311C10.1694 18.8311 11.1173 17.8833 11.1173 16.7141C11.1173 15.5449 10.1694 14.597 9.00022 14.597C7.83101 14.597 6.88318 15.5449 6.88318 16.7141Z"
              fill={item?.token?.foreground ?? 'black'}
            />
            <path
              d="M17.9999 16.7141C17.9999 18.2357 16.7664 19.4692 15.2448 19.4692C13.7232 19.4692 12.4897 18.2357 12.4897 16.7141C12.4897 15.1925 13.7232 13.959 15.2448 13.959C16.7664 13.959 17.9999 15.1925 17.9999 16.7141ZM13.1278 16.7141C13.1278 17.8833 14.0756 18.8311 15.2448 18.8311C16.4141 18.8311 17.3619 17.8833 17.3619 16.7141C17.3619 15.5449 16.4141 14.597 15.2448 14.597C14.0756 14.597 13.1278 15.5449 13.1278 16.7141Z"
              fill={item?.token?.foreground ?? 'black'}
            />
            <path
              d="M5.5102 9.73459C5.5102 11.2562 4.2767 12.4897 2.7551 12.4897C1.2335 12.4897 0 11.2562 0 9.73459C0 8.21299 1.2335 6.97949 2.7551 6.97949C4.2767 6.97949 5.5102 8.21299 5.5102 9.73459ZM0.638058 9.73459C0.638058 10.9038 1.58589 11.8516 2.7551 11.8516C3.92431 11.8516 4.87215 10.9038 4.87215 9.73459C4.87215 8.56538 3.92431 7.61755 2.7551 7.61755C1.58589 7.61755 0.638058 8.56538 0.638058 9.73459Z"
              fill={item?.token?.foreground ?? 'black'}
            />
            <path
              d="M11.7553 9.73459C11.7553 11.2562 10.5218 12.4897 9.00022 12.4897C7.47862 12.4897 6.24512 11.2562 6.24512 9.73459C6.24512 8.21299 7.47862 6.97949 9.00022 6.97949C10.5218 6.97949 11.7553 8.21299 11.7553 9.73459ZM6.88318 9.73459C6.88318 10.9038 7.83101 11.8516 9.00022 11.8516C10.1694 11.8516 11.1173 10.9038 11.1173 9.73459C11.1173 8.56538 10.1694 7.61755 9.00022 7.61755C7.83101 7.61755 6.88318 8.56538 6.88318 9.73459Z"
              fill={item?.token?.card_colors?.accent_color ?? '#28a745'}
            />
            <path
              d="M17.9999 9.73459C17.9999 11.2562 16.7664 12.4897 15.2448 12.4897C13.7232 12.4897 12.4897 11.2562 12.4897 9.73459C12.4897 8.21299 13.7232 6.97949 15.2448 6.97949C16.7664 6.97949 17.9999 8.21299 17.9999 9.73459ZM13.1278 9.73459C13.1278 10.9038 14.0756 11.8516 15.2448 11.8516C16.4141 11.8516 17.3619 10.9038 17.3619 9.73459C17.3619 8.56538 16.4141 7.61755 15.2448 7.61755C14.0756 7.61755 13.1278 8.56538 13.1278 9.73459Z"
              fill={item?.token?.foreground ?? 'black'}
            />
          </svg>
          Remaning
        </div>
        <div className="col-5 text-right">
          {item.end_in}
          {/* {item.token.duration >= 60 ? " min" : "sec"} */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2"
          >
            <path
              d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM1.39032 10C1.39032 14.755 5.24501 18.6097 10 18.6097C14.755 18.6097 18.6097 14.755 18.6097 10C18.6097 5.24501 14.755 1.39032 10 1.39032C5.24501 1.39032 1.39032 5.24501 1.39032 10Z"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              x="9.2002"
              y="2.7334"
              width="1.53333"
              height="7.86667"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              x="9.2002"
              y="2.7334"
              width="1.53333"
              height="7.86667"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              x="9.2002"
              y="10.6172"
              width="1.53333"
              height="5.95084"
              transform="rotate(-45 9.2002 10.6172)"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              x="9.2002"
              y="10.6172"
              width="1.53333"
              height="5.95084"
              transform="rotate(-45 9.2002 10.6172)"
              fill={item?.token?.foreground ?? 'black'}
            />
            <circle
              cx="9.99984"
              cy="10.0003"
              r="1.33333"
              fill={item?.token?.card_colors?.accent_color ?? '#28a745'}
            />
          </svg>

          {/* <img src="/images/Task/task2/timer.png"  alt="" /> */}
        </div>
      </div>
      {/* last section2 task */}
      <div
        className="row m-0 header  text-bold f-  "
        style={{ color: item?.token?.foreground ?? '#fff' }}
      >
        <div className="col-7">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M3.3335 5.86621L9.93668 11.9297V17.3583L3.3335 5.86621Z"
              fill={item?.token?.card_colors?.accent_color ?? '#28a745'}
            />
            <path
              d="M16.6667 5.86621L10.0635 17.3583V11.9297L16.6667 5.86621Z"
              fill={item?.token?.foreground ?? 'black'}
            />
            <path
              d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM1.39032 10C1.39032 14.755 5.24501 18.6097 10 18.6097C14.755 18.6097 18.6097 14.755 18.6097 10C18.6097 5.24501 14.755 1.39032 10 1.39032C5.24501 1.39032 1.39032 5.24501 1.39032 10Z"
              fill={item?.token?.card_colors?.accent_color ?? '#28a745'}
            />
          </svg>
          {/* <img src="/images/Task/task2/quality.png" className="mr-2" alt="" /> */}
          VQualis Bonus
        </div>
        <div className="col-5 text-right">
          {item?.bonus_points} Pts
          <svg
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2"
          >
            <rect
              y="9.30273"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="9.30273"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="11.6279"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="11.6279"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="13.9531"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="13.9531"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="16.2793"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="16.2793"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="4.65137"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="4.65137"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="6.97656"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="6.97656"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.card_colors?.accent_color ?? '#28a745'}
            />
            <rect
              x="9.30225"
              y="4.65137"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              x="9.30225"
              y="4.65137"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              x="9.30225"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              x="9.30225"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              x="9.30225"
              y="2.3252"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.card_colors?.accent_color ?? '#28a745'}
            />
            <path
              d="M20 11.8601C20 15.328 17.1888 18.1392 13.721 18.1392C10.2531 18.1392 7.44189 15.328 7.44189 11.8601C7.44189 8.39229 10.2531 5.58105 13.721 5.58105C17.1888 5.58105 20 8.39229 20 11.8601ZM8.77834 11.8601C8.77834 14.5899 10.9912 16.8027 13.721 16.8027C16.4507 16.8027 18.6636 14.5899 18.6636 11.8601C18.6636 9.13039 16.4507 6.9175 13.721 6.9175C10.9912 6.9175 8.77834 9.13039 8.77834 11.8601Z"
              fill={item?.token?.card_colors?.accent_color ?? '#28a745'}
            />
          </svg>
        </div>
      </div>
      {/* last section3 task */}
      <div
        className="row m-0 header py-3 text-bold f- "
        style={{ color: item?.token?.foreground ?? '#fff' }}
      >
        <div className="col-6 pr-0">
          {/* <img src="/images/Task/task2/Group 773.png" className="mr-2" alt="" /> */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M8.33346 10.4001C8.33346 12.0202 7.02017 13.3335 5.40013 13.3335C3.78009 13.3335 2.4668 12.0202 2.4668 10.4001C2.4668 8.78009 3.78009 7.4668 5.40013 7.4668C7.02017 7.4668 8.33346 8.78009 8.33346 10.4001ZM3.14613 10.4001C3.14613 11.645 4.15528 12.6541 5.40013 12.6541C6.64498 12.6541 7.65413 11.645 7.65413 10.4001C7.65413 9.15528 6.64498 8.14613 5.40013 8.14613C4.15528 8.14613 3.14613 9.15528 3.14613 10.4001Z"
              fill={item?.token?.card_colors?.accent_color ?? '#28a745'}
            />
            <path
              d="M14.0669 14.7331C14.0669 16.3532 12.7536 17.6665 11.1335 17.6665C9.51349 17.6665 8.2002 16.3532 8.2002 14.7331C8.2002 13.1131 9.51349 11.7998 11.1335 11.7998C12.7536 11.7998 14.0669 13.1131 14.0669 14.7331ZM8.87953 14.7331C8.87953 15.978 9.88868 16.9871 11.1335 16.9871C12.3784 16.9871 13.3875 15.978 13.3875 14.7331C13.3875 13.4883 12.3784 12.4791 11.1335 12.4791C9.88868 12.4791 8.87953 13.4883 8.87953 14.7331Z"
              fill={item?.token?.foreground ?? 'black'}
            />
            <path
              d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM1.39032 10C1.39032 14.755 5.24501 18.6097 10 18.6097C14.755 18.6097 18.6097 14.755 18.6097 10C18.6097 5.24501 14.755 1.39032 10 1.39032C5.24501 1.39032 1.39032 5.24501 1.39032 10Z"
              fill={item?.token?.foreground ?? 'black'}
            />
            <path
              d="M12.2666 4.93333C12.2666 6.55337 10.9533 7.86667 9.33324 7.86667C7.7132 7.86667 6.3999 6.55337 6.3999 4.93333C6.3999 3.3133 7.7132 2 9.33324 2C10.9533 2 12.2666 3.3133 12.2666 4.93333ZM7.07924 4.93333C7.07924 6.17818 8.08839 7.18733 9.33324 7.18733C10.5781 7.18733 11.5872 6.17818 11.5872 4.93333C11.5872 3.68848 10.5781 2.67934 9.33324 2.67934C8.08839 2.67934 7.07924 3.68848 7.07924 4.93333Z"
              fill={item?.token?.foreground ?? 'black'}
            />
          </svg>
          {item?.token?.name.slice(0, 15)}...
        </div>
        <div className="col-6 text-right pl-0">
          {item.points} Pts
          <svg
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2"
          >
            <rect
              y="9.30273"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="9.30273"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="11.6279"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="11.6279"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="13.9531"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="13.9531"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="16.2793"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="16.2793"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="4.65137"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="4.65137"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="6.97656"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              y="6.97656"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.card_colors?.accent_color ?? '#28a745'}
            />
            <rect
              x="9.30225"
              y="4.65137"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              x="9.30225"
              y="4.65137"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              x="9.30225"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              x="9.30225"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.foreground ?? 'black'}
            />
            <rect
              x="9.30225"
              y="2.3252"
              width="8.7907"
              height="1.86047"
              rx="0.930233"
              fill={item?.token?.card_colors?.accent_color ?? '#28a745'}
            />
            <path
              d="M20 11.8601C20 15.328 17.1888 18.1392 13.721 18.1392C10.2531 18.1392 7.44189 15.328 7.44189 11.8601C7.44189 8.39229 10.2531 5.58105 13.721 5.58105C17.1888 5.58105 20 8.39229 20 11.8601ZM8.77834 11.8601C8.77834 14.5899 10.9912 16.8027 13.721 16.8027C16.4507 16.8027 18.6636 14.5899 18.6636 11.8601C18.6636 9.13039 16.4507 6.9175 13.721 6.9175C10.9912 6.9175 8.77834 9.13039 8.77834 11.8601Z"
              fill={item?.token?.card_colors?.accent_color ?? '#28a745'}
            />
          </svg>
        </div>
      </div>

      {item?.published !== true && user?.user?.developer && (
        <div className="test_task">Preview</div>
      )}
    </>
  );
}

export default TaskFooter;
