import { useState, useEffect, useCallback } from "react";
import weather from "../api/weather";

const useWeather = (location) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [cityId, setCityId] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);
  const [invalidForecast, setInvalidForecast] = useState(false);
  const [query, setQuery] = useState("");

  // Run only after getting user location
  useEffect(() => {
    const searchByCoords = async ([lat, lon]) => {
      try {
        const res = await weather.get("/weather", {
          params: {
            lat,
            lon,
          },
        });
        setCityId(res.data.id);
        setWeatherData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (location) {
      searchByCoords(location);
    }
  }, [location]);

  const searchByCityName = async (searchTerm) => {
    try {
      if (!searchTerm) return;
      const res = await weather.get("/weather", {
        params: {
          q: searchTerm,
        },
      });
      setWeatherData(res.data);
      setCityId(res.data.id);
    } catch (err) {
      setInvalidInput(true);
    }
  };

  const searchForecast = useCallback(
    async (searchTerm) => {
      setQuery(searchTerm);
      try {
        if (!query) return;
        const res = await weather.get("/forecast", {
          params: {
            id: query,
          },
        });
        setInvalidForecast(false);
        setForecastData(res.data);
      } catch (err) {
        setInvalidForecast(true);
      }
    },
    [query]
  );

  return [
    weatherData,
    forecastData,
    cityId,
    searchByCityName,
    searchForecast,
    invalidInput,
    setInvalidInput,
    invalidForecast,
  ];
};

export default useWeather;
