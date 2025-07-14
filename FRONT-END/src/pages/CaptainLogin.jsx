import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainLogin = () =>{

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [userData , setUserData] = useState({});
    
        const submitHandler = (e) => {
            e.preventDefault(); 
            setCaptainData({ email :email, password : password });
            
            // Here you would typically h andle the login logic, such as sending a request to your backend
            setEmail('');
            setPassword('');
      }
  return (
     <div className='py-10 px-5 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-8' src="https://pngimg.com/uploads/uber/uber_PNG24.png" alt="" />

                <form action="" onSubmit={submitHandler} >

                    <h3 className='text-2xl mb-2 ' >What's your email?</h3>
                    <input 
                    required type="email"
                    placeholder='Enter email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='bg-[#eeeeee] my-2 py-2 px-4 rounded-[.5em] w-full text-lg' 
                    />

                    <h3 className='text-2xl mb-2'>Enter Password</h3>
                    
                    <input 
                    required 
                    type="password" 
                    placeholder='password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='bg-[#eeeeee] my-2 py-2 px-4 rounded-[.5em] w-full text-lg' 
                    />

                    <button className='bg-black  my-2 py-2  rounded-[.5em] w-full  font-semibold text-white' type="submit">Login</button>

                    <p className='text-center'>Join a fleet? 
                        <Link to='/captainsignup' className='text-blue-500 font-semibold'> Register as a Captain</Link>
                    </p>
                </form>
            </div>
            <div>
                <Link to={'/userlogin'}
                 className='bg-[#9e2d07] flex items-center justify-center  my-2 py-2  rounded-[.5em] w-full  font-semibold text-white' type="submit">Sign in as User</Link>

            </div>
        </div>
  )
}

export default CaptainLogin
