import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'  // to import icon
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const Home = () => {



  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelopen, setPanelopen] = useState(false);
  const panelref = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);

  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  }

  useGSAP(function () {
    if (panelopen) {
      gsap.to(panelref.current, {
        height: '70%',
        opacity: 1,
        padding: 20
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })

    }
    else {
      gsap.to(panelref.current, {
        height: '0%',
        opacity: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelopen])

  useGSAP(function () {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanelOpen])

   useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(WaitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(WaitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])

  return (
    <>
      <div className='h-screen  relative overflow-hidden'>
        <img className='top-8 left-5 w-16  absolute' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

        <div className='h-screen w-screen '>
          <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>

        <div className='flex flex-col h-screen absolute justify-end top-0  '>
          <div className='h-[30%] bg-white p-5 relative'>
            <h5
              ref={panelCloseRef}
              onClick={() => { setPanelopen(false) }}
              className=' absolute top-6 opacity-0 right-6 text-2xl'>
              <i className="ri-arrow-down-wide-line">
              </i></h5>

            <h4 className='font-semibold text-2xl'>Find a trip</h4>
            <form action="" onSubmit={submitHandler} >
              <div className="line absolute top-[39%] h-16 left-10 w-1 bg-black  rounded-2xl"></div>
              <input
                className='bg-[#eee] px-12 py-3 text-base rounded-lg w-full mb-3 mt-5'
                type="text"
                placeholder='Add a pick-up location'
                value={pickup}
                onClick={() => setPanelopen(true)}
                onChange={(e) => {
                  setPickup(e.target.value);
                }}
              />
              <input
                className='bg-[#eee] px-12 py-3 text-base rounded-lg w-full mb-3'
                type="text"
                placeholder='Enter your Destination'
                value={destination}
                onClick={() => setPanelopen(true)}
                onChange={(e) => {
                  setDestination(e.target.value);
                }}
              />
            </form>
          </div>
          <div ref={panelref} className='h-0 opacity-0 bg-white '>
            <LocationSearchPanel setPanelopen={setPanelopen} setVehiclePanelOpen={setVehiclePanelOpen} />
          </div>
        </div>

        <div ref={vehiclePanelRef} className='fixed  w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
          <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>

         <div ref={confirmRidePanelRef} className='fixed  w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
                <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
        </div>

        <div ref={vehicleFoundRef} className='fixed  w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
                <LookingForDriver setVehicleFound={setVehicleFound} />
        </div>
         <div ref={WaitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
                <WaitingForDriver waitingForDriver={setWaitingForDriver} />
        </div>

      </div>

    </>
  )
}

export default Home

