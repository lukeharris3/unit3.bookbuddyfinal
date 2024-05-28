import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Checkout from "../components/CheckO";

function SingleBook() {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getSingleBook() {
      try {
        const response = await fetch(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setBook(data.book);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    }
    getSingleBook();
  }, [id]);

  if (!book) {
    return <div>Loading......</div>;
  }

  return (
    <div className="contentWrapper">
      <div className="singleBookWrapper">
        <h1>{book.title}</h1>
        <h2>By {book.author}</h2>
        <p>{book.description}</p>
        <img src={book.coverimage} alt={book.title} />
        {book.available ? (
          <h3 style={{ color: "green" }}>Available</h3>
        ) : (
          <h3 style={{ color: "red" }}>Not available</h3>
        )}
        <div className="buttonWrapper">
          <Link className="link" to="/">
            <button className="border_button">Go back</button>
          </Link>
          {book.available && token && <Checkout book={book.id} />}
        </div>
      </div>
    </div>
  );
}

export default SingleBook;

