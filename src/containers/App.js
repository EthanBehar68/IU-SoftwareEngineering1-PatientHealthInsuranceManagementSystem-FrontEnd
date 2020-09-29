import React, {Component, Fragment} from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {configureStore} from '../store';
import empty from 'is-empty';

import {state_set_dark} from '../store/actions/dark';

import Main from './Main';

import '../css/overall.css';

const store = configureStore();

if(!empty(localStorage.dark)) {
  store.dispatch(state_set_dark(localStorage.dark === "true"));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Fragment>
        <Provider store={store}>
          <Router>
            <Main />
          </Router>
        </Provider>
      </Fragment>
    );
  }
}

export default App;
