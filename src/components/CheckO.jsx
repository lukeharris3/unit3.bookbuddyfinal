import { useNavigate } from "react-router-dom";

function Checkout({ book }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function runCheckout() {
    try {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${book}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            available: false,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to check out");
      }

      const result = await response.json();
      console.log(result);
      navigate("/myaccount");
    } catch (error) {
      console.error(error);
    }
  }

  return <>{token && <button onClick={runCheckout}>Check out</button>}</>;
}

export default Checkout;
