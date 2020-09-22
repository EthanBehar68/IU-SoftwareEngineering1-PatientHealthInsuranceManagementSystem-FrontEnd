import React, {Component, Fragment} from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import PrivateRoute from '../components/Nav/PrivateRoute';
import {connect} from "react-redux";

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false
		};
	}

	render() {

		return (
			<Fragment>
				Hello World
      </Fragment>
		)
	}
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps,{})(withRouter(Main));
