import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {logoutAdmin} from "../../store/actions/adminauth";

import logo from '../../images/icon.png';

class AdminNavbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hamburger: true
		}
	}

	render() {
		return (
			<Fragment>
				<div className="navbar-flex">
					<div className="navbar-full">
						<Link to="/" className="navbar-logo"><img src={logo} alt="" className="navbar-logo-img"/></Link>
						{!this.props.signin && (<div className="nav-right">
							<div className="nav-item">
								<a style={{cursor: "pointer"}} className="nav-link admin" onClick={() => {this.props.logoutAdmin();}}>LOGOUT</a>
							</div>
						</div>)}
					</div>
				</div>
			</Fragment>
		)
	}
}

export default connect(null,{logoutAdmin})(withRouter(AdminNavbar));
