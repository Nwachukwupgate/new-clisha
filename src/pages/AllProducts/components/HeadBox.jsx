import React from 'react'

function HeadBox() {
    return (
        <div className='headBox'>
            <div className="row m-0">

                <div className="col-md-7 order-md-last p-0">
                    <img src="/images/allproducts/headBox5.png" className='w-100' alt="" />
                </div>
                <div className="col-md-5 order-md-first p-0">
                    <h3 className='headText'>
                        Clisha ! build for big
                    </h3>
                    <p className='bodyText'>
                        Introduce with our top class products
                    </p>
                    <p className="smallBodyText">
                        Nam id mi sollicitudin magna dictum pellentesque non ac purus. Etiam leo nibh, finibus eget porttitor sit amet, consequat ac lacus. Quisque ornare, arcu quis lacinia hendrerit, quam metus hendrerit mauris, sit amet luctus turpis sem nec diam. Aliquam feugiat nibh tortor, a varius leo tristique nec
                    </p>

                    <button className="btn-warning btn">Explore all products</button>
                </div>

            </div>
        </div>
    )
}

export default HeadBox


