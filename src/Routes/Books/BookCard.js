import React, { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Button,
} from "reactstrap";
import NewBookApi from "../../NewBookApi";
import { CurrentUserContext } from "../../App";

function BookCard({ book }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkIfSaved() {
      if (!currentUser) return;

      try {
        const savedBooks = await NewBookApi.getSaveBook(currentUser);
        const alreadySaved = savedBooks.savedBooks.some(
          (b) => b.volumeId === book.volume_id
        );
        setIsSaved(alreadySaved);
      } catch (err) {
        console.error("Error checking saved books:", err);
      }
    }
    checkIfSaved();
  }, [currentUser, book.volume_id]);

  if (!book) return <Navigate to="/" />;

  function truncate(str, maxlength) {
    return str.length > maxlength ? str.slice(0, maxlength) + "..." : str;
  }

  const handleDetail = () => {
    navigate(`/book/${book.volume_id}`);
  };

  const reasonOrDescription = () => {
    if (book.reason) {
      return book.reason;
    } else {
      return truncate(book.description || "", 200);
    }
  };

  const handleSimBook = () => {
    navigate(`/bookrecommendation/book/${book.volume_id}`, {
      state: {
        refBook: book,
      },
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
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <Card
        className="border rounded shadow-sm mb-3"
        style={{ maxWidth: "800px", margin: "0 auto" }}
      >
        <CardBody className="d-flex align-items-start gap-3">
          <CardImg
            alt={`Cover of ${book.title}`}
            src={book.thumbnails}
            style={{ width: "100px", height: "auto" }}
            className="rounded shadow-sm"
          />
          <div className="text-start flex-grow-1">
            <CardTitle>
              <h5 className="mb-1">{book.title}</h5>
            </CardTitle>
            <p className="mb-1 text-muted">
              {book.authors}
              {book.published_date}
            </p>
            <p className="mb-1">
              <small className="text-muted">{book.categories}</small>
            </p>
            <CardText className="font-italic">{reasonOrDescription()}</CardText>

            {error && (
              <div className="text-danger text-center mt-2">{error}</div>
            )}

            <Button onClick={handleDetail} color="primary" size="md" active>
              View Book
            </Button>
            <Button onClick={handleSimBook} color="secondary" size="md" active>
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
        </CardBody>
      </Card>
    </div>
  );
}

export default BookCard;
