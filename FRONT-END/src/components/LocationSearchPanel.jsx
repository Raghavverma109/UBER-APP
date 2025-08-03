import React from 'react'

const LocationSearchPanel = (props) => {

  // sample array for location 
  const locations = [
    " h-36 , Barai Street , Aligarh, Uttar Pradesh - 202001 " ,
    " Shekhar Sarraf Memorial Hospital, Agra Road, Sasni Gate, Aligarh, Uttar Pradesh - 202001 ",
    " Silverpark Residency, GT Road, Bhikampur, Aligarh, Uttar Pradesh, 202001 ",
    " The SBI Regional Business Office , RBO 2, Swaranjayanti Nagar, Ramghat Road, Aligarh, Uttar Pradesh, 202001 ",
    " The Samsung service center , No 3/31,1st Floor, Kela House, Samad Road, Aligarh - 202001 "
  ];
  return (
    <div>
      {
        locations.map((element , idx) => (
          <div key={idx} onClick={()=>{
            props.setVehiclePanelOpen(true)
            props.setPanelopen(false)
          }} className='flex items-center border-2 p-1 border-white active:border-black rounded-xl justify-start my-3 gap-4'>
            <h4><i className="ri-customer-service-line flex items-center justify-center bg-[#eee] h-8 w-8 text-xl rounded-full"></i></h4>
            <h4 className='font-medium'>{element}</h4>        
          </div>
        ))
      }
    </div>
  )
}

export default LocationSearchPanel
