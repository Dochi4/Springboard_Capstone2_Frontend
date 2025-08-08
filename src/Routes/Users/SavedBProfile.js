import React, { useState } from "react";
import SaveBookSearch from "../Searches/SaveBooksSearch";
import Profile from "./Profile";
import Loading from "../Loading";

function SavedBProfile() {
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [booksLoaded, setBooksLoaded] = useState(false);

  const isLoading = !(profileLoaded && booksLoaded);

  return (
    <div className="container my-4">
      {isLoading && <Loading context="Loading your profile and saved books" />}

      {/* Hide content while loading */}
      <div className="row" style={{ display: isLoading ? "none" : "flex" }}>
        <div className="col-md-4">
          <Profile onLoadComplete={() => setProfileLoaded(true)} />
        </div>
        <div className="col-md-8">
          <SaveBookSearch onLoadComplete={() => setBooksLoaded(true)} />
        </div>
      </div>
    </div>
  );
}

export default SavedBProfile;
