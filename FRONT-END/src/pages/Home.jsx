import React from 'react'
import { HiArrowRight } from "react-icons/hi";
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div>
      <div className='flex flex-col bg-cover bg-[url(https://plus.unsplash.com/premium_photo-1675019260954-661a47d2a9e0?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] justify-between text-white pt-8  w-full h-screen '>
        <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div className='bg-black pb-7 py-4 px-4'>
          <h2 className='text-3xl font-bold text-white '>Get Started with Uber</h2>
          <Link to='/userlogin' className='flex items-center justify-center w-full font-medium text-black  bg-amber-50 py-3 rounded mt-5'>
            <div className='px-[30vw]'>Continue</div>
            <HiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
