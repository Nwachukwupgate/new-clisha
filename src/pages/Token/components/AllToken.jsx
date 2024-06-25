function AllToken({ allToken }) {
  return (
    <div className="cardFirstCards   mt-3 ">
      <h6>{allToken?.length ? 'All Tokens' : 'No Available Token yet'}</h6>

      <div className="carding SecondCard m-0">
        {allToken &&
          allToken?.map((item, index) => (
            <div
              className="cards p-3 bg-blue text-center"
              key={index}
              style={{ background: item.background }}
            >
              <div className="head ">
                <img src={item.photo} alt="" className="tokenLogo" />
              </div>
              <div className="body ">
                <small className="font-weight-bold">
                  {item.value} {item.name}
                </small>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AllToken;
