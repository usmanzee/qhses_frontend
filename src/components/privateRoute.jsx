import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { REACT_APP_AUTH_REROUTE_URL } = process.env;
  const currentUrl = window.location.pathname;
  const isAuthenticated = localStorage.getItem("token") ? true : false;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          (window.location.href = `${REACT_APP_AUTH_REROUTE_URL}/${encodeURIComponent(
            currentUrl
          )}`)

          // <Redirect to="unauthorized" />
        )
      }
    />
  );
};
