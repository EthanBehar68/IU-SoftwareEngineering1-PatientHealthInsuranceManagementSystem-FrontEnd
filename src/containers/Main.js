import React, {Component, Fragment} from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import PrivateRoute from '../components/Nav/PrivateRoute';
import {connect} from "react-redux";
import {db_get_admin} from '../store/actions/admin';
import {setFooter} from '../store/actions/footer';

import Products from './Customer/Products';
import Checkout from './Customer/Checkout';

import AdminDashboard from './Admin/AdminDashboard';
import AdminSignIn from './Admin/AdminSignIn';

import NoRoute from '../components/Graphics/NoRoute';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false
		};
	}

	async componentDidMount() {
		if(this.props.user.db == "admin") {
			await this.props.db_get_admin(this.props.user);
			this.props.setFooter("admin");
		}
		this.setState({
			...this.state,
			loaded: true
		});
	}

	render() {
		return (
			<Fragment>
				{this.state.loaded && (<Switch>
	        <Route exact path='/' component={Products}/>
	        <Route exact path='/checkout' component={Checkout}/>
	        <Route exact path='/admin' render={props => <AdminSignIn signin/>} />
	        <PrivateRoute exact path='/admin/dashboard' component={AdminDashboard} portal="admin"/>
	        <PrivateRoute exact path='/admin/dashboard/:table' component={AdminDashboard} portal="admin"/>
	        <Route path='/' render={props => <Redirect to="/"/>} />
	        <Route path='/admin' render={props => <Redirect to="/admin"/>} />
	        <Route path='*' render={props => <NoRoute />} />
	      </Switch>)}
      </Fragment>
		)
	}
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps,{db_get_admin, setFooter})(withRouter(Main));
