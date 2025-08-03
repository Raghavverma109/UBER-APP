import React from 'react'

const WaitingForDriver = (props) => {
    return (
        <div>
            <h5
                onClick={() => { props.setwaitingForDriver(false) }}
                className='absolute top-6  text-[#eee] right-6 text-2xl cursor-pointer'>
                <i className="ri-arrow-down-wide-line">
                </i></h5>

                <div className='flex items-center justify-between'>
                    <img className='h-15' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="car image" />
                    <div className='text-right'>
                        <h2 className='text-lf font-medium '>Sumit</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>UP81 AB 1325</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Wagon R </p>
                    </div>
                </div>

            <div className='flex flex-col gap-2 justify-between items-center -mt-7 '>
                
                <div className='w-full mt-5'>
                    <hr className='border-gray-300 my-4' />
                    <div className='flex items-center gap-5 '>
                        <i className="ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-xl font-extrabold'>562/11-A</h3>
                            <p className='text-base -mt-1 text-gray-600'></p>
                        </div>
                    </div>
                    <hr className='border-gray-300 my-4 ml-9 ' />
                    <div className='flex items-center gap-5'>
                        <i className="ri-focus-fill"></i>
                        <div>
                            <h3 className='text-xl font-extrabold'>Third Wave Coffee </h3>
                            <p className='text-base -mt-1 text-gray-600'>17th Cross Rd, PWD Quarters, Noida, UttarPradesh</p>
                        </div>
                    </div>
                    <hr className='border-gray-300 my-4 ml-9' />
                    <div className='flex items-center gap-5'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-xl font-extrabold'>₹ 193.46</h3>
                            <p className='text-base -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg '> Confirm</button>
            </div>
        </div>
    )
}

export default WaitingForDriver
