import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";
import TitleSearch from "./TitleSearch";
import DescriptionSearch from "./DescriptionSearch";
import CoverSearch from "./CoverSearch";

function SearchHome() {
  const [searchType, setSearchType] = useState("title");
  const location = useLocation();
  const isHome = location.pathname === "/";

  function renderSearchOption() {
    switch (searchType) {
      case "title":
        return <TitleSearch />;
      case "description":
        return <DescriptionSearch />;
      case "cover":
        return <CoverSearch />;
      default:
        return <TitleSearch />;
    }
  }

  const titleText = (
    <Card className="mb-4 text-center p-4 shadow-sm h-100">
      <CardBody>
        <h4 className="card-title">Search by Title</h4>
        <p className="card-text">
          Find your book by its title! Type in the name of the book you’re looking for, select it from the results, and then use “Recommend Similar Books” to let our AI suggest titles that match your taste.
        </p>
      </CardBody>
    </Card>
  );
  const describeText = (
    <Card className="mb-4 text-center p-4 shadow-sm">
      <CardBody>
        <h4 className="card-title">AI Description Recommendation</h4>
        <p className="card-text">
          Describe your ideal book! Genre, plot, mood, or vibe and our AI will suggest titles that match your preferences, along with explanations of why they’re a great fit.
        </p>
      </CardBody>
    </Card>
  );
  const coverText = (
    <Card className="mb-4 text-center p-4 shadow-sm">
      <CardBody>
        <h4 className="card-title">AI Cover Based Search</h4>
        <p className="card-text">
          Describe your ideal book cover colors, images, or text, and our AI will suggest books that match your vision. It may explain why a match fits, since it can’t actually see the covers.
        </p>
      </CardBody>
    </Card>
  );

  function renderTextOption() {
    switch (searchType) {
      case "title":
        return titleText;
      case "description":
        return describeText;
      case "cover":
        return coverText;
      default:
        return titleText;
    }
  }

  return (
    <div className="col-md-8 mx-auto my-4">
      {renderSearchOption()}

      <div
        className="col-md-8 mx-auto my-4"
        style={{ display: "flex", justifyContent: "center", gap: "10px" }}
      >
        <Button
          onClick={() => setSearchType("title")}
          style={{
            backgroundColor: searchType === "title" ? "#E69500" : "#634612ff",
            border: "1px solid black",
          }}
        >
          Title
        </Button>{" "}
        <Button
          onClick={() => setSearchType("description")}
          style={{
            backgroundColor:
              searchType === "description" ? "#7e3eddff" : "#321d58ff",
            border: "1px solid black",
          }}
        >
          Description
        </Button>{" "}
        <Button
          onClick={() => setSearchType("cover")}
          style={{
            backgroundColor: searchType === "cover" ? "#0ed629ff" : "#024b14ff",
            border: "1px solid black",
          }}
        >
          Cover
        </Button>
      </div>
      {isHome && renderTextOption()}
    </div>
  );
}
export default SearchHome;
