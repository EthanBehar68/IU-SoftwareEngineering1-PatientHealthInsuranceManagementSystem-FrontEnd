import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import empty from 'is-empty';

import { Grid, Divider, Button } from '@material-ui/core';
import { Menu, NavigateNext, NavigateBefore } from '@material-ui/icons';

import Loading from '../Graphics/Loading';

import { replaceTime } from '../../utils/options';

class CovidSurvey extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			survey: {
				id: this.props.user.id,
				symptoms: '',
				contactwithcovidperson: '',
				covidpositivetest: '',
				selfmonitor: '',
				requesttest: ''
			}
		}
	}

	componentDidMount() {
		if(empty(this.props.user.survey)) {
			this.setState({...this.state, survey: this.props.user.survey, loaded: true});
		}
	}

	onAddAppointment = async () => {
		const currentMinutes = (this.props.currentDate.getHours() * 60) + this.props.currentDate.getMinutes();
		if (this.props.starttime < currentMinutes && moment().format('MM-DD-YYYY') === moment(this.props.appointmentdate).format('MM-DD-YYYY')) {
			this.props.onError('This time is no longer available.');
		} else {
			this.setState({ ...this.state, loaded: false });
			const resp = await this.props.addAppointment({ appointmentdate: this.props.appointmentdate, starttime: this.props.starttime, did: this.props.doctor.id, pid: this.props.user.id, survey: this.state.survey });
			if (!resp.complete) {
				this.props.onError(resp.error);
			}
			this.setState({ ...this.state, loaded: true });
		}
	}

	render() {
		const { maxWidth, small, xs, theme, dark, appointments, user, appointmentdate, starttime } = this.props;
		const { loaded, survey } = this.state;

		return (
			<Fragment>
				{!loaded && (<Loading />)}
				<Grid xs={12} container item>
					<Grid xs={12} container item alignItems="center">
						<div onClick={this.props.onClose} style={{display: "flex", alignItems: "center", cursor: "pointer", marginBottom: "0.5rem", marginLeft: "-0.5rem"}}>
							<NavigateBefore style={{ fontSize: "2rem", color: "black" }}/>
							<span style={{fontSize: "0.9rem"}}>CHOOSE NEW WINDOW</span>
						</div>
					</Grid>
					<Grid xs={12} container item>
						<span style={{ fontSize: "1.5rem", fontWeight: 400, marginBottom: "0.5rem" }}>COVID-19 Survey</span>
					</Grid>
					<Grid xs={12} container item>
						<Button onClick={this.onAddAppointment} fullWidth variant="contained" color="primary">BOOK</Button>
					</Grid>
				</Grid>
			</Fragment>
		);
	}
}

export default CovidSurvey;


