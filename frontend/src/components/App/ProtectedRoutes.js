import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ Component, session, ...rest }) => {
  if (session.logged_in()) {
    return <Route {...rest} render={() => <Component session={session} />} />;
  } else {
    return <Redirect to="/sign-in" />;
  }
};

export const HomeRoute = ({ Component, session, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        (() => session.logged_in()) ? (
          <Redirect to="/news" />
        ) : (
          <>
            <Component session={session} />
          </>
        )
      }
    />
  );
};

export const ProtectedLogin = ({ Component, session, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => ((() => session.logged_in()) ? <Component session={session} /> : <Redirect to="/roster/start" />)}
    />
  );
};
