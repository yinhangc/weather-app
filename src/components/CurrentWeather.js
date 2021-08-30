import React from "react";
import Loading from "./Loading";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "./App.scss";

const CurrentWeather = ({ data, location, userReject, cityId }) => {
  const history = useHistory();

  if (!location && !userReject && !data) {
    return <Loading message={"Loading your location..."} />;
  }

  if (!data && !userReject) {
    return <Loading message={"Loading weather data..."} />;
  }

  if (!data && userReject) {
    return (
      <div className="d-flex flex-column align-items-center p-4 bg-grey rounded">
        <h4 className="mb-0" style={{ color: "#595260" }}>
          <i className="fas fa-search mr-2"></i>Search for a city for weather
          data!
        </h4>
      </div>
    );
  }

  const onClick = () => {
    history.push(`/forecast/${cityId}`);
  };

  return (
    <div className="d-flex flex-column align-items-center p-4 bg-grey rounded">
      <h2>
        {data.name}, {data.sys.country}
      </h2>
      <h3 className="mb-0">{data.main.temp}°C</h3>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="Weather condition"
      />
      <h4 className="mb-4 text-capitalize">{data.weather[0].description}</h4>

      <Table>
        <thead>
          <tr>
            <th>
              <h5 className="mb-0">Weather Details 📜</h5>
            </th>
            <th>
              <Button variant="primary" onClick={onClick}>
                Weather Forecast
              </Button>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Temperature Range🌡</td>
            <td>
              {data.main.temp_min}°C - {data.main.temp_max}°C
            </td>
          </tr>
          <tr>
            <td>Temperature Feels Like🌡</td>
            <td>{data.main.feels_like}°C</td>
          </tr>
          <tr>
            <td>Humidity💧</td>
            <td>{data.main.humidity}%</td>
          </tr>
          <tr>
            <td>Pressure ☁️</td>
            <td>{data.main.pressure}hPa</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default CurrentWeather;
