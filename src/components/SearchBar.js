import React, { useState } from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import "./App.scss";

const SearchBar = ({ search, invalidInput, setInvalidInput }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    search(searchTerm);
    setSearchTerm("");
  };

  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
    setInvalidInput(false);
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <InputGroup className={invalidInput ? "mb-1" : "mb-4"}>
          <FormControl
            placeholder="Search for a city..."
            value={searchTerm}
            onChange={onInputChange}
          />
          <InputGroup.Append>
            <Button variant="success pb-1">
              <i className="fas fa-search"></i>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      {invalidInput ? (
        <p className="text-danger ml-1">Invalid input! Please try again.</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchBar;
