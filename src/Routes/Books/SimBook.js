import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NewBookApi from "../../NewBookApi";
import BookCard from "../Books/BookCard";
import Loading from "../Loading";
import {
  Card,
  CardBody,
  CardText,
  CardImg,
  CardTitle,
  Button,
} from "reactstrap";

function SimBook() {
  const location = useLocation();
  const { refBook } = location.state || {};
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getRecommendationsAndBooks() {
      try {
        // Step 1: Get AI-based recommendations
        console.log("REF Book:", refBook);

        const descriptRes = await NewBookApi.recoSimBook(refBook);
        const recommendations = descriptRes.Recommendations;

        console.log("Recomendations SimBook:", recommendations);

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
    if (refBook) {
      setIsLoading(true);
      getRecommendationsAndBooks();
    }
  }, [refBook]);

  const reloader = () => {
    window.location.reload();
  };
  return (
    <div className="min-vh-100 p-4">
      <Card
        className="border-0 rounded shadow-sm p-3"
        style={{ margin: "0 auto" }}
      >
        {isLoading && (
          <Loading context={`Finding Books Like ${refBook.title} `} />
        )}

        <CardBody className="d-flex flex-column flex-md-row gap-4">
          <div className="flex-shrink-0 text-center">
            <CardImg
              alt={`Cover of ${refBook.title}`}
              src={refBook.thumbnails}
              style={{ maxWidth: "400px", height: "auto" }}
              className="rounded shadow-sm mx-auto"
            />
          </div>
          <div className="flex-grow-1">
            <CardTitle tag="h1" className="mb-3">
              {refBook.title}
            </CardTitle>

            <p className="mb-2">
              <strong>Authors:</strong> {refBook.authors.join(", ")}
            </p>

            <p className="mb-2">
              <strong>Published:</strong> {refBook.published_date}
            </p>
            <div className="mb-">
              <h5>Description:</h5>
              <CardText
                dangerouslySetInnerHTML={{ __html: refBook.description }}
              />
            </div>
            {error && (
              <div className="text-danger text-center mt-2">
                <p>{error}</p>
                <Button onClick={reloader} color="danger" size="md" active>
                  Reload Page
                </Button>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
      <CardBody>
        {books.map((book) => (
          <BookCard book={book} key={book.volume_id || book.id} />
        ))}
      </CardBody>
    </div>
  );
}

export default SimBook;
