const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiaW9zdHJlYW0zNzciLCJhIjoiY2tmOWU5MWplMGw3OTJ6bGNzampkeXp5bCJ9.-EfMNrtHNOwen1oJz-tNaA&limit=1";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to services", undefined);
    } else if (response.body.features.length === 0) {
      callback("Invalid address", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        placeName: response.body.features[0].place_name,
      });
    }
  });
};
module.exports = geocode;
