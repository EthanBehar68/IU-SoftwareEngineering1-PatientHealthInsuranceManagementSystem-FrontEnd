import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const PrivateRoute = ({ component: Component, auth, portal, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true && portal == auth.user.db ? (
        <Component {...props} />
      ) : (
        <Redirect to={portal == "workers" ? "/worker" : "/app"} />
      )
    }
  />
);
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(PrivateRoute);
