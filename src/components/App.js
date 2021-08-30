import React from 'react';
import Container from 'react-bootstrap/Container';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import ForecastWeather from './ForecastWeather';
import useWeather from '../hook/useWeather';
import useLocation from '../hook/useLocation';

const App = () => {
  const [userReject, location] = useLocation();
  const [
    weatherData,
    forecastData,
    cityId,
    searchByCityName,
    searchForecast,
    invalidInput,
    setInvalidInput,
    invalidForecast,
  ] = useWeather(location);

  return (
    <Container>
      <h1 className="pt-5 pb-3 mb-0 text-center">Weather App ⛅️</h1>
      <Router>
        <Route
          path={['/', '/weather-app']}
          exact
          render={() => (
            <>
              <SearchBar
                search={searchByCityName}
                invalidInput={invalidInput}
                setInvalidInput={setInvalidInput}
              />
              <CurrentWeather
                data={weatherData}
                location={location}
                userReject={userReject}
                cityId={cityId}
              />
            </>
          )}
        />
        <Route
          path="/forecast/:id"
          exact
          render={() => (
            <>
              <ForecastWeather
                data={forecastData}
                searchForecast={searchForecast}
                invalidForecast={invalidForecast}
              />
            </>
          )}
        />
      </Router>
    </Container>
  );
};

export default App;
