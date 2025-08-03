import React from 'react'
import { Link } from 'react-router-dom'

const FinishRide = (props) => {
  return (
    <div>
      
            <h5
                onClick={() => { props.setFinishRide(false) }}
                className='absolute top-6  text-[#eee] right-6 text-2xl cursor-pointer'>
                <i className="ri-arrow-down-wide-line">
                </i></h5>

            <h3 className='text-2xl font-semibold mb-8'>Finish this Ride </h3>


            <div className='flex items-center bg-yellow-400  p-3 rounded-lg justify-between my-8'>
                <div className='flex items-center justify-start gap-4'>
                    <img className='h-12 w-12 rounded-full object-cover' src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <h4 className='font-semibold text-xl'>Harsh Gujraal  </h4>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>

            <div className='flex flex-col gap-2 justify-between items-center -mt-7 '>

                <div className='w-full mt-5 '>
                    <div className='flex items-center gap-5 '>
                        <i className="ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-xl font-extrabold'>562/11-A</h3>
                            <p className='text-base -mt-1 text-gray-600'>Kankariya Talab, Delhi</p>
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

                <div className='mt-6 w-full'>
                        <Link to='/captain-home'
                            className='w-full mt-5 bg-green-600 text-white flex justify-center font-semibold p-3 rounded-lg ' > Finish Ride </Link>
                            <p className='text-sm text-red-400 mt-8 mb-5'>click on finish ride button if you have compelete the payment</p>
                </div>
            </div>
        </div >
  )
}

export default FinishRide
