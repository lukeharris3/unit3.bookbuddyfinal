import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Account from "./Account";
import Nav from "../components/Navigations";

function Login() {
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const result = await response.json();
      if (result.token) {
        localStorage.setItem("token", result.token);
        setLoginError(false);
        navigate("/");
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error(error);
      setLoginError(true);
    }
  };

  return (
    <>
      {!token ? (
        <div className="formContentWrapper">
          <div className="formWrapper">
            <h1>Hello user, Welcome back to Book Buddy</h1>
            <h3>Sign in here:</h3>
            <form className="loginForm" onSubmit={handleSubmit}>
              <label>
                Email:
                <input type="text" name="email" value={form.email} onChange={handleChange} />
              </label>
              <label>
                Password:
                <input type="password" name="password" value={form.password} onChange={handleChange} />
              </label>
              <input type="submit" value="Log in" className="border_button" />
              {loginError && (
                <h3 className="loginError">Your login info is not correct. Try again</h3>
              )}
            </form>
          </div>
          <Link to="/register">
            <h3>Don't have an account? Create one now!</h3>
          </Link>
        </div>
      ) : (
        <Account />
      )}
    </>
  );
}

export default Login;
