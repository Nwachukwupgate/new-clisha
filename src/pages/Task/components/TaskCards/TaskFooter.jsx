import { useSelector } from 'react-redux';
import moment from 'moment';
import { formatDuration } from '../../../../utils/functions/functions';


function TaskFooter({ item }) {
  // let timeDiff = ;
  // let time = moment.duration(timeDiff);
  // console.log(moment(item.end_at).endOf('day').fromNow())
  const user = useSelector((state) => state.user.data);

  return (
    <>
      {/* added validity section */}
      <div
        className="row m-0 header py-2 text-bold f-"
        style={{ color: item?.token?.foreground ?? '#fff' }}
      >
        <div className="col-7">
          {/* <img src="/images/Task/task2/Group 771.png" className="mr-2" alt="" /> */}
          <svg
            width="18"
            height="20"
            viewBox="0 0 448 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M128 0c13.3 0 24 10.7 24 24l0 40 144 0 0-40c0-13.3 10.7-24 24-24s24 10.7 24 24l0 40 40 0c35.3 0 64 28.7 64 64l0 16 0 48 0 256c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 192l0-48 0-16C0 92.7 28.7 64 64 64l40 0 0-40c0-13.3 10.7-24 24-24zM400 192L48 192l0 256c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-256zM329 297L217 409c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 95-95c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
              fill={item?.token?.foreground ?? 'black'}
            />
          </svg>
          Validity
        </div>
        <div className="col-5 text-right">
          {item.validity === "Valid (interaction points remaining)" && 
            <svg
            width="18"
            height="20"
            viewBox="0 0 448 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
              fill={item?.token?.foreground ?? 'green'}
            />
            </svg>                  
          }

          {item.validity === 'Invalid (no interaction points left)' && 
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="red"
            height="20px"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
            </svg>              
          }

          {
            item.validity.startsWith("Valid until:") && (
              <>
                {moment(item.period_end_at).format('YYMMDD')}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="10"
                    fill={item?.token?.foreground ?? 'black'}
                  />
                  <rect
                    x="9.2"
                    y="2.73"
                    width="1.53"
                    height="7.87"
                    fill={item?.token?.foreground ?? 'black'}
                  />
                  <rect
                    x="9.2"
                    y="10.62"
                    width="1.53"
                    height="5.95"
                    transform="rotate(-45 9.2 10.62)"
                    fill={item?.token?.foreground ?? 'black'}
                  />
                  <circle
                    cx="10"
                    cy="10"
                    r="1.33"
                    fill={item?.token?.card_colors?.accent_color ?? '#28a745'}
                  />
                </svg>
                </>
              )
          }
        </div>
      </div>

      {/* show money or token  */}
      <div
        className="row m-0 header py-2 text-bold f-"
        style={{ color: item?.token?.foreground ?? '#fff' }}
      >
        <div className="col-7">
          {/* <img src="/images/Task/task2/Group 771.png" className="mr-2" alt="" /> */}
          <svg
            width="18"
            height="20"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M448 64c17.67 0 32 14.33 32 32v16c35.35 0 64 28.65 64 64v224c0 35.35-28.65 64-64 64H64c-35.35 0-64-28.65-64-64V176c0-35.35 28.65-64 64-64V96c0-17.67 14.33-32 32-32h352z"
              fill={item?.token?.foreground ?? "#28a744"}
              style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
            />

            <path
              d="M448 64c17.67 0 32 14.33 32 32v16c35.35 0 64 28.65 64 64v224c0 35.35-28.65 64-64 64H64c-35.35 0-64-28.65-64-64V176c0-35.35 28.65-64 64-64V96c0-17.67 14.33-32 32-32h352z"
              fill={item?.token?.foreground ?? "#28a744"}
              style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
            />
          </svg>

          Earning Type
        </div>
        <div className="col-5 text-right">
          {item?.earnings === "Earns Money" && 
            // <svg
            //   width="24"
            //   height="24"
            //   viewBox="0 0 512 512"
            //   fill="none"
            //   xmlns="http://www.w3.org/2000/svg"
            //   className=""
            // >
            //   <path
            //     fillRule="evenodd"
            //     clipRule="evenodd"
            //     d="M447.7,392.4c-12.1,41.5-49.9,71.6-95.4,71.6h-59.6c-44.3,0-84.7-19.2-114.5-50H208
            //     c-12.3,0-22.3-9.9-22.3-22.3s9.9-22.3,22.3-22.3h16.5c-3.1-10-5-20.5-5.4-31.4H208c-12.3,0-22.3-9.9-22.3-22.3
            //     s9.9-22.3,22.3-22.3h13.4c1.6-10.4,4.4-20.6,8.2-30.2H208c-12.3,0-22.3-9.9-22.3-22.3s9.9-22.3,22.3-22.3h30.4
            //     c29.7-30.9,70.1-50,114.5-50h59.6c45.5,0,83.3,30.1,95.4,71.6c4.4,15.2-7.3,30.8-23.2,30.8c-9.5,0-18.1-6.1-21.2-15.1
            //     c-8.7-27.8-34.2-47.3-64.1-47.3h-59.6c-34.7,0-66,17.4-84.6,43.9H392c12.3,0,22.3,9.9,22.3,22.3s-9.9,22.3-22.3,22.3H242.3
            //     c-2.6,9.6-4.2,19.7-4.5,30.2H392c12.3,0,22.3,9.9,22.3,22.3s-9.9,22.3-22.3,22.3H237.8c18.7,26.5,50,43.9,84.6,43.9h59.6
            //     c29.9,0,55.4-19.5,64.1-47.3c3.1-9,11.7-15.1,21.2-15.1C440.4,361.6,452.1,377.2,447.7,392.4z"
            //     fill={item?.token?.foreground ?? "#000000"}
            //   />
            // </svg>

            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              fill="currentColor" 
              className="bi bi-currency-euro" 
              viewBox="0 0 16 16"
            >
              <path d="M4 9.42h1.063C5.4 12.323 7.317 14 10.34 14c.622 0 1.167-.068 1.659-.185v-1.3c-.484.119-1.045.17-1.659.17-2.1 0-3.455-1.198-3.775-3.264h4.017v-.928H6.497v-.936q-.002-.165.008-.329h4.078v-.927H6.618c.388-1.898 1.719-2.985 3.723-2.985.614 0 1.175.05 1.659.177V2.194A6.6 6.6 0 0 0 10.341 2c-2.928 0-4.82 1.569-5.244 4.3H4v.928h1.01v1.265H4v.928z"/>
            </svg>
          }

          {item?.earnings === "Earns Tokens" &&
            <svg
                height="24"
                width="24"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                fill={item?.token?.foreground ?? "#000000"}
              >
                    <path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2c0 0 0 0 0 0s0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336l0-35.4c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4l0 3.4 0 5.7 0 26.3zm32 0l0-32 0-25.9c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 44.2-86 80-192 80S0 476.2 0 432l0-35.4c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"/>

            </svg>
          }
          {/* {item.token.duration >= 60 ? " min" : "sec"} */}
          {/* <svg
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
          </svg> */}

          {/* <img src="/images/Task/task2/timer.png"  alt="" /> */}
        </div>
      </div>

      {/* last section1 task */}
      <div
        className="row m-0 header py-2 text-bold f-"
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
          Average Duration
        </div>
        <div className="col-5 text-right">
          {formatDuration(item?.average_duration)} 
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
        className="row m-0 header py-2 text-bold f-  "
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
