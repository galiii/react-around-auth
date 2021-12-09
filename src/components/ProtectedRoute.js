import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//props = exact and path
function ProtectedRoute({ children, isLoggedIn,  ...props }) {
  return (
    <Route {...props}>
    {
    //children = <Main> component
    isLoggedIn ? children : <Redirect to={"/login"} />
    }
    </Route>
  );
}

export default ProtectedRoute;