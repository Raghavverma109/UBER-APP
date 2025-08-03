import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FinishRide from '../components/FinishRide'

const CaptainRiding = () => {

    const [finishRide, setFinishRide] = useState(false)
    const finshRidePanelRef = useRef(null)


    useGSAP(function () {
        if (finishRide) {
            gsap.to(finshRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        }
        else {
            gsap.to(finshRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRide])

    return (
        <div className='h-screen relative'>
            <div className=''>
                <img className='absolute left-5 top-5 w-16 mb-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-line"></i>
                </Link>
            </div>
            <div className='h-4/5 '>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div
                onClick={() => {
                    setFinishRide(true)
                }}
                className='h-1/5 px-6 relative bg-yellow-400 flex items-center justify-center   '>
                <h5
                    className='absolute top-6  text-2xl cursor-pointer'>
                    <i className="ri-arrow-down-wide-line">
                    </i></h5>

                <h4 className='text-xl font-semibold'>4 KM away</h4>
                <button className='w-full mt-5 bg-green-600 text-white flex justify-center font-semibold p-3 rounded-lg ' >Complete Ride </button>
            </div>

            <div ref={finshRidePanelRef}
                className='fixed w-full z-10 bottom-0 bg-white translate-y-full px-3 py-6 pt-12 '>
                <FinishRide  setFinishRide={setFinishRide}/>
            </div>

        </div>
    )
}

export default CaptainRiding
