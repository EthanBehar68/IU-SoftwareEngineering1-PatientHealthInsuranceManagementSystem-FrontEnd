import React, {Component, Fragment} from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
import empty from 'is-empty';

import ShoppingCart from '../Icons/ShoppingCart';

import logo from '../../images/icon.png';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hamburger: true,
			redirect: false
		}
	}

	toCheckout = e => {
		this.props.history.push('/checkout')
	}

	render() {
		return (
			<Fragment>
				<div className="navbar-flex">
					<div className="navbar">
						<Link to="/" className="navbar-logo"><img src={logo} alt="" className="navbar-logo-img"/></Link>
						<div className="nav-right">
							<div className="nav-item">
								<button className="nav-link" onClick={this.toCheckout} style={{background: "none", border: "none", cursor: "pointer"}}>
									<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
										<span>{Number.isNaN(this.props.items) ? 0 : this.props.items}</span>
										<ShoppingCart />
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		)
	}
}

export default withRouter(Navbar);
