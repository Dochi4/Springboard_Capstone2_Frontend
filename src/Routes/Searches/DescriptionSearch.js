import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Form, FormGroup, Input, Button } from "reactstrap";

function DescriptionSearch() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setError("Please enter a Book Description.");
      return;
    }
    navigate("/bookrecommendation/user/description/", {
      state: {
        userSearch: search,
      },
    });
  };
  return (
    <>
      <Card className="border-0 shadow-sm my-2">
        <CardBody className="text-center">
          <Form onSubmit={handleSubmit}>
            <h4 className="m-0 flex-grow-1 mb-1 ">Search By Description: </h4>
            <FormGroup className="d-flex gap-2">
              <Input
                value={search}
                placeholder="Type a Book Description "
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
    </>
  );
}

export default DescriptionSearch;
