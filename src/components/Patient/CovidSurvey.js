import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import empty from 'is-empty';

import { Grid, Divider, Button } from '@material-ui/core';
import { Menu, NavigateNext, NavigateBefore } from '@material-ui/icons';

import Loading from '../Graphics/Loading';
import YesNo from '../Inputs/YesNo';

import getTime from '../../utils/getTime';

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
		this.setState({...this.state, loaded: true});
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
			} else {
				this.props.onClose();
			}
			this.setState({ ...this.state, loaded: true });
		}
	}

	render() {
		const { maxWidth, small, xs, theme, dark, appointments, user, appointmentdate, starttime, doctor } = this.props;
		const { loaded, survey } = this.state;

		const bookBtn = !empty(survey.symptoms) && !empty(survey.contactwithcovidperson) && !empty(survey.covidpositivetest) && !empty(survey.selfmonitor) && !empty(survey.requesttest);

		return (
			<Fragment>
				{!loaded && (<Loading />)}
				<Grid xs={12} container item>
					<Grid xs={12} container item direction="column" style={{overflowY: "scroll"}}>
						<Grid xs={12} container item alignItems="center">
							<div onClick={this.props.onClose} style={{display: "flex", alignItems: "center", cursor: "pointer", marginBottom: "0.5rem", marginLeft: "-0.5rem"}}>
								<NavigateBefore style={{ fontSize: "2rem", color: "black" }}/>
								<span style={{fontSize: "0.9rem"}}>CHOOSE NEW TIME WINDOW</span>
							</div>
						</Grid>
						<Grid xs={12} container item>
							<span style={{ fontSize: "1.5rem", fontWeight: 400, marginBottom: "0.5rem" }}>COVID-19 Survey</span>
							<Divider style={{width: "100%", marginBottom: "0.75rem"}}/>
						</Grid>
						<Grid xs={12} container item direction="column">
							<span style={{fontSize: "1.1rem"}}>Have you experienced any of the following in the past 48 hours:</span>
							<ol>
								<li style={{fontSize: "0.9rem"}}>fever or chills</li>
								<li style={{fontSize: "0.9rem"}}>cough</li>
								<li style={{fontSize: "0.9rem"}}>shortness of breath or difficulty breathing</li>
								<li style={{fontSize: "0.9rem"}}>fatigue</li>
								<li style={{fontSize: "0.9rem"}}>muscle or body aches</li>
								<li style={{fontSize: "0.9rem"}}>headache</li>
								<li style={{fontSize: "0.9rem"}}>new loss of taste or smell</li>
								<li style={{fontSize: "0.9rem"}}>sore throat</li>
								<li style={{fontSize: "0.9rem"}}>congestion or runny nose</li>
								<li style={{fontSize: "0.9rem"}}>nausea or vomiting</li>
								<li style={{fontSize: "0.9rem"}}>diarrhea</li>
							</ol>
							<YesNo style={{marginBottom: "1rem"}} color={theme.secondary.main} value={survey.symptoms} onClick={val => this.setState({...this.state, survey: {...survey, symptoms: val}})}/>
						</Grid>
						<Grid xs={12} container item direction="column">
							<span style={{fontSize: "1.1rem"}}>Within the past 14 days, have you been in close physical contact (6 feet or closer for a cumulative total of 15 minutes) with:</span>
							<ol>
								<li style={{fontSize: "0.9rem"}}>Anyone who is known to have laboratory-confirmed COVID-19?</li>
								<li style={{fontSize: "0.9rem"}}>Anyone who has any symptoms consistent with COVID-19?</li>
							</ol>
							<YesNo style={{marginBottom: "1rem"}} color={theme.secondary.main} value={survey.contactwithcovidperson} onClick={val => this.setState({...this.state, survey: {...survey, contactwithcovidperson: val}})}/>
						</Grid>
						<Grid xs={12} container item direction="column">
							<span style={{fontSize: "1.1rem"}}>Have you had a COVID-19 positive test in the last 90 days?</span>
							<YesNo style={{margin: "0.75rem 0 1rem"}} color={theme.secondary.main} value={survey.covidpositivetest} onClick={val => this.setState({...this.state, survey: {...survey, covidpositivetest: val}})}/>
						</Grid>
						<Grid xs={12} container item direction="column">
							<span style={{fontSize: "1.1rem"}}>Within the past 14 days has a public health or medical professional told you to self-moniter, self-isolate, or self-quarantine because of concerns about COVID-19 infection?</span>
							<YesNo style={{margin: "0.75rem 0 1rem"}} color={theme.secondary.main} value={survey.selfmonitor} onClick={val => this.setState({...this.state, survey: {...survey, selfmonitor: val}})}/>
						</Grid>
						<Grid xs={12} container item direction="column">
							<span style={{fontSize: "1.1rem"}}>Would you like a COVID-19 test?</span>
							<YesNo style={{margin: "0.75rem 0 1rem"}} color={theme.secondary.main} value={survey.requesttest} onClick={val => this.setState({...this.state, survey: {...survey, requesttest: val}})}/>
						</Grid>
						<Grid xs={12} container item>
							<span style={{ fontSize: "1.5rem", fontWeight: 400, marginBottom: "0.5rem" }}>Appointment Details</span>
							<Divider style={{width: "100%", marginBottom: "0.75rem"}}/>
						</Grid>
						<Grid xs={12} container item direction="column">
							<span style={{fontSize: "0.9rem"}}>Doctor: {doctor.fname} {doctor.lname}</span>
							<span style={{fontSize: "0.9rem"}}>Practice: {doctor.detail.practicename}</span>
							<span style={{fontSize: "0.9rem"}}>Date: {moment(appointmentdate).format('MMM Do, YYYY')}</span>
							<span style={{fontSize: "0.9rem"}}>Time: {getTime(starttime)}</span>
						</Grid>
						<Grid xs={12} container item style={{margin: "1rem 0 2rem"}}>
							<Button onClick={this.onAddAppointment} fullWidth variant="contained" color="primary" disabled={!bookBtn}>BOOK APPOINTMENT</Button>
						</Grid>
					</Grid>
				</Grid>
			</Fragment>
		);
	}
}

export default CovidSurvey;


