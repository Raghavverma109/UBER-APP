import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import CaptainDetails from '../components/CaptainDetails'
import RidePopup from '../components/RidePopup'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import MapView from './MapView';
import { useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';


const CaptainHome = () => {

  const [ridePopUpPanel, setridePopUpPanel] = useState(true);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);

  const ridePopUpPanelRef = useRef(null);
  const ConfirmRidePopUpPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    // Join socket room when captain mounts
    socket.emit('join', { userId: captain._id, userType: 'captain' });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("📍 Location updated:", position.coords.latitude, position.coords.longitude);

          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude, // your schema uses 'ldt'
              lng: position.coords.longitude
            }
          });
        });
      } else {
        console.error("❌ Geolocation is not supported by this browser.");
      }
    };

    // Run immediately on mount
    updateLocation();

    // Set interval to update every 10s
    const locationInterval = setInterval(updateLocation, 10000);

    // Cleanup interval on unmount
    return () => {
      clearInterval(locationInterval);
      console.log("🧹 Cleared location update interval");
    };
  }, [captain._id]); // run once, and re-run if captain id changes
  useEffect(() => {
    // Join socket room when captain mounts
    socket.emit('join', { userId: captain._id, userType: 'captain' });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("📍 Location updated:", position.coords.latitude, position.coords.longitude);

          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude, // your schema uses 'ldt'
              lng: position.coords.longitude
            }
          });
        });
      } else {
        console.error("❌ Geolocation is not supported by this browser.");
      }
    };

    // Run immediately on mount
    updateLocation();

    // Set interval to update every 10s
    const locationInterval = setInterval(updateLocation, 10000);

    // Cleanup interval on unmount
    return () => {
      clearInterval(locationInterval);
      console.log("🧹 Cleared location update interval");
    };
  }, [captain._id]); // run once, and re-run if captain id changes



  useGSAP(function () {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopUpPanel])

  useGSAP(function () {
    if (confirmRidePopUpPanel) {
      gsap.to(ConfirmRidePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(ConfirmRidePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopUpPanel])

  return (
    <div className='h-screen '>
      <div className=''>
        <img className='absolute left-5 top-5 w-16 mb-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-line"></i>
        </Link>
      </div>
      <div className='h-3/5 '>
        {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
        <MapView />
      </div>
      <div className='h-2/5 px-6 mt-10 '>
        <CaptainDetails />
      </div>


      <div ref={ridePopUpPanelRef}
        className='fixed w-full z-10 bottom-0 bg-white translate-y-full px-3 py-6 pt-12 '>
        <RidePopup setridePopUpPanel={setridePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>
      <div ref={ConfirmRidePopUpPanelRef}
        className='fixed w-full z-10 bottom-0 bg-white translate-y-full h-screen px-3 py-6 pt-12 '>
        <ConfirmRidePopUp
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setridePopUpPanel={setridePopUpPanel} />
      </div>
    </div>
  )
}

export default CaptainHome

