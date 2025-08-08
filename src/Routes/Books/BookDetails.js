import React, { useEffect, useState, useContext } from "react";
import NewBookApi from "../../NewBookApi";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Button,
} from "reactstrap";
import Loading from "../Loading";
import { CurrentUserContext } from "../../App";

function BookDetail() {
  const navigate = useNavigate();
  const { volume_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    async function checkIfSaved() {
      try {
        const bookdata = await NewBookApi.getBookbyVolumeID(volume_id);
        setBook(bookdata);

        if (currentUser) {
          const savedBooks = await NewBookApi.getSaveBook(currentUser);
          const alreadySaved = savedBooks.savedBooks.some(
            (b) => b.volumeId === volume_id
          );
          setIsSaved(alreadySaved);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setIsLoading(false);
      }
    }

    checkIfSaved();
  }, [volume_id, currentUser]);

  const handleSimBook = () => {
    navigate(`/bookrecommendation/book/${book.volume_id}`, {
      state: { refBook: book },
    });
  };

  const handleToggleSaved = async () => {
    try {
      if (!currentUser) {
        setError("You must be logged in to save a book.");
        return;
      }

      const bookData = {
        volumeId: book.volume_id,
        title: book.title,
        authors: book.authors || [],
        thumbnail: book.thumbnails || "",
        published_date: book.published_date || "",
        description: book.description || "",
      };

      if (isSaved) {
        const deleteRes = await NewBookApi.deleteSaveBook(
          currentUser,
          book.volume_id
        );
        console.log("Book Deleted", deleteRes);
        setIsSaved(false);
      } else {
        const savedRes = await NewBookApi.saveBook(currentUser, bookData);
        console.log("Saved book response:", savedRes);
        setIsSaved(true);
      }

      setError("");
    } catch (err) {
      if (err.response?.data?.error?.message) {
        setError(err.response.data.error.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  if (!book) {
    return (
      <div className="min-vh-100 p-4 d-flex justify-content-center align-items-center">
        <h2>Book not found.</h2>
      </div>
    );
  }

  return (
    <div className="min-vh-100 p-4">
      <Card className="border-0 rounded shadow-sm p-3">
        {isLoading && <Loading context="Book Details" />}

        <CardBody className="d-flex flex-column flex-md-row gap-4">
          <div className="flex-shrink-0 text-center">
            <CardImg
              alt={`Cover of ${book.title}`}
              src={book.thumbnails}
              style={{ maxWidth: "400px", height: "auto" }}
              className="rounded shadow-sm mx-auto"
            />
          </div>

          <div className="flex-grow-1">
            <CardTitle tag="h1" className="mb-3">
              {book.title}
            </CardTitle>

            <p className="mb-2">
              <strong>Authors:</strong> {book.authors?.join(", ")}
            </p>

            <p className="mb-2">
              <strong>Published:</strong> {book.published_date}
            </p>

            <p className="mb-2">
              <strong>Categories:</strong> {book.categories?.join(", ")}
            </p>

            <p className="mb-2">
              <strong>Page Count:</strong> {book.page_count}
            </p>

            <p className="mb-2">
              <strong>Language:</strong> {book.language}
            </p>

            <div className="mb-3">
              <h5>Description:</h5>
              <CardText
                dangerouslySetInnerHTML={{ __html: book.description }}
              />
            </div>
            {error && (
              <div className="text-danger mt-3">
                <strong>{error}</strong>
              </div>
            )}
            <div className="d-flex flex-wrap gap-2">
              <Button onClick={handleSimBook} color="secondary" size="md">
                Recommend Similar Book
              </Button>
              <Button
                onClick={handleToggleSaved}
                color={isSaved ? "danger" : "success"}
                size="md"
                active
              >
                {isSaved ? "Unsave Book" : "Save Book"}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default BookDetail;
