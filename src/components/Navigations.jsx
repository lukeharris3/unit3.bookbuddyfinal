import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Nav() {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    setToken(Boolean(hasToken));
  }, []);

  return (
    <nav>
      <Link to="/" className="logos">
        <h2>Book Buddy</h2>
      </Link>
      <div className="navLinks">
        <Link to="/login" className="logos">
          {!token && <h3>Log in(Don't have an account? Create one here!)</h3>}
          <h3>User Info</h3>
        </Link>
        <Link to="/" className="logos">
          <h3>Search</h3>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;

