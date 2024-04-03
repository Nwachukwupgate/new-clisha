import React from 'react'

function EarnToken({earnedToken}) {
  return (
   <div className="cardFirstCards mt-5 ">
        <h6>
          {earnedToken?.length
            ? "Earned Tokens"
            : "You Haven`t Earn Any Token Yet"}
        </h6>
        <div className="carding m-0 " >
          {earnedToken &&
            earnedToken.map((item, index) => (
              <div className="cards p-3 text-center " key={index} style={{ background: item.tokenBackground }}>
                <div className="head "> 
                    <img src={item.tokenPhoto} alt="" className='tokenLogo' /> 
                </div>
                <div className="body ">
                  <small className="font-weight-bold">
                    {item.totalPoints} {item.tokenName}
                  </small>
                </div>
              </div>
            ))}
        </div> 
      </div>
  )
}

export default EarnToken
