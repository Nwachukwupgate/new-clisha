import React from 'react'

function VqualisToken({bonusToken}) {
  return (
    <div className="cardFirstCards   mt-3 ">
        <h6>
          {bonusToken?.totalBonusPoints !== 0
            ? "VQualis Bonus"
            : "You have Not Recieved any VQualis Bonus yet."}
        </h6>

        <div className="carding ThirdCard m-0">
          {bonusToken?.totalBonusPoints !== 0 && (
            <div className="cards p-3  text-center bg-danger text-white">
              <div className="head ">
                <img src="/images/image 37.png" alt="" className='tokenLogo'/>
              </div>
              <div className="body ">
                <small className="font-weight-bold">
                  {bonusToken?.totalBonusPoints} {"VQualis Bonus"}
                </small>
              </div>
            </div>
          )}
        </div> 
      </div>
  )
}

export default VqualisToken
