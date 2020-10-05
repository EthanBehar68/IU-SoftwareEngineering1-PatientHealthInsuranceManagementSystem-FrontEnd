import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
const PrivateRoute = ({ component: Component, user, portal, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      portal === user.userType ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);
const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(PrivateRoute);
