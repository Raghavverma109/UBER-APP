import React from 'react'

const CaptainDetails = () => {
  return (
    <>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-4'>
            <img className='h-12 w-12 rounded-full object-cover' src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <h4 className='font-semibold text-xl'>John Driver</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>₹250</h4>
            <p className='text-sm text-gray-600'>Earned</p>
          </div>
        </div>

        <div className='flex p-5 mt-3 bg-gray-100 rounded-2xl justify-center gap-4 items-start '>
          <div className='text-center'>
            <i className="text-2xl font-thin ri-timer-2-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className="text-2xl font-thin ri-speed-up-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className="text-2xl font-thin ri-booklet-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
        </div>
        </>

  )
}

export default CaptainDetails
