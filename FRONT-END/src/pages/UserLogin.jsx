import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [userData, setUserData] = useState('');

    const navigate = useNavigate();

    const [ user, setUser ] = useContext(UserDataContext);

    const submitHandler = async (e) => {
        console.log("Login clicked #################################3✅");
        console.log("📨 Trying login with:",  { email, password }); // Log email/password
        e.preventDefault();

        // const loginData = {
        //     email: email,
        //     password: password
        // };

        try {


            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, {
                email: email,
                password: password

            });

            if (response.status === 200) {
                const data = response.data;
                console.log("Login success ✅", data);
                localStorage.setItem('token', data.token);
                setUser(data.user);
                navigate('/home');
            }
        } catch (err) {
            console.error("❌ Login failed:", err?.response?.data || err.message || err);
            alert("Login failed. Check credentials or server.");
        }

        // Here you would typically handle the login logic, such as sending a request to your backend
        setEmail('');
        setPassword('');
    }
    return (
        <div className='py-10 px-5 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

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

                    <p className='text-center'>New here ?
                        <Link to='/usersignup' className='text-blue-500 font-semibold'> Create an account</Link>
                    </p>
                </form>
            </div>
            <div>
                <Link to={'/captainlogin'}
                    className='bg-[#2a8740] flex items-center justify-center  my-2 py-2  rounded-[.5em] w-full  font-semibold text-white' type="submit">Sign in as Captain</Link>

            </div>
        </div>
    )
}

export default UserLogin
