import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const user = users.find(
      (user) => user.username === username && user.passowrd === password
    );
    if (users) {
      onLogin(user);
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div>
      <h2> Login </h2>
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
      <button onClick={handleLogin}> Login </button>
    </div>
  );
}

export default Login;
