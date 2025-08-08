import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { IsLogInContext, CurrentUserContext } from "./App";

function ProtectedRoute({ children }) {
  const { isLogIn } = useContext(IsLogInContext);

  if (!isLogIn) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
