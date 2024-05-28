import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Checkout from "../components/CheckO";

function Books() {
  const [books, setBooks] = useState([]);
  const [value, setValue] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [noSearchResults, setNoSearchResults] = useState(false);

  useEffect(() => {
    async function getAllBooks() {
      try {
        const response = await fetch(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setBooks(data.books);
        setFilteredBooks(data.books);
      } catch (error) {
        console.error(error);
      }
    }
    getAllBooks();
  }, []);

  useEffect(() => {
    const searchResultArray = books.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredBooks(searchResultArray);
    setNoSearchResults(searchResultArray.length === 0);
  }, [value, books]);

  const setResults = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="contentWrapper">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search for a book..."
          onChange={setResults}
        />
      </div>
      {noSearchResults && <h2>No books match search</h2>}
      {filteredBooks.map((book) => (
        <div className="bookWrapper" key={book.id}>
          <h1>{book.title}</h1>
          <h2>By {book.author}</h2>
          <img src={book.coverimage} alt={book.title} />
          {book.available ? (
            <h3 style={{ color: "green" }}>Available</h3>
          ) : (
            <h3 style={{ color: "red" }}>Not available</h3>
          )}
          <div className="buttonWrapper">
            <Link className="link" to={"books/" + book.id}>
              <button className="border_button">See info</button>
            </Link>
            {book.available && <Checkout book={book.id} />}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Books;

