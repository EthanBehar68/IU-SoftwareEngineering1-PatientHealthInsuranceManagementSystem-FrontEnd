import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import getTime from '../../utils/getTime';
import withToast from '../../utils/withToast';
import moment from 'moment';
import empty from 'is-empty';

import {Divider, Grid, Button} from '@material-ui/core';
import {ChevronRight, CheckCircle, Cancel} from '@material-ui/icons';

import Loading from '../Graphics/Loading';

class SearchCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: true
		};
	}

	onSubmit = async () => {
		this.setState({...this.state, loaded: false});
		const {user, plan} = this.props;
		const resp = empty(user.insurance) ? await this.props.addPlan({id: user.id, planid: plan.id}) : await this.props.updatePlan({id: user.id, planid: plan.id});
		if(resp.complete) {
			this.setState({...this.state, loaded: true});
			window.scrollTo(0, 0);
		} else {
			this.setState({...this.state, loaded: true});
			this.props.addToast(resp.error, {appearance: "error", autoDismiss: true});
		}
	}

	onDelete = async () => {
		this.setState({...this.state, loaded: false});
		const {user, plan} = this.props;
		const resp = await this.props.updatePlan({id: user.id, planid: null});
		if(resp.complete) {
			this.setState({...this.state, loaded: true});
			window.scrollTo(0, 0);
		} else {
			this.setState({...this.state, loaded: true});
			this.props.addToast(resp.error, {appearance: "error", autoDismiss: true});
		}
	}

	render() {
		const {plan, theme, small, xs, filter, user} = this.props;
		const {loaded} = this.state;

		return (
			<Fragment>
				{!loaded && (<Loading />)}
				<Grid item container xs={12} style={{position: "relative", padding: "1rem", background: "rgb(238, 238, 238)", width: "100%"}}>
					<Grid item container xs={12}>
						<Grid item container xs={12}>
							<div style={{display: "flex", flexDirection: "column", width: "100%"}}>
								<span style={{width: "100%", fontSize: "2rem", color: "black", fontWeight: 500}}>{plan.companyname}</span>
							</div>
						</Grid>
						<Grid item container xs={12}>
							<div style={{display: "flex", flexDirection: "column", width: "100%"}}>
								<span style={{width: "100%", fontSize: "1.5rem", color: "black"}}>{plan.planname}</span>
							</div>
						</Grid>
						<Grid item container xs={6} md={3}>
							<div style={{display: "flex", flexDirection: "column", width: "100%"}}>
								<span style={{fontWeight: 300, width: "100%", marginTop: "0.15rem", color: "black", fontSize: "1.1rem"}}>{plan.policynumber}</span>
								<span style={{fontWeight: 300, width: "100%", marginTop: "0.15rem", color: "black", fontSize: "1.1rem"}}>Premium: ${plan.premium.toFixed(2)}</span>
								<span style={{fontWeight: 300, width: "100%", marginTop: "0.15rem", color: "black", fontSize: "1.1rem"}}>Deductible: ${plan.deductible.toFixed(2)}</span>
							</div>
						</Grid>
						<Grid item container xs={6} md={3}>
							<div style={{display: "flex", flexDirection: "column", width: "100%"}}>
								<span style={{fontSize: "1.1rem", fontWeight: 300, marginTop: "0.15rem", display: "flex", alignItems: "center"}}>{plan.includesmedical ? <CheckCircle style={{fontSize: "1rem", color: "green", marginRight: "0.25rem"}}/> : <Cancel style={{fontSize: "1rem", color: "red", marginRight: "0.25rem"}}/>} Medical</span>
								<span style={{fontSize: "1.1rem", fontWeight: 300, marginTop: "0.15rem", display: "flex", alignItems: "center"}}>{plan.includesdental ? <CheckCircle style={{fontSize: "1rem", color: "green", marginRight: "0.25rem"}}/> : <Cancel style={{fontSize: "1rem", color: "red", marginRight: "0.25rem"}}/>} Dental</span>
								<span style={{fontSize: "1.1rem", fontWeight: 300, marginTop: "0.15rem", display: "flex", alignItems: "center"}}>{plan.includesvision ? <CheckCircle style={{fontSize: "1rem", color: "green", marginRight: "0.25rem"}}/> : <Cancel style={{fontSize: "1rem", color: "red", marginRight: "0.25rem"}}/>} Vision</span>
							</div>
						</Grid>
					</Grid>
					<div style={{display: "flex", alignItems: "flex-end", justifyContent: "flex-end", flexDirection: "column", position: "absolute", right: 0, height: "100%", bottom: 0, padding: "1rem"}}>
						<Button disabled={empty(user.insurance) ? false : user.insurance.id === plan.id} onClick={this.onSubmit} variant="contained" color="secondary">{empty(user.insurance) ? 'CHOOSE' : user.insurance.id === plan.id ? 'MY PLAN' : 'SWITCH'}</Button>
						{!empty(user.insurance) && (<Fragment>{user.insurance.id === plan.id && (<Button style={{marginTop: "0.5rem"}} onClick={this.onDelete} variant="contained" color="primary">REMOVE</Button>)}</Fragment>)}
					</div>
				</Grid>
				<Divider />
			</Fragment>
		)
	}
}

export default withRouter(withToast(SearchCard));

