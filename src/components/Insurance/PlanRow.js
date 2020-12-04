import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import getTime from '../../utils/getTime';
import moment from 'moment';
import empty from 'is-empty';

import {Divider, Grid} from '@material-ui/core';
import {ChevronRight, CheckCircle, Cancel} from '@material-ui/icons';

class PlanRow extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		const {plan, theme, small, xs, filter, user} = this.props;

		return (
			<Link to={`/insurance/plans/${plan.id}`} style={{width: "100%"}}>
				<Grid item container xs={12} style={{position: "relative", padding: "1rem", background: "rgb(238, 238, 238)"}}>
					<Grid item container xs={12}>
						<Grid item container xs={12}>
							<div style={{display: "flex", flexDirection: "column", width: "100%"}}>
								<span style={{width: "100%", fontSize: "2rem", color: "black"}}>{plan.planname}</span>
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
					<div style={{display: "flex", alignItems: xs ? "flex-end" : "center", position: "absolute", right: 0, height: "100%", bottom: 0}}>
						<ChevronRight style={{fontSize: "3rem", marginRight: "0.5rem", marginBottom: xs ? "0.5rem" : "", color: "black"}}/>
					</div>
					{!empty(plan.patientcount) && (<div style={{display: "flex", alignItems: xs ? "flex-end" : "center", position: "absolute", right: "4rem", height: "100%", bottom: 0}}>
						<div style={{height: "2rem", borderRadius: 50000, backgroundColor: "red", display: "flex", justifyContent: "center", alignItems: "center", padding: "0 1rem"}}>
							<span style={{fontSize: "1.1rem", color: "white", fontWeight: 500}}>{plan.patientcount} client{plan.patientcount === 1 ? '' : 's'}</span>
						</div>
					</div>)}
				</Grid>
				<Divider />
			</Link>
		)
	}
}

export default withRouter(PlanRow);