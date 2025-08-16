import React from 'react'
const LocationSearchPanel = ({ suggestions, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion.display_name)
        } else if (activeField === 'destination') {
            setDestination(suggestion.display_name)
        }
    }

    return (
        <div className='px-4 pt-4'>
            {/* Display fetched suggestions */}
            {
                suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start hover:bg-gray-100 cursor-pointer'>
                        <div className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></div>
                        <h4 className='font-medium'>{elem.display_name}</h4>
                    </div>
                ))
            }
        </div>
    )
}

export default LocationSearchPanel