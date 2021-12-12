import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //if (values.password === values.confirmPassword) {
    //auth.register(values).catch((err) => console.error(err));
    //}
  };

  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  React.useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  return (
    <div className="register">
      <h2 className="register__title">Log in</h2>
      <form className="form register__form ">
        {/*<label className="register__label"> */}
        <input
          className="form__input register__input"
          name="email"
          value={email || ""}
          type="email"
          onChange={handleEmail}
          placeholder="Email"
          required
        />
        {/*</label>*/}
        {/*<label className="register__label">*/}
        <input
          className="form__input register__input"
          name="password"
          value={password || ""}
          type="password"
          onChange={handlePassword}
          placeholder="Password"
          required
        />
        {/*</label>*/}
      </form>
      
        <button onClick={handleSubmit} className="form__button register__button">
        Log in
        </button>
     
      <div className="register__signin">
       {"Not a member yet? "}
        <Link to="/signup" className="register__login-link">
          Sign up here!
        </Link>
      </div>
    </div>
  );
}

export default withRouter(Login);
