import { useNavigate } from "react-router-dom";

function Checkin({ resId }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function runCheckin() {
    try {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${resId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to check in");
      }

      const result = await response.json();
      console.log(result);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button onClick={runCheckin}>Check back in</button>
  );
}

export default Checkin;
