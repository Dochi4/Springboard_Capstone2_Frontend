import React, { useState, useEffect, useContext } from "react";
import SaveBookCard from "../Books/SavedBooksCards";
import { Card, CardBody, Form, FormGroup, Input, Button } from "reactstrap";
import { CurrentUserContext } from "../../App";
import NewBookApi from "../../NewBookApi";

function SaveBookSearch({ onLoadComplete }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getAllSaved() {
      console.log("Loading SAVE BOOK SEARCH");
      if (!currentUser) {
        if (onLoadComplete) onLoadComplete();
        return;
      }
      try {
        const savedBooks = await NewBookApi.getSaveBook(currentUser);
        console.log("Save Books", savedBooks.savedBooks);
        setBooks(savedBooks.savedBooks);
        setError("");
      } catch (err) {
        console.error("Error checking saved books:", err);
        setError("Failed to load saved books.");
      } finally {
        if (onLoadComplete) onLoadComplete();
        console.log("Complete Save Book Search");
      }
    }
    getAllSaved();
  }, [currentUser, onLoadComplete]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
  };

  useEffect(() => {
    if (search.trim()) {
      books.filter((book) => {
        return book.title.includes(search);
      });
    }
  }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!search.trim()) {
        const savedBooks = await NewBookApi.getSaveBook(currentUser);
        setBooks(savedBooks.savedBooks);
        setError("");
        return;
      }
      const searchData = await NewBookApi.getFilterSaveBook(currentUser, {
        title: search,
      });
      setBooks(searchData.savedBooks);
      setError("");
    } catch (err) {
      setError("Failed to filter saved books.");
    }
  };
  const handleDeleteBook = (volumeId) => {
    setBooks((prevBooks) =>
      prevBooks.filter((book) => book.volumeId !== volumeId)
    );
  };

  return (
    <div className="col-md-8 mx-auto my-4">
      <Card className="border-0 shadow-sm my-2">
        <CardBody className="text-center">
          <Form onSubmit={handleSubmit}>
            <h3 className="m-0">All Saved Books:</h3>
            <FormGroup className="d-flex gap-2 justify-content-center mt-3">
              <Input
                value={search}
                placeholder="Find Your Saved Books"
                onChange={handleInputChange}
              />
              <Button type="submit" color="primary">
                Search
              </Button>
            </FormGroup>
          </Form>
          {error && <p className="text-danger text-center mt-2">{error}</p>}
        </CardBody>
      </Card>

      {books.length > 0 ? (
        <div
          className="d-flex flex-wrap justify-content-center gap-3"
          style={{
            display: "flex",
            flexWrap: "wrap", // allows wrapping to next line if needed
            justifyContent: "center",
            gap: "16px", // optional: space between cards
          }}
        >
          {books.map((book) => (
            <SaveBookCard
              book={book}
              key={book.volume_id}
              onDelete={handleDeleteBook}
              style={{
                width: "250px",
                height: "0 auto",
              }}
            />
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">No saved books found.</p>
      )}
    </div>
  );
}

export default SaveBookSearch;
