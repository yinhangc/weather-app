import Spinner from 'react-bootstrap/Spinner'
import "./App.scss";
import React from "react";

const Loading = ({ message }) => {
  return (
    <div className="d-flex align-items-center justify-content-center p-4 bg-grey rounded">
      <Spinner animation="border" variant="dark" />
      <h4 style={{ fontWeight: '400', letterSpacing: '0.4px' }} className="mb-n1 ml-2">{message}</h4>
    </div>
  );
};

export default Loading;
