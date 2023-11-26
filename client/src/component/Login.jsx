import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const defaultUser = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(defaultUser);

  const nav = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = await fetch("https://dull-red-rooster-tie.cyclic.app/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: user,
      });
      if (data.auth === 1) {
        nav("/"); //navigate to home page if signup sucess
      } else {
        // if user already exist
        nav("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleFormSubmit} action="">
        <input
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          value={user.email}
          placeholder="Enter Your Email"
          required
          type="email"
        />
        <br />
        <input
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          value={user.password}
          placeholder="Enter Your Password"
          required
          type="password"
        />
        <br />
        <button onClick={handleFormSubmit}>Submit</button>
        <p
          onClick={() => nav("/signup")}
          style={{
            color: "red",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Dont Have Account? Register Now !{" "}
        </p>
      </form>
    </div>
  );
};

export default Login ;
