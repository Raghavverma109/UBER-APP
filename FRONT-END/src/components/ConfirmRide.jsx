import React from 'react'

const ConfirmRide = (props) => {
    return (
        <div >
            <h5
                onClick={() => { props.setConfirmRidePanel(false) }}
                className='absolute top-6  text-[#eee] right-6 text-2xl cursor-pointer'>
                <i className="ri-arrow-down-wide-line">
                </i></h5>

            <h3 className='text-2xl font-semibold'>Confirm your Ride </h3>

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
                <button 
                onClick={()=>{
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false);
                    props.createRide();
                }
                } 
                className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg '
                > Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmRide
