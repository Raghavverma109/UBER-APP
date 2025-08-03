import React, { use, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {UserDataContext} from '../context/UserContext';

const UserSignup = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const [user , setUser] = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register` , newUser);

    if(response.status === 201){
        const data = response.data; 
        localStorage.setItem('token' , data.token);
        setUser(data.user);
        navigate('/home');
    }

    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
  }

  return (
    <div className='py-10 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

        <form action="" onSubmit={submitHandler} >

          <h3 className='text-xl mb-2' >What's your name</h3>

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
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className='bg-[#eeeeee] py-2 px-4 w-1/2 rounded-[.5em] text-lg'
            />
          </div>

          <h3 className='text-xl mb-2' >What's your email?</h3>
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

          <button className='bg-black  my-2 py-2  rounded-[.5em] w-full  font-semibold text-white' type="submit">Create Account</button>

          <p className='text-center text-sm'>Already have a Account?
            <Link to='/userlogin' className='text-blue-500 font-semibold'>Login here</Link>
          </p>
        </form>

      </div>
      <div>
        <p className='text-[10px] leading-tight'>This Site as protected by reCAPTCHA and the<span className='underline'> Google Private Policy</span> and <span className='underline'>Terms of Service</span> apply</p>
      </div>
    </div>
  )
}

export default UserSignup
