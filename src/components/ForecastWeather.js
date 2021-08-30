import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./App.scss";
import Loading from "./Loading";

const ForecastWeather = ({ data, searchForecast, invalidForecast }) => {
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    searchForecast(params.id);
  }, [params.id, searchForecast]);

  const onClick = () => {
    history.push("/");
  };

  if (invalidForecast) {
    return (
      <div className="d-flex flex-column">
        <h4>Sorry, no forecast data available.</h4>
        <Button variant="primary my-3 px-4 align-self-start" onClick={onClick}>
          <i className="fas fa-chevron-left mr-1"></i> Back to Main Page
        </Button>
      </div>
    );
  }

  if (!data)
    return (
      <div className="d-flex flex-column">
        <Loading message={"Loading the forecast..."} />
        <Button variant="primary my-4 px-4 align-self-center" onClick={onClick}>
          <i className="fas fa-chevron-left mr-1"></i> Back to Main Page
        </Button>
      </div>
    );

  const dayArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const { list } = data;
  let date = "";

  const renderDivs = (i) => {
    const divJSX = (hour, index) => {
      return (
        <div
          key={index}
          className="d-flex flex-row flex-lg-column align-items-center justify-content-center"
        >
          <h5 className="mb-0">{hour}:00</h5>
          <img
            src={`https://openweathermap.org/img/wn/${list[index].weather[0].icon}@2x.png`}
            alt="Weather condition"
            className="ml-auto ml-lg-0"
          />
          <span className="mr-auto ml-n2 mr-lg-0 ml-lg-0 text-capitalize">
            {list[index].weather[0].description}
          </span>
          <h5>{list[index].main.temp}°C</h5>
        </div>
      );
    };

    const divsArr = [];
    for (let j = i; j < i + 8; j++) {
      if (j > 39) break;
      const tmpDate = new Date(list[j].dt * 1000).getDate().toString();
      if (tmpDate !== date) return divsArr;
      const hour = ("0" + new Date(list[j].dt * 1000).getHours()).slice(-2);
      divsArr.push(divJSX(hour, j));
    }
    return divsArr;
  };

  const renderCard = () => {
    const cardJSX = (month, day, i) => {
      return (
        <Card key={`0${i.toString()}`}>
          <Accordion.Toggle as={Card.Header} eventKey={i.toString()}>
            <strong className="mr-1">
              {date}/{month}
            </strong>
            ({day})
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={i.toString()}>
            <Card.Body className="d-flex justify-content-around flex-column flex-lg-row">
              {renderDivs(i)}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      );
    };

    return list.reduce((acc, elem, i) => {
      const dateDetails = new Date(elem.dt * 1000);
      const [tmpDate, month, day] = [
        dateDetails.getDate().toString(),
        (dateDetails.getMonth() + 1).toString(),
        dayArr[dateDetails.getDay()],
      ];
      if (i === 0 || tmpDate !== date) {
        date = tmpDate;
        acc.push(cardJSX(month, day, i));
        return acc;
      }
      return acc;
    }, []);
  };

  return (
    <div className="d-flex flex-column">
      <h3 className="my-3 forecastTitle">
        Weather forecast for{" "}
        <span>
          {data.city.name}, {data.city.country}
        </span>{" "}
        :
      </h3>
      <Accordion defaultActiveKey="0">{renderCard()}</Accordion>
      <Button variant="primary my-4 px-4 align-self-center" onClick={onClick}>
        <i className="fas fa-chevron-left mr-1"></i> Back to Main Page
      </Button>
    </div>
  );
};

export default ForecastWeather;
