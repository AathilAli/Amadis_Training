import { useState } from "react";
import { Link } from "@tanstack/react-router";
import '../App.css'
function Home() {
  const [userName, setUserName] = useState("");

  return (
    <div className="home-container">
      <h1>Welcome to Calculator App</h1>

      <label>Enter Your Name:</label>

      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter your name"
      />

      {userName === "" ? (
        <p>Please enter your name.</p>
      ) : (
        <p>Welcome, {userName} 👋</p>
      )}

      <Link to="/calculator">
        <button>Start Calculator</button>
      </Link>
    </div>
  );
}

export default Home;