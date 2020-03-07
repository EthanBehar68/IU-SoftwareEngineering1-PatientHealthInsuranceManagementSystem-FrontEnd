import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {loginUser} from "../../store/actions/adminauth";
import {setFooter} from "../../store/actions/footer";
import empty from 'is-empty';
import validator from 'validator';

import AdminNavbar from '../../components/Nav/AdminNavbar';
import ErrorBanner from '../../components/Graphics/ErrorBanner';
import Loading from '../../components/Graphics/Loading';

class AdminSignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				first: "",
	      last: "",
	      email: "",
	      phone: "",
	      address: "",
	      city: "",
	      state: "",
	      zip: "",
	      password: "",
	      password2: ""
			},
      error: "",
      loaded: true
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			if (nextProps.auth.user.db == "customers") {
				this.props.setFooter("customers");
				this.props.history.push("/app/dashboard");
			} else if (nextProps.auth.user.db == "workers") {
				this.props.setFooter("workers");
				this.props.history.push("/worker/dashboard");
			} else {
				this.props.setFooter("admin");
				this.props.history.push("/admin/dashboard");
			}
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
    	if (this.props.auth.user.db == "customers") {
    		this.props.setFooter("customers");
				this.props.history.push("/app/dashboard");
			} else if (this.props.auth.user.db == "workers") {
				this.props.setFooter("workers");
				this.props.history.push("/worker/dashboard");
			} else {
				this.props.setFooter("admin");
				this.props.history.push("/admin/dashboard");
			}
    } else {
    	this.props.setFooter("admin");
    }
  }

  onChange = e => {
    this.setState({
    	...this.state,
    	data: {
    		...this.state.data,
    		[e.target.id]: e.target.value 
    	} 
    });
  };

  onLogin = async e => {
    e.preventDefault();
    this.setState({
    	...this.state,
    	loaded: false
    });
		const userData = {
      email: this.state.data.email,
      password: this.state.data.password
    };
		const resp = await this.props.loginUser(userData, this.props.history); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
		if(!resp.complete) {
			this.setState({
				...this.state,
				error: resp.message,
				loaded: true
			});
		}
  };

	render() {
		const {data, validation, empties} = this.state;
		return (
			<Fragment>
				<AdminNavbar signin/>
				{!empty(this.state.error) && (<ErrorBanner error={this.state.error} onHide={() => this.setState({...this.state, error: ''})}/>)}
				{!this.state.loaded && (<Loading />)}
				{this.state.loaded && (<div className="sign-in-container admin">
					<div className="sign-in-box-pic">
						<form className="sign-in-box worker" onSubmit={this.onLogin}>
							<span className="sign-in-title">Admin Sign In</span>
							<div className="input-group">
								<span className="field-label">Email</span>
								<input type="text" className="text-field worker" id="email" onChange={this.onChange}/>
							</div>
							<div className="input-group">
								<span className="field-label">Password</span>
								<input type="password" className="text-field worker" id="password" onChange={this.onChange}/>
							</div>
							<button className="sign-in-btn admin" type="submit">Sign In</button>
						</form>
					</div>
				</div>)}
			</Fragment>
		)
	}
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{loginUser, setFooter})(withRouter(AdminSignIn));
