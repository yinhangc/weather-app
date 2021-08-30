import axios from "axios";

// Create new instance of axios with custom config
export default axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: process.env.REACT_APP_WEATHER_API_KEY,
    units: 'metric',
  },
});
