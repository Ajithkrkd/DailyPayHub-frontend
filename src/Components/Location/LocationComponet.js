import axios from 'axios';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const handleGeolocationSuccess = async (position, callback) => {
  const coordinates = position.coords;

  console.log(coordinates);
  console.log("Your current position is:");
  console.log(`Latitude: ${coordinates.latitude}`);
  console.log(`Longitude: ${coordinates.longitude}`);
  console.log(`Accuracy: More or less ${coordinates.accuracy} meters.`);
  
  try {
    await fetchLocationDetails(coordinates.latitude, coordinates.longitude, callback);
  } catch (error) {
    console.error('Error fetching location details:', error);
    // Handle errors as needed
  }
};

const handleGeolocationError = (error) => {
  console.warn(`ERROR(${error.code}): ${error.message}`);
};

export const getLocation = (callback) => {
  console.log("get location---------------------------------first step")
  navigator.geolocation.getCurrentPosition(
    (position) => {
      handleGeolocationSuccess(position, callback);
    },
    handleGeolocationError,
    geolocationOptions
  );
};

const fetchLocationDetails = async (latitude, longitude, callback) => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
    const address = response.data.address;

    callback({
      city: address.county || "", 
      district: address.state_district || "", 
      state: address.state || "",
      country: address.country || "",
      postalCode: address.postcode || "", 
    });
  } catch (error) {
    console.log(error);
  }
};
