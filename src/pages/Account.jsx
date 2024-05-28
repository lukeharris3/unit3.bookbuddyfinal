import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Reservations from "../components/Reservation";
import { Link } from "react-router-dom";

function Account() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getAccountInfo() {
      try {
        const response = await fetch(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch account information");
        }
        const result = await response.json();
        setUser(result);
      } catch (error) {
        console.error(error);
      }
    }
    getAccountInfo();
  }, [token]);

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="accountWrapper">
      <div className="accountBox">
        <h1>Welcome back, {user.firstname}!</h1>
        <h3>Account Information:</h3>
        <ul>
          <li>Name: {user.firstname} {user.lastname}</li>
          <li>Email: {user.email}</li>
        </ul>
        <Reservations />
        <div className="accountButtons">
          <Link to="/">
            <button className="border_button">Back to books</button>
          </Link>
          <button onClick={logout} className="red_button">Sign out</button>
        </div>
      </div>
    </div>
  );
}

export default Account;

