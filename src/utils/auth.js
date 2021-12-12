import { customFetch } from "./utils.js";
const BASE_URL = "https://register.nomoreparties.co";

export const register = (email, password ) => {
  return customFetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({  email, password }),
  })
  .then(data => console.log(data))
  .catch((err) => console.log(err));   
};


export const login  = ({  email, password }) => {
  return customFetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({  email, password }),
  })
  .then((data) => {
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      return data;
    } else {
      return; // we need to do this to avoid ESLint errors
    }
  });   
};