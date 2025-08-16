import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserProtectWapper = ({
  children
}) => {

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [ user, setUser ] = useContext(UserDataContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      navigate('/userlogin');
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.status === 200) {
        console.log("User profile fetched ✅", response.data);
        setUser(response.data);
        setIsLoading(false);
      }
    })
      .catch(err => {
        console.log(err)
        localStorage.removeItem('token')
        navigate('/userlogin')
      })
  }, []);

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      {token && children}
    </>
  )
}

export default UserProtectWapper
