import React from 'react'

const LookingForDriver = (props) => {
    return (
        <div>
            <style>
                {`
      @keyframes slide {
        0% { left: -50%; }
        50% { left: 100%; }
        100% { left: -50%; }
      }
      .loader-bar {
        animation: slide 2s infinite linear;
      }
    `}
            </style>
            <h5
                onClick={() => { props.setVehicleFound(false) }}
                className='absolute top-6  text-[#eee] right-6 text-2xl cursor-pointer'>
                <i className="ri-arrow-down-wide-line">
                </i></h5>

            <h3 className='text-2xl font-semibold'>Looking for a Driver </h3>

            {/* animation for showing processing */}
            <div className="relative h-[4px] bg-white mt-3 overflow-hidden rounded-full">
                <div className="absolute h-full w-1/2 bg-blue-500 loader-bar"></div>
            </div>



            <div className='flex flex-col gap-2 justify-between items-center -mt-7 '>
                <img className='h-40' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="car image" />
                <div className='w-full mt-5'>
                    <hr className='border-gray-300 my-4' />
                    <div className='flex items-center gap-5 '>
                        <i className="ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-xl font-extrabold'>562/11-A</h3>
                            <p className='text-base -mt-1 text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>
                    <hr className='border-gray-300 my-4 ml-9 ' />
                    <div className='flex items-center gap-5'>
                        <i className="ri-focus-fill"></i>
                        <div>
                            <h3 className='text-xl font-extrabold'>Third Wave Coffee </h3>
                            <p className='text-base -mt-1 text-gray-600'>{props.destination}</p>
                        </div>
                    </div>
                    <hr className='border-gray-300 my-4 ml-9' />
                    <div className='flex items-center gap-5'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-xl font-extrabold'>₹ {props.fare[props.vehicleType]}</h3>
                            <p className='text-base -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg '> Confirm</button>
            </div>
        </div>
    )
}

export default LookingForDriver
