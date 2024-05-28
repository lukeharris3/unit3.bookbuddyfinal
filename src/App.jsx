import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Navigations";
import Books from "./pages/Books";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleBook from "./pages/SingleBook";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route index element={<Books />} />
        <Route path="/myaccount" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books/:id" element={<SingleBook />} />
      </Routes>
    </>
  );
}

export default App;
