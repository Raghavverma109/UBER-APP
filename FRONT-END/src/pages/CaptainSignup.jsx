import React, { use, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';


const CaptainSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [userData, setUserData] = useState({});

  const [vehicleColor, setVehicleColor] = useState('');
  const [Vehicleplate, setPlate] = useState('');
  const [vehiclecapacity, setCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const signupData = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: Vehicleplate,
        capacity: vehiclecapacity,
        vehicleType: vehicleType,
      }
    };
    

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, signupData , {
        withCredentials: true
      });

      if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');

    }
    } catch (err) {
      console.error("💥 Server error:", err.response?.data || err.message);
    }
    

    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
    setVehicleColor('');
    setPlate('');
    setCapacity('');
    setVehicleType('');
  }



  return (
    <div className='py-2 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-4' src="https://pngimg.com/uploads/uber/uber_PNG24.png" alt="" />

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
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
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

          <div>
            <h3 className='text-xl mb-2'>Vehicle Details</h3>

            <div className='flex flex-row gap-4 mb-2'>
              <input
                required
                type="text"
                placeholder='Vehicle Color'
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                className='bg-[#eeeeee] py-2 px-4 w-1/2 rounded-[.5em] text-lg'
              />

              <input
                required
                type="text"
                placeholder='Vehicle Plate'
                value={Vehicleplate}
                onChange={(e) => setPlate(e.target.value)}
                className='bg-[#eeeeee] py-2 px-4 w-1/2 rounded-[.5em] text-lg'
              />
            </div>

            <div className='flex flex-row gap-4 mb-2'>
              <input
                required
                type="number"
                placeholder='Vehicle Capacity'
                value={vehiclecapacity}
                onChange={(e) => setCapacity(e.target.value)}
                className='bg-[#eeeeee] py-2 px-4 w-1/2 rounded-[.5em] text-lg'
              />

              <select
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className='bg-[#eeeeee] py-2 px-1 w-1/2 rounded-[.5em] text-lg'
              >
                <option className='text-sm  ' value="">Select Vehicle Type</option>
                <option className='text-sm' value="car">Car</option>
                <option className='text-sm' value="auto">Auto</option>
                <option className='text-sm' value="bike">Bike</option>
              </select>
            </div>
          </div>

          <button className='bg-black  my-2 py-2  rounded-[.5em] w-full  font-semibold text-white' type="submit">Create Account</button>

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
