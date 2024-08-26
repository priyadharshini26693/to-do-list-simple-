import React, { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users.find((user) => user.username === username)) {
      alert("User already exists");
    } else {
      const newUser = { username, password, todos: [] };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registered sucessfull");
    }
  };

  return (
    <div>
      <h2> Register </h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}> Register </button>
    </div>
  );
}

export default Register;
