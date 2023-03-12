import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const SearchBox = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} style={{ display: "flex" }}>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Product..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button
        type="submit"
        className="p-2"
        variant="outline-success"
        style={{ marginLeft: "0.6rem" }}
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
