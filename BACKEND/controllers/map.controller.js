const axios = require('axios');
const {validationResult} = require('express-validator')
const mapService = require('../services/map.service');

module.exports.getLatLongFromAddress = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { address } = req.query;
    const coords = await mapService.getAddressCoordinate(address);

    if (!coords) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json({
      latitude: coords.lat,
      longitude: coords.lng
    });

  } catch (error) {
    console.error("Error in getLatLongFromAddress:", error.message || error);
    res.status(500).json({ message: "Error fetching location", error: error.message });
  }
};

module.exports.getDistanceBetweenLocations = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { from, to } = req.query;

    // ⚠️ From & To are now address strings like "Delhi", "Aligarh"
    const distanceTime = await mapService.getDistanceTime(from, to);

    res.status(200).json(distanceTime);

  } catch (err) {
    console.error("💥 Controller Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};


module.exports.getAddressSuggestions = async (req, res) => {
  console.log("Fetching address suggestions...");
  console.log("Query Params:", req.query);  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { query } = req.query;
        const suggestions = await mapService.getAddressSuggestions(query);
        if (!suggestions || suggestions.length === 0) {
            return res.status(404).json({ message: "No suggestions found" });
        }
        res.status(200).json(suggestions);
    } catch (err) {
        console.error("💥 Suggestion Controller Error:", err.message);
        res.status(500).json({ message: err.message });
    }
};
