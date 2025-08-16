const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: address,
        format: 'json',
        limit: 1
      }
    });

    const data = response.data[0];
    if (!data) throw new Error(`Coordinates not found for: ${address}`);

    return {
      lat: parseFloat(data.lat),
      lon: parseFloat(data.lon)
    };
  } catch (error) {
    console.error("🛑 Geocoding error:", error.message);
    throw new Error(`Failed to get coordinates for address: ${address}`);
  }
};

module.exports.getDistanceTime = async (fromAddress, toAddress) => {
  try {
    // Step 1: Convert addresses to coordinates
    const fromCoords = await module.exports.getAddressCoordinate(fromAddress);
    const toCoords = await module.exports.getAddressCoordinate(toAddress);

    // Step 2: Format them like "lon,lat"
    const from = `${fromCoords.lon},${fromCoords.lat}`;
    const to = `${toCoords.lon},${toCoords.lat}`;

    // Step 3: Call OSRM
    const response = await axios.get(`https://router.project-osrm.org/route/v1/driving/${from};${to}`, {
      params: {
        overview: 'false'
      }
    });

    const route = response.data.routes[0];
    if (!route) throw new Error("No route found");

    return {
      distanceInKm: (route.distance / 1000).toFixed(2),
      durationInMin: (route.duration / 60).toFixed(2)
    };
  } catch (error) {
    console.error("🛑 OSRM Error:", error.message);
    throw new Error("Failed to fetch distance and time from OSRM");
  }
};


module.exports.getAddressSuggestions = async (query) => {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: query,
                format: 'json',
                addressdetails: 1,
                limit: 5,
            },
            headers: {
                'User-Agent': 'YourAppName/1.0 (your.email@example.com)'  // Required by Nominatim
            }
        });

        return response.data.map(place => ({
            display_name: place.display_name,
            lat: place.lat,
            lon: place.lon
        }));
    } catch (error) {
        console.error("Nominatim Error:", error.message);
        throw new Error('Failed to fetch address suggestions');
    }
};


module.exports.getCaptainInRadius = async (lat, lon, radius) => {
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd,lng], radius / 3963.2] // Radius in radians
      }
    }
  });
  return captains;
};

