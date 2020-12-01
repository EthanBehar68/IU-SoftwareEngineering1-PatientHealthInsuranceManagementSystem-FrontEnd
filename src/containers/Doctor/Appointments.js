import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import withToast from '../../utils/withToast';
import moment from 'moment';
import empty from 'is-empty';

import { Grid, Divider, Button } from '@material-ui/core';
import { Menu, NavigateNext, NavigateBefore } from '@material-ui/icons';

import Loading from '../../components/Graphics/Loading';

import { addWeekday } from '../../utils/addWeekday';
import { replaceTime } from '../../utils/options';

import { getAppointments } from '../../store/actions/doctors';

class Appointments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			offset: 0,
			currentDate: new Date()
		}
	}

	async componentDidMount() {
		await this.props.getAppointments(this.props.user.id, moment.utc().format('MM-DD-YYYY'));
		this.setState({ ...this.state, loaded: true });
	}

	onChangeWeek = async next => {
		const { offset } = this.state;
		this.setState({ ...this.state, loaded: false });
		const resp = await this.props.getAppointments(this.props.user.id, addWeekday(this.state.currentDate, next ? offset + 5 : offset - 5).format('MM-DD-YYYY'));
		if (resp.complete) {
			this.setState({ ...this.state, offset: next ? offset + 5 : offset - 5, loaded: true });
		} else {
			this.setState({ ...this.state, loaded: true });
		}
	}

	render() {
		const { maxWidth, small, xs, theme, dark, appointments, user } = this.props;
		const { loaded, offset, currentDate } = this.state;

		const currentMinutes = (currentDate.getHours() * 60) + currentDate.getMinutes();

		return (
			<Fragment>
				{!loaded && (<Loading />)}
				<Grid item container xs={12} direction="column" alignItems="center" style={{ backgroundColor: theme.background.main, minHeight: "calc(100vh - 4rem)" }}>
					<Grid xs={12} item container direction="column" alignItems="center" style={{ height: "100%", background: theme.primary.main }}>
	          <Grid item container xs={12} style={{ width: maxWidth, padding: small ? "1rem" : "2rem 0 1rem" }}>
	            <Grid item container xs={12} style={{ margin: "1rem 0 0.75rem" }}>
	              <span style={{ fontSize: "2rem", color: 'white', fontWeight: 500 }}>My Schedule</span>
	            </Grid>
	          </Grid>
	          <Divider />
	        </Grid>
          <Grid item container direction="column" style={{width: maxWidth, padding: small ? "2rem 1rem" : "2rem 0", height: "100%", position: "relative"}}>
            <Grid xs={12} container item>
							<Grid xs={12} container item justify="space-between" style={{marginBottom: "0.5rem"}}>
								<span style={{fontSize: "1.2rem"}}>{addWeekday(currentDate, offset).format('ddd, M/D')} - {addWeekday(currentDate, offset + 4).format('ddd, M/D')}</span>
								<div style={{ display: "flex", alignItems: "center"}}>
									{(offset > 0) && (<NavigateBefore onClick={() => this.onChangeWeek(false)} style={{ fontSize: "2rem", marginRight: "0.5rem", cursor: "pointer", color: "black" }} />)}
									<NavigateNext onClick={() => this.onChangeWeek(true)} style={{ fontSize: "2rem", cursor: "pointer", color: "black" }} />
								</div>
							</Grid>
							<Grid container item xs={2} direction="column" style={{ borderRight: "1px solid #ddd" }}>
								<div style={{ display: "flex", height: '6rem', alignItems: 'center', position: "relative" }}>
									<span style={{ fontWeight: 300, fontSize: "0.8rem", flex: 1 }}>9 am</span>
									<Divider style={{ flex: 1 }} />
									<Divider style={{ width: "25%", position: "absolute", right: 0, bottom: 0 }} />
								</div>
								<div style={{ display: "flex", height: '6rem', alignItems: 'center', position: "relative" }}>
									<span style={{ fontWeight: 300, fontSize: "0.8rem", flex: 1 }}>10 am</span>
									<Divider style={{ flex: 1 }} />
									<Divider style={{ width: "25%", position: "absolute", right: 0, bottom: 0 }} />
								</div>
								<div style={{ display: "flex", height: "6rem", alignItems: 'center', position: "relative" }}>
									<span style={{ fontWeight: 300, fontSize: "0.8rem", flex: 1 }}>11 am</span>
									<Divider style={{ flex: 1 }} />
									<Divider style={{ width: "25%", position: "absolute", right: 0, bottom: 0 }} />
								</div>
								<div style={{ display: "flex", height: "6rem", alignItems: 'center', position: "relative" }}>
									<span style={{ fontWeight: 300, fontSize: "0.8rem", flex: 1 }}>12 pm</span>
									<Divider style={{ flex: 1 }} />
									<Divider style={{ width: "25%", position: "absolute", right: 0, bottom: 0 }} />
								</div>
								<div style={{ display: "flex", height: "6rem", alignItems: 'center', position: "relative" }}>
									<span style={{ fontWeight: 300, fontSize: "0.8rem", flex: 1 }}>1 pm</span>
									<Divider style={{ flex: 1 }} />
									<Divider style={{ width: "25%", position: "absolute", right: 0, bottom: 0 }} />
								</div>
								<div style={{ display: "flex", height: "6rem", alignItems: 'center', position: "relative" }}>
									<span style={{ fontWeight: 300, fontSize: "0.8rem", flex: 1 }}>2 pm</span>
									<Divider style={{ flex: 1 }} />
									<Divider style={{ width: "25%", position: "absolute", right: 0, bottom: 0 }} />
								</div>
								<div style={{ display: "flex", height: "6rem", alignItems: 'center', position: "relative" }}>
									<span style={{ fontWeight: 300, fontSize: "0.8rem", flex: 1 }}>3 pm</span>
									<Divider style={{ flex: 1 }} />
									<Divider style={{ width: "25%", position: "absolute", right: 0, bottom: 0 }} />
								</div>
								<div style={{ display: "flex", height: "6rem", alignItems: 'center', position: "relative" }}>
									<span style={{ fontWeight: 300, fontSize: "0.8rem", flex: 1 }}>4 pm</span>
									<Divider style={{ flex: 1 }} />
									<Divider style={{ width: "25%", position: "absolute", right: 0, bottom: 0 }} />
								</div>
								<div style={{ display: "flex", height: "3rem", alignItems: 'flex-end', position: "relative" }}>
									<span style={{ fontWeight: 300, fontSize: "0.8rem", flex: 1, marginBottom: "-0.4rem" }}>5 pm</span>
									<Divider style={{ flex: 1 }} />
								</div>
							</Grid>
							<Grid container item xs={2} direction="column" style={{ borderRight: "1px solid #ddd", position: "relative" }}>
								<Divider style={{ width: "100%", position: "absolute", right: 0, bottom: 0, color: "#ddd" }} />
								<div style={{ borderBottom: "1px solid #ddd", borderTop: "1px solid #ddd", display: "flex", justifyContent: "center", alignItems: "center", height: "calc(3rem - 2px)" }}>
									<span style={{ fontWeight: 300, fontSize: "0.8rem" }}>{addWeekday(currentDate, offset).format('ddd, M/D')}</span>
								</div>
								{replaceTime(appointments.filter(item => moment.utc(item.appointmentdate).format('MM-DD-YYYY') === addWeekday(currentDate, offset).format('MM-DD-YYYY'))).map((row, i) => (
									<Fragment key={i}>
										{row.pid && (<Link to={`/appointments/${row.id}`} style={{width: "100%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", background: i % 2 === 0 ? "#f2f2f2" : "white", height: "2rem", padding: "0.5rem 0"}}>
											<span style={{ fontSize: "0.8rem", fontWeight: 500 }}>{row.patient.fname} {row.patient.lname}</span>
											<div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
												<div style={{height: "0.75rem", width: "0.75rem", borderRadius: "50%", backgroundColor: (row.patient.survey.symptoms || row.patient.survey.covidpositivetest) ? 'red' : (row.patient.survey.contactwithcovidperson || row.patient.survey.selfmonitor) ? 'orange' : 'green'}}/>
												<span style={{fontSize: "0.8rem", fontWeight: 300, marginLeft: "0.25rem"}}>COVID-19</span>
											</div>
										</Link>)}
										{!row.pid && (<div style={{ borderRadius: "0em", height: "2rem", background: i % 2 === 0 ? "#f2f2f2" : "white", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem 0" }}>
											<span style={{ fontSize: "0.8rem", fontWeight: 300, color: "#888888" }}>OPEN</span>
										</div>)}
									</Fragment>
								))}
							</Grid>
							<Grid container item xs={2} direction="column" style={{ borderRight: "1px solid #ddd", position: "relative" }}>
								<Divider style={{ width: "100%", position: "absolute", right: 0, bottom: 0, color: "#ddd" }} />
								<div style={{ borderBottom: "1px solid #ddd", borderTop: "1px solid #ddd", display: "flex", justifyContent: "center", alignItems: "center", height: "calc(3rem - 2px)" }}>
									<span style={{ fontWeight: 300, fontSize: "0.8rem" }}>{addWeekday(currentDate, offset + 1).format('ddd, M/D')}</span>
								</div>
								{replaceTime(appointments.filter(item => moment.utc(item.appointmentdate).format('MM-DD-YYYY') === addWeekday(currentDate, offset + 1).format('MM-DD-YYYY'))).map((row, i) => (
									<Fragment key={i}>
										{row.pid && (<Link to={`/appointments/${row.id}`} style={{width: "100%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", background: i % 2 === 0 ? "#f2f2f2" : "white", height: "2rem", padding: "0.5rem 0"}}>
											<span style={{ fontSize: "0.8rem", fontWeight: 500 }}>{row.patient.fname} {row.patient.lname}</span>
											<div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
												<div style={{height: "0.75rem", width: "0.75rem", borderRadius: "50%", backgroundColor: (row.patient.survey.symptoms || row.patient.survey.covidpositivetest) ? 'red' : (row.patient.survey.contactwithcovidperson || row.patient.survey.selfmonitor) ? 'orange' : 'green'}}/>
												<span style={{fontSize: "0.8rem", fontWeight: 300, marginLeft: "0.25rem"}}>COVID-19</span>
											</div>
										</Link>)}
										{!row.pid && (<div style={{ borderRadius: "0em", height: "2rem", background: i % 2 === 0 ? "#f2f2f2" : "white", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem 0" }}>
											<span style={{ fontSize: "0.8rem", fontWeight: 300, color: "#888888" }}>OPEN</span>
										</div>)}
									</Fragment>
								))}
							</Grid>
							<Grid container item xs={2} direction="column" style={{ borderRight: "1px solid #ddd", position: "relative" }}>
								<Divider style={{ width: "100%", position: "absolute", right: 0, bottom: 0, color: "#ddd" }} />
								<div style={{ borderBottom: "1px solid #ddd", borderTop: "1px solid #ddd", display: "flex", justifyContent: "center", alignItems: "center", height: "calc(3rem - 2px)" }}>
									<span style={{ fontWeight: 300, fontSize: "0.8rem" }}>{addWeekday(currentDate, offset + 2).format('ddd, M/D')}</span>
								</div>
								{replaceTime(appointments.filter(item => moment.utc(item.appointmentdate).format('MM-DD-YYYY') === addWeekday(currentDate, offset + 2).format('MM-DD-YYYY'))).map((row, i) => (
									<Fragment key={i}>
										{row.pid && (<Link to={`/appointments/${row.id}`} style={{width: "100%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", background: i % 2 === 0 ? "#f2f2f2" : "white", height: "2rem", padding: "0.5rem 0"}}>
											<span style={{ fontSize: "0.8rem", fontWeight: 500 }}>{row.patient.fname} {row.patient.lname}</span>
											<div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
												<div style={{height: "0.75rem", width: "0.75rem", borderRadius: "50%", backgroundColor: (row.patient.survey.symptoms || row.patient.survey.covidpositivetest) ? 'red' : (row.patient.survey.contactwithcovidperson || row.patient.survey.selfmonitor) ? 'orange' : 'green'}}/>
												<span style={{fontSize: "0.8rem", fontWeight: 300, marginLeft: "0.25rem"}}>COVID-19</span>
											</div>
										</Link>)}
										{!row.pid && (<div style={{ borderRadius: "0em", height: "2rem", background: i % 2 === 0 ? "#f2f2f2" : "white", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem 0" }}>
											<span style={{ fontSize: "0.8rem", fontWeight: 300, color: "#888888" }}>OPEN</span>
										</div>)}
									</Fragment>
								))}
							</Grid>
							<Grid container item xs={2} direction="column" style={{ borderRight: "1px solid #ddd", position: "relative" }}>
								<Divider style={{ width: "100%", position: "absolute", right: 0, bottom: 0, color: "#ddd" }} />
								<div style={{ borderBottom: "1px solid #ddd", borderTop: "1px solid #ddd", display: "flex", justifyContent: "center", alignItems: "center", height: "calc(3rem - 2px)" }}>
									<span style={{ fontWeight: 300, fontSize: "0.8rem" }}>{addWeekday(currentDate, offset + 3).format('ddd, M/D')}</span>
								</div>
								{replaceTime(appointments.filter(item => moment.utc(item.appointmentdate).format('MM-DD-YYYY') === addWeekday(currentDate, offset + 3).format('MM-DD-YYYY'))).map((row, i) => (
									<Fragment key={i}>
										{row.pid && (<Link to={`/appointments/${row.id}`} style={{width: "100%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", background: i % 2 === 0 ? "#f2f2f2" : "white", height: "2rem", padding: "0.5rem 0"}}>
											<span style={{ fontSize: "0.8rem", fontWeight: 500 }}>{row.patient.fname} {row.patient.lname}</span>
											<div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
												<div style={{height: "0.75rem", width: "0.75rem", borderRadius: "50%", backgroundColor: (row.patient.survey.symptoms || row.patient.survey.covidpositivetest) ? 'red' : (row.patient.survey.contactwithcovidperson || row.patient.survey.selfmonitor) ? 'orange' : 'green'}}/>
												<span style={{fontSize: "0.8rem", fontWeight: 300, marginLeft: "0.25rem"}}>COVID-19</span>
											</div>
										</Link>)}
										{!row.pid && (<div style={{ borderRadius: "0em", height: "2rem", background: i % 2 === 0 ? "#f2f2f2" : "white", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem 0" }}>
											<span style={{ fontSize: "0.8rem", fontWeight: 300, color: "#888888" }}>OPEN</span>
										</div>)}
									</Fragment>
								))}
							</Grid>
							<Grid container item xs={2} direction="column" style={{ borderRight: "1px solid #ddd", position: "relative" }}>
								<Divider style={{ width: "100%", position: "absolute", right: 0, bottom: 0, color: "#ddd" }} />
								<div style={{ borderBottom: "1px solid #ddd", borderTop: "1px solid #ddd", display: "flex", justifyContent: "center", alignItems: "center", height: "calc(3rem - 2px)" }}>
									<span style={{ fontWeight: 300, fontSize: "0.8rem" }}>{addWeekday(currentDate, offset + 4).format('ddd, M/D')}</span>
								</div>
								{replaceTime(appointments.filter(item => moment.utc(item.appointmentdate).format('MM-DD-YYYY') === addWeekday(currentDate, offset + 4).format('MM-DD-YYYY'))).map((row, i) => (
									<Fragment key={i}>
										{row.pid && (<Link to={`/appointments/${row.id}`} style={{width: "100%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", background: i % 2 === 0 ? "#f2f2f2" : "white", height: "2rem", padding: "0.5rem 0"}}>
											<span style={{ fontSize: "0.8rem", fontWeight: 500 }}>{row.patient.fname} {row.patient.lname}</span>
											<div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
												<div style={{height: "0.75rem", width: "0.75rem", borderRadius: "50%", backgroundColor: (row.patient.survey.symptoms || row.patient.survey.covidpositivetest) ? 'red' : (row.patient.survey.contactwithcovidperson || row.patient.survey.selfmonitor) ? 'orange' : 'green'}}/>
												<span style={{fontSize: "0.8rem", fontWeight: 300, marginLeft: "0.25rem"}}>COVID-19</span>
											</div>
										</Link>)}
										{!row.pid && (<div style={{ borderRadius: "0em", height: "2rem", background: i % 2 === 0 ? "#f2f2f2" : "white", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem 0" }}>
											<span style={{ fontSize: "0.8rem", fontWeight: 300, color: "#888888" }}>OPEN</span>
										</div>)}
									</Fragment>
								))}
							</Grid>
						</Grid>
          </Grid>
          <Grid xs={12} item container direction="column" alignItems="center" style={{ height: "100%", marginBottom: "1rem"}}>
	          <Grid item container xs={12} direction="column" style={{ width: maxWidth, padding: "0.5rem 0"}}>
	            <span style={{ fontSize: "1.3rem", fontWeight: 300, marginBottom: "0.4rem" }}>COVID-19 Scale</span>
	            <div style={{display: "flex", alignItems: "center"}}>
	            	<div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
									<div style={{height: "0.75rem", width: "0.75rem", borderRadius: "50%", backgroundColor: 'red'}}/>
									<span style={{fontSize: "0.8rem", fontWeight: 300, marginLeft: "0.25rem"}}>Has COVID-19</span>
								</div>
								<div style={{display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "0.5rem"}}>
									<div style={{height: "0.75rem", width: "0.75rem", borderRadius: "50%", backgroundColor: 'orange'}}/>
									<span style={{fontSize: "0.8rem", fontWeight: 300, marginLeft: "0.25rem"}}>Chance of COVID-19</span>
								</div>
								<div style={{display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "0.5rem"}}>
									<div style={{height: "0.75rem", width: "0.75rem", borderRadius: "50%", backgroundColor: 'green'}}/>
									<span style={{fontSize: "0.8rem", fontWeight: 300, marginLeft: "0.25rem"}}>Likely COVID-19 negative</span>
								</div>
	            </div>
	          </Grid>
	        </Grid>
        </Grid>
			</Fragment>
		);
	}
}


const mapStateToProps = state => ({
  user: state.user,
  appointments: state.appointments
});

export default connect(mapStateToProps, { getAppointments })(withRouter(withToast(Appointments)));

