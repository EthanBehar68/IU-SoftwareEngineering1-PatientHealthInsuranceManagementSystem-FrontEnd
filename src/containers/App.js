import React, {Component, Fragment} from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import IdleTimer from 'react-idle-timer';
import {Provider} from 'react-redux';
import {StripeProvider} from 'react-stripe-elements';
import {BrowserRouter as Router} from 'react-router-dom';
import {configureStore} from '../store';
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import {setCurrentAdmin, logoutAdmin} from "../store/actions/adminauth";
import empty from 'is-empty';

import Main from './Main';

import '../css/overall.css';
import '../css/navbar.css';
import '../css/footer.css';
import '../css/signin.css';
import '../css/dashboard.css';
import '../css/admin.css';
import '../css/find.css';
import '../css/detail.css';
import '../css/react-confirm-alert.css';

const store = configureStore();

if(localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  if(decoded.db == "admin") store.dispatch(setCurrentAdmin(decoded));

// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutAdmin());
    // Redirect to login
    window.location.href = "/";
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.idleTimer = null;
    this.onIdle = this._onIdle.bind(this);
    this.state = {
    };
  }
 
  _onIdle(e) {
    if(!alert('You have been inactive for 10 minutes. Hit OK to get the latest data.')){window.location.reload();}
  }

  render() {
    return (
      <Fragment>
        <IdleTimer
          ref={ref => { this.idleTimer = ref }}
          element={document}
          onIdle={this.onIdle}
          debounce={250}
          timeout={1000 * 10 * 60} 
        />
        <StripeProvider apiKey="pk_test_jzVfc9MR4WDKN9FVwaLZzj5N">
          <Provider store={store}>
            <Router>
              <div className="content-wrap">
                <Main />
              </div>
            </Router>
          </Provider>
        </StripeProvider>
      </Fragment>
    );
  }
}

export default App;
