import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import * as auth from "../utils/auth";

function Register() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //if (values.password === values.confirmPassword) {
    //auth.register(values).catch((err) => console.error(err));
    //}
    auth
      .register({ email, password })
      .then((res) => {history.push("/signin")})
      .catch((err) => console.error(err));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    //setValues({ ...values, [name]: value });
    //console.log(values);
  };

  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  React.useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  return (
    <div className="register">
      <h2 className="register__title">Sign up</h2>
      <form className="register__form ">
        {/*<label className="register__label"> */}
        <input
          className="register__input"
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
          className="register__input"
          name="password"
          value={password || ""}
          type="password"
          onChange={handlePassword}
          placeholder="Password"
          required
        />
        {/*</label>*/}
      </form>
      <div className="register__button-container">
        <button onClick={handleSubmit} className="register__button">
          Sign up
        </button>
      </div>
      <div className="register__signin">
        <p>Already a member?</p>
        <Link to="/signin" className="register__login-link">
          Log in here
        </Link>
      </div>
    </div>
  );
}

export default withRouter(Register);
