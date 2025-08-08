import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SearchHome from "./Searches/SearchHome";
import NavBar from "./NavBar";
import { Card, CardBody, CardTitle, Button } from "reactstrap";

function Home() {
  return (
    <Card className="text-center border-0">
      <CardBody className="text-center">
        <CardTitle tag="h2" className="mb-4"></CardTitle>
        <SearchHome />
      </CardBody>
    </Card>
  );
}

export default Home;
