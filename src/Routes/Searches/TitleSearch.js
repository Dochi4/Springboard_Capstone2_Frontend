import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Form, FormGroup, Input, Button } from "reactstrap";

function TitleSearch() {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ query: "" });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setSearch({ query: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.query.trim()) {
      setError("Please enter a Book Title.");
      return;
    }
    navigate(`/search/title/${search.query}`);
  };

  return (
    <Card className="border-0 shadow-sm my-2">
      <CardBody className="text-center">
        <Form onSubmit={handleSubmit}>
          <h4 className="m-0 flex-grow-1 mb-1 ">Search By Title: </h4>
          <FormGroup className="d-flex gap-2">
            <Input
              value={search.query}
              placeholder="Type a Book Title"
              onChange={handleInputChange}
            />
            <Button class="mb-3" type="submit" color="primary">
              Submit
            </Button>
          </FormGroup>
        </Form>
        {error && <p className="text-danger">{error}</p>}
      </CardBody>
    </Card>
  );
}

export default TitleSearch;
