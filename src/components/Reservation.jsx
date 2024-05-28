import { useState, useEffect } from "react";
import Checkin from "./CheckI"; 

function Reservations() {
  const [books, setBooks] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getReservations() {
      try {
        const response = await fetch(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setBooks(data.reservation);
      } catch (error) {
        console.error(error);
      }
    }
    getReservations();
  }, [token]);

  return (
    <div className="userBooks">
      <h3>Your checked out books:</h3>
      {books.length > 0 ? (
        books.map((book) => (
          <div className="userBooksWrapper" key={book.id}>
            <h2>{book.title}</h2>
            <h3>By {book.author}</h3>
            <Checkin resId={book.id} />
          </div>
        ))
      ) : (
        <p>You have no books checked out</p>
      )}
    </div>
  );
}

export default Reservations;
