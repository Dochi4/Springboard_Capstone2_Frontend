import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewBookApi from "../../NewBookApi";
import BookCard from "../Books/BookCard";
import Loading from "../Loading";
import { Card, CardBody,Button } from "reactstrap";

function TitleCollection() {
  const { query } = useParams();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBooksFromUrl() {
      if (!query) return;

      const searchObject = { query: query.trim(), maxResults: 15 };
      const booksData = await NewBookApi.getBookbyTitle(searchObject);

      if (!booksData || booksData.length === 0) {
        setError("No results found.");
        setBooks([]);
        return;
      }

      setBooks(booksData);
      setError("");
      setIsLoading(false);
    }

    fetchBooksFromUrl();
  }, [query]);

  const reloader = () => {
    window.location.reload();
  };
  return (
    <Card className="my-3 border-0 shadow-sm">
      {isLoading && <Loading />}
      <CardBody>
        {error && (
          <div className="text-danger text-center mt-2">
            <p>{error}</p>
            <Button onClick={reloader} color="danger" size="md" active>
              Reload Page
            </Button>
          </div>
        )}
        {books.map((book) => (
          <BookCard book={book} key={book.volume_id} />
        ))}
      </CardBody>
    </Card>
  );
}

export default TitleCollection;
