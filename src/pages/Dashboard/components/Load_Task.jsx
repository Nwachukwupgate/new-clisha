import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import list from "../../../json/minicards.json"


function Load_Task(props) {
  // const data = list.data
  const topToken = useSelector((state) => state.general.topToken);
  // console.log(topToken)

  return (
    <div>
      {topToken &&
        topToken?.slice(0, 10)?.map((item, index) => (
          <div
            key={index}
            className="minicards"
            style={{
              background: item.background,
              color: item.foreground,
            }}
          >

            <h6 className=' text-capitalize'>{item?.name}
              <b className="float-right text-light">{item.percentage ?? 0}%</b>
            </h6>
            <p className='p-0 m-0 mb-1'>{item?.description}</p>
            <div
              className="progress bg-secondary"
              style={{
                height: "8px",
                borderRadius: "50px",
                opacity: "50%"
              }}
            >
              <div
                className="progress-bar bg-white"
                role="progressbar"
                style={{ width: `${item?.percentage}%`, borderRadius: "50px" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        ))}
      <div className="loadmore text-center p-3">
        <Link to='/dashboard/token' className='text-dark'>
          Show More </Link>
      </div>
    </div>
  );
}

export default Load_Task