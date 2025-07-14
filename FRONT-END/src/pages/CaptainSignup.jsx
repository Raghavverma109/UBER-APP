import React, { use, useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [secondname, setSecondname] = useState('');
  
    const [userData, setUserData] = useState({});
  
    const submitHandler = (e) => {
      e.preventDefault();
      setUserData({
        fullname: {
          firstname: firstname,
          secondname: secondname
        },
        email: email,
        password: password
      });
      setEmail('');
      setPassword('');
      setFirstname('');
      setSecondname('');
    }

  return (
    <div className='py-10 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-8' src="https://pngimg.com/uploads/uber/uber_PNG24.png" alt="" />

        <form action="" onSubmit={submitHandler} >

          <h3 className='text-xl mb-2' >What's our Captain's name</h3>

          <div className='flex flex-row gap-4 mb-2 '>
            <input
              required type="text"
              placeholder='First Name'
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className='bg-[#eeeeee]  py-2 px-4 w-1/2 rounded-[.5em] text-lg'
            />

            <input
              required type="text"
              placeholder='Last Name'
              value={secondname}
              onChange={(e) => setSecondname(e.target.value)}
              className='bg-[#eeeeee] py-2 px-4 w-1/2 rounded-[.5em] text-lg'
            />
          </div>

          <h3 className='text-xl mb-2' >What's our Captain's email?</h3>
          <input
            required type="email"
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] my-2 py-2 px-4 rounded-[.5em] w-full text-lg'
          />

          <h3 className='text-xl mb-2'>Enter Password</h3>

          <input
            required
            type="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] my-2 py-2 px-4 rounded-[.5em] w-full text-lg'
          />

          <button className='bg-black  my-2 py-2  rounded-[.5em] w-full  font-semibold text-white' type="submit">Login</button>

          <p className='text-center text-sm'>Already have a Account?
            <Link to='/captainlogin' className='text-blue-500 font-semibold'>Login here</Link>
          </p>
        </form>

      </div>
      <div>
        {/* <Link to={'/userlogin'}
          className='bg-[#9e2d07] flex items-center justify-center  my-2 py-2  rounded-[.5em] w-full  font-semibold text-white' type="submit">Sign in as User</Link> */}
        <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls. WhatsApp or SMS
          messages, including by automated means, from Uber and
          its affiliates to the number provided.</p>
      </div>
    </div>
  )
}

export default CaptainSignup
