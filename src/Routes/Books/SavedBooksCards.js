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
const DEFAULT_IMAGE =
  "https://as1.ftcdn.net/v2/jpg/03/77/19/40/1000_F_377194073_LHGUkaGPCzOdRcuBQ40XBtrnpfJLa6hm.jpg";

function SaveBookCard({ book, onDelete }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  console.log("BOOKS FORM PROFILE:", book);
  const bookData = {
    volume_id: book.volumeId,
    title: book.title,
    authors: book.authors || [],
    thumbnails: book.thumbnail || DEFAULT_IMAGE,
    published_date: book.published_date || "",
    description: book.description || "",
  };

  if (!book) return <Navigate to="/" />;

  const truncate = (str, maxlength) =>
    str.length > maxlength ? str.slice(0, maxlength) + "..." : str;

  const handleDetail = () => {
    navigate(`/book/${bookData.volume_id}`);
  };

  const handleSimBook = () => {
    navigate(`/bookrecommendation/book/${bookData.volume_id}`, {
      state: { refBook: bookData },
    });
  };

  const handleDeleteSaved = async () => {
    try {
      await NewBookApi.deleteSaveBook(currentUser, book.volumeId);
      if (onDelete) onDelete(book.volumeId);
    } catch (err) {
      if (err.response?.data?.error) {
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
        style={{
          width: "250px",
          height: "550px",
          margin: "0 auto",
          display: "flex",
        }}
      >
        <CardBody className="d-flex flex-column justify-content-between p-3">
          {/* Thumbnail */}
          <CardImg
            alt={`Cover of ${bookData.title}`}
            src={bookData.thumbnails}
            style={{
              width: "100%",
              height: "250px",
              objectFit: "cover",
            }}
            className="rounded-top"
          />
          {/* Book info */}
          <div>
            <CardTitle>
              <h5 className="flex-grow-1 mb-1 text-truncate">
                {bookData.title}
              </h5>
            </CardTitle>
            <p className="flex-grow-1 mb-1 " style={{ fontSize: "0.9rem" }}>
              {bookData.authors}
            </p>
            <p
              className="flex-grow-1 text-muted mb-2"
              style={{ fontSize: "0.8rem" }}
            >
              {bookData.published_date}
            </p>
            <CardText style={{ fontSize: "0.85rem" }}>
              {truncate(bookData.description || "", 80)}
            </CardText>

            {/* Buttons at bottom */}
            <div className="flex-grow-1 ap-2 mt-3 justify-content-center">
              <Button onClick={handleDetail} color="primary" size="sm">
                View
              </Button>
              <Button onClick={handleSimBook} color="secondary" size="sm">
                Recommend
              </Button>
              <Button onClick={handleDeleteSaved} color={"danger"} size="sm">
                Unsave
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default SaveBookCard;
