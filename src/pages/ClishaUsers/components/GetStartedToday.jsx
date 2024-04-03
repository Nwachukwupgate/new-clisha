import React from 'react'

function GetStartedToday() {
    return (
        <div className='GetStartedToday text-center'>
            <h1>Get Started Today</h1>
            <p className='col-md-8 mx-auto'>
                Phasellus sodales est id sapien condimentum sagittis. Vivamus eget lorem augue. Nunc ut diam tellus. Fusce mattis luctus sem, sollicitudin tincidunt ante ullamcorper non. Ut feugiat dictum consequat. Aenean varius, augue malesuada eleifend faucibus
            </p>

            <div className="row mt-4 mx-0 ">
                <div className="col-md-4">
                    <img src="/images/users/pointer 1.png" alt="" />
                    <h6> Register for an ICO</h6>
                </div>
                <div className="col-md-4">
                    <img src="/images/users/line.png" className='lf line d-md-block d-none' alt="" />

                    <img src="/images/users/pointer 2.png" alt="" />
                    <h6>Select Plans</h6>

                </div>
                <div className="col-md-4">
                    <img src="/images/users/line.png" className='rf line d-md-block d-none' alt="" />

                    <img src="/images/users/pointer 3.png" alt="" />
                    <h6>Complete Daily Task and Earn</h6>
                </div>
            </div>

        </div>
    )
}

export default GetStartedToday