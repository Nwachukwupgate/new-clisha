import React from 'react'

function HeadBox() {
    return (
        <div className='headBox'>
            <div className="row m-0">

                <div className="col-md-6 order-md-last p-0">
                    <img src="/images/partner/headbox.png" className='w-100' alt="" />
                </div>
                <div className="col-md-6 order-md-first p-0">
                    <h3 className='headText'>
                        Free Accounts For Test
                    </h3>
                    <p className='bodyText2'> 
                        Clisha Is Your Ultimate Marketing
                        Partner with best Stratgy
                    </p>

                    <button className="btn-warning btn">Become A Publisher</button>
                </div>

            </div>
        </div>
    )
}

export default HeadBox
