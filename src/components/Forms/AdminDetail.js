import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import moment from 'moment';
import empty from 'is-empty';
import {db_update_product_active} from '../../store/actions/admin';

import Loading from '../Graphics/Loading';
import ReactJson from 'react-json-view';

class WorkerJobDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false
		};
	}

  async componentDidMount() {
  	this.setState({
  		loaded: true
  	});
  }

	render() {
		const {data, table} = this.props;

		return (
			<Fragment>
				<div className="job-overlay">
					{!this.state.loaded && (<Loading />)}
					{this.state.loaded && (<div className="overlay-box">
						<span className="close" onClick={this.props.hide}>X</span>
						<div className="overlay-content">
							{table == "products" && (<div style={{display: 'flex'}}><span>Product Active:</span><button onClick={() => {this.props.db_update_product_active({...data, active: !data.active}); this.props.hide();}}>{data.active ? "YES" : "NO"}</button></div>)}
							<ReactJson src={data} displayDataTypes={false} enableClipboard={false} displayObjectSize={false}/>
							{table == "products" && (<Fragment>
								<img className="admin-media" src={`https://pskapparel.blob.core.windows.net/${data.id}product/photo`} alt=""/>
							</Fragment>)}
						</div>
					</div>)}
				</div>
			</Fragment>
		)
	}
}

const mapStateToProps = state => ({
	user: state.auth.user
});

export default connect(mapStateToProps,{db_update_product_active})(withRouter(WorkerJobDetail));

