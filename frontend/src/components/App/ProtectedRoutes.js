import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ Component, session, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        (() => session.logged_in()) ? (
          <>
            <Component session={session} />
          </>
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    />
  );
};

export const ProtectedLogin = ({ Component, session, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        (() => session.logged_in()) ? (
          <Component session={session} />
        ) : (
          <Redirect to="/roster/start" />
        )
      }
    />
  );
};
