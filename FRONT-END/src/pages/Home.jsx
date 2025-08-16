import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import { useContext } from 'react';
import 'remixicon/fonts/remixicon.css'  // to import icon
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext.jsx';
import { UserDataContext } from '../context/UserContext.jsx';
import { useEffect } from 'react';

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

  // Added state for suggestions and active field
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState('');
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
  };

  // const { sendMessage, receiveMessage } = React.useContext(SocketContext);
  const [user] = useContext(UserDataContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.emit('join', { userId: user._id, userType: 'user' });
  }, [user]);


  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);
    setActiveField('pickup');
    if (value.length > 2) { // Only send request if input is at least 3 characters
      try {
        console.log("backend is testing now onwords");
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/suggestions`, {
          // query: value,
          params: { query: value },
          type: 'pickup'
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log("response data is ... : ", response.data);
        setPickupSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching pickup suggestions:', error);
      }
    }
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);
    setActiveField('destination');
    if (value.length > 2) { // Only send request if input is at least 3 characters
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/suggestions`, {
          // query: value,
          params: { query: value },
          type: 'destination'
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setDestinationSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching destination suggestions:', error);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion.display_name);
      setPickupSuggestions([]);
    } else if (activeField === 'destination') {
      setDestination(suggestion.display_name);
      setDestinationSuggestions([]);
    }
    setPanelopen(false);
    setVehiclePanelOpen(true); // Open vehicle panel after location selection
  };

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

  async function findTrip() {
    setPanelopen(false);
    setVehiclePanelOpen(true); // Open vehicle panel after location selection
    try {
      console.log("Fare request sent with pickup:", pickup, "and destination:", destination);
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/fare`, {
        params: {
          pickup,
          destination
        },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log("Fare data received:", response.data);
      setFare(response.data);
    } catch (err) {
      console.error("Error fetching fare:", err);
    }
  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    console.log("Ride created response:", response.data);

  }

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
                onChange={handlePickupChange}
              />
              <input
                className='bg-[#eee] px-12 py-3 text-base rounded-lg w-full mb-3'
                type="text"
                placeholder='Enter your Destination'
                value={destination}
                onClick={() => setPanelopen(true)}
                onChange={handleDestinationChange}
              />
            </form>
            <button onClick={findTrip} className='bg-black  my-2 py-2  rounded-[.5em] w-full  font-semibold text-white' type="submit">Find trip</button>
          </div>
          <div ref={panelref} className='h-0 opacity-0 bg-white '>
            <LocationSearchPanel
              suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
              onSuggestionClick={handleSuggestionClick}
              setPanelopen={setPanelopen}
              setVehiclePanelOpen={setVehiclePanelOpen}
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
            />
          </div>
        </div>

        <div ref={vehiclePanelRef} className='fixed  w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
          <VehiclePanel
            selectvehicle={setVehicleType}
            fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>

        <div ref={confirmRidePanelRef} className='fixed w-full z-30 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
          <ConfirmRide
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setConfirmRidePanel={setConfirmRidePanel} 
            setVehicleFound={setVehicleFound} />
        </div>

        <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound} />
            </div>

      
      <div ref={WaitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
        <WaitingForDriver waitingForDriver={setWaitingForDriver} />
      </div>

    </div >

    </>
  )
}

export default Home

