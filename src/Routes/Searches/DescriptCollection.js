import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NewBookApi from "../../NewBookApi";
import BookCard from "../Books/BookCard";
import Loading from "../Loading";
import { Card, CardBody, CardText, Button } from "reactstrap";

function DescriptCollection() {
  const location = useLocation();
  const { userSearch } = location.state || {};
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function getRecommendationsAndBooks() {
    if (userSearch) {
      setIsLoading(true);
      try {
        // Step 1: Get AI-based recommendations
        const descriptRes = await NewBookApi.recoUserDescript(userSearch);
        const recommendations = descriptRes.Recommendations;

        if (!recommendations || recommendations.length === 0) {
          setError("No results found.");

          setBooks([]);
          return;
        }

        setError("");
        // Step 2: Fetch book details for each
        const booksData = await Promise.all(
          recommendations.map((result) =>
            NewBookApi.getBookbyTitle({ query: result.title, maxResults: 1 })
          )
        );

        // Step 3: Attach reason to each correspondingbook result
        const booksWithReasons = booksData.map((bookArray, idx) => {
          const actualBook =
            bookArray && bookArray.length > 0 ? bookArray[0] : {};

          return {
            ...actualBook,
            reason: recommendations[idx].reason,
          };
        });

        if (!booksData || booksData.length === 0) {
          setError("No book details found.");
          setBooks([]);
          return;
        }

        setBooks(booksWithReasons);
      } catch (err) {
        console.error("API Error:", err);
        setError("An error occurred. Please try again.");
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    getRecommendationsAndBooks();
  }, [userSearch]);

  const reloader = () => {
    getRecommendationsAndBooks();
  };

  return (
    <Card className="my-3 border-0 shadow-sm">
      {isLoading && <Loading context="Getting Books By Your Description" />}
      <CardBody className="text-center">
        <h3 className="mb-2">Description:</h3>
        <CardText className="mb-1">{userSearch}</CardText>
      </CardBody>
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
          <BookCard book={book} key={book.volume_id || book.id} />
        ))}
      </CardBody>
    </Card>
  );
}

export default DescriptCollection;
