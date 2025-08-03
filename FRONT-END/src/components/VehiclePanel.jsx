import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div>
            <h5
                onClick={() => { props.setVehiclePanelOpen(false) }}
                className='absolute top-6  text-[#eee] right-6 text-2xl cursor-pointer'>
                <i className="ri-arrow-down-wide-line">
                </i></h5>

            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle </h3>

            <div onClick={() => { props.setConfirmRidePanel(true) }} className='flex w-full border-2 rounded-xl active:border-black border-[#eee] items-center justify-between mb-2  p-3'>
                <img className='h-12' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="car image" />
                <div className=' w-1/2 '>
                    <h4 className='font-medium text-lg'>UberGo  <span><i className="ri-user-3-fill"></i></span>4 </h4>
                    <h5 className='font-medium text-sm'>2 mins away </h5>
                    <p className='font-normal text-xs'>Affordable , compact rides </p>
                </div>
                <h2 className='text-lg font-semibold'>₹ 193.46</h2>
            </div>

            <div onClick={() => { props.setConfirmRidePanel(true) }} className='flex w-full border-2 rounded-xl active:border-black border-[#eee] items-center justify-between mb-2  p-3'>
                <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_715,w_1072/v1649231046/assets/84/ad96b0-f8d6-41a7-babf-816237fe530d/original/Uber_Moto_Orange_696x464_pixels_Tablet.png" alt="bike image" />
                <div className=' w-1/2 '>
                    <h4 className='font-medium text-lg'>Moto  <span><i className="ri-user-3-fill"></i></span>1 </h4>
                    <h5 className='font-medium text-sm'>3 mins away </h5>
                    <p className='font-normal text-xs'>Affordable motorcycle rides </p>
                </div>
                <h2 className='text-lg font-semibold'>₹ 67.6</h2>
            </div>

            <div onClick={() => { props.setConfirmRidePanel(true) }} className='flex w-full border-2 rounded-xl active:border-black border-[#eee] items-center justify-between mb-2  p-3'>
                <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_384,w_576/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="auto image" />
                <div className=' w-1/2 '>
                    <h4 className='font-medium text-lg'>UberAuto <span><i className="ri-user-3-fill"></i></span>3 </h4>
                    <h5 className='font-medium text-sm'>7 mins away </h5>
                    <p className='font-normal text-xs'>Affordable Auto rides </p>
                </div>
                <h2 className='text-lg font-semibold'>₹ 113.15</h2>
            </div>
        </div>
    )
}

export default VehiclePanel
