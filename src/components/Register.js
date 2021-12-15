import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

function Register({ onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp({ email, password });
  };

  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  React.useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  return (
    <div className="register">
      <h2 className="register__title">{"Sign up"}</h2>
      <form className="register__form ">
        <input
          className="form__input register__input "
          name="email"
          value={email || ""}
          type="email"
          onChange={handleEmail}
          placeholder="Email"
          required
        />

        <input
          className="form__input register__input"
          name="password"
          value={password || ""}
          type="password"
          onChange={handlePassword}
          placeholder="Password"
          required
        />
      </form>

      <button onClick={handleSubmit} className="form__button register__button">
        {"Sign up"}
      </button>

      <div className="register__signin">
        {"Already a member?  "}
        <Link to="/signin" className="register__login-link">
          {"Log in here"}
        </Link>
      </div>
    </div>
  );
}

export default withRouter(Register);
