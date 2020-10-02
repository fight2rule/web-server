const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=5c03e8b7ee478a546a569b0570b5da15&query=${latitude},${longitude}&units=m`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        // WeatherDescription: response.body.current.weather_descriptions[0],
        // Temperature: response.body.current.temperature,
        // FeelsLike: response.body.current.feelslike,
        `${
          // WeatherDescription: response.body.current.weather_descriptions[0],
          // Temperature: response.body.current.temperature,
          // FeelsLike: response.body.current.feelslike,
          `It's ${response.body.current.weather_descriptions[0]}`
        } outside. It is currently ${
          response.body.current.temperature
        } degrees out  and it feels like ${
          response.body.current.feelslike
        } degrees..`
      );
    }
  });
};
module.exports = forecast;
