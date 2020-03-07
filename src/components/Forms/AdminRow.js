import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import moment from 'moment';
import empty from 'is-empty';

class AdminRow extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	setDetail = e => {
		e.preventDefault();
		this.props.onClick(this.props.data);
	}

	render() {
		const {data, table, small} = this.props;
		return (
			<Fragment>
				{table == "products" && (<tr className="find-row" onClick={this.setDetail}>
					<td>{data.id}</td>
					<td><img src={`https://pskapparel.blob.core.windows.net/${this.props.data.id}product/photo`} className="product-row-photo"/></td>
					<td>{data.name}</td>
					<td>${(data.price / 100).toFixed(2)}</td>
					<td>{data.active ? "YES" : "NO"}</td>
				</tr>)}
				{table == "orders" && (<tr className="find-row" onClick={this.setDetail}>
					<td style={small ? {display: "none"} : {}}>{data.id}</td>
					<td>{data.trans.name}</td>
					<td>{data.product.name}</td>
					<td>{data.quantity}</td>
					<td>{data.size}</td>
					<td style={small ? {display: "none"} : {}}>${((data.quantity * data.product.price) / 100).toFixed(2)}</td>
					<td style={small ? {display: "none"} : {}}>{data.trans.org}</td>
				</tr>)}
			</Fragment>
		)
	}
}

const mapStateToProps = state => ({
  
});

export default withRouter(AdminRow);
