import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectWapper = ({
    children
}) => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (!token) {
            navigate('/captainlogin');
            return;
        }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        withCredentials: true
    })
            .then(response => {
                if (response.status === 200) {
                    console.log("Captain profile fetched ✅", response.data);
                    setCaptain(response.data);
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
                localStorage.removeItem('token');
                navigate('/captainlogin');
            })
    }, []);

if (isLoading) {
    return <div>Loading...</div>
}

return (
    <>
        {token && children}
    </>
)
}

export default CaptainProtectWapper
