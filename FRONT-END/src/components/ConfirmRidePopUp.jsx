import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    
    const [otp, setOtp] = useState('')

        const submitHandler = (e) =>{
            e.preventDefault();
        } 

    return (
        <div>
            <h5
                onClick={() => { props.setConfirmRidePopUpPanel(false) }}
                className='absolute top-6  text-[#eee] right-6 text-2xl cursor-pointer'>
                <i className="ri-arrow-down-wide-line">
                </i></h5>

            <h3 className='text-2xl font-semibold mb-8'>Confirm this ride to Start</h3>


            <div className='flex items-center border-yellow-400 border-2 p-3 rounded-lg justify-between my-8'>
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
                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }}>

                        <input type="number"
                            value={otp}
                            onChange={(e)=>{setOtp(e.target.value)}}
                            className='bg-[#eee] px-6 py-4 font-mono text-base rounded-lg w-full mb-3 mt-5'
                            placeholder='Enter OTP' />

                        <Link to='/captain-riding'
                            className='w-full mt-5 bg-green-600 text-white text-lg flex justify-center font-semibold p-3 rounded-lg ' > Confirm </Link>
                        <button
                            onClick={() => {
                                props.setConfirmRidePopUpPanel(false)
                                props.setridePopUpPanel(false)
                            }}
                            className='w-full mt-2 bg-red-500 text-white text-lg  font-semibold p-3 rounded-lg '> Cancel</button>

                    </form>
                </div>
            </div>
        </div >
    )
}

export default ConfirmRidePopUp


