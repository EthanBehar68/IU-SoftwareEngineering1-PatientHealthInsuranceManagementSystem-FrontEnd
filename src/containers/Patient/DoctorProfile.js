import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import withToast from '../../utils/withToast';
import moment from 'moment';
import empty from 'is-empty';

import { TextField, Grid, MenuItem, Button, Divider, InputAdornment, Modal, Select, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { Cancel, CheckCircle } from '@material-ui/icons';

import Loading from '../../components/Graphics/Loading';
import Calendar from '../../components/Patient/Calendar';
import Review from '../../components/Patient/Review';
import Stars from '../../components/Graphics/Stars';

import { bloodtypes, getSpecializations } from '../../utils/options';

import { getDoctor, getAppointments, addAppointment } from '../../store/actions/patients';

class DoctorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      doctor: {},
      chosen: false
    };
  }

  async componentDidMount() {
    const resp = await getDoctor(this.props.doctorId);
    if (resp.complete) {
      this.setState({ ...this.state, loaded: true, doctor: resp.data });
    } else {
      this.props.onClose();
    }
  }

  onError = error => {
    this.props.addToast(error, { appearance: 'error', autoDismiss: true });
  }

  render() {
    const { maxWidth, small, xs, theme, dark, appointments, user } = this.props;
    const { loaded, doctor, chosen } = this.state;

    let arr = [];
    if (!empty(doctor)) {
      for (let key in doctor.specializations) {
        if (doctor.specializations[key] === true) arr.push(key);
      }
    }

    return (
      <Fragment>
        {!loaded && (<Loading />)}
        <Modal onClose={this.props.onClose} open={loaded} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {loaded && (<div style={{ backgroundColor: "#fff", width: `calc(${maxWidth} - 4rem)`, padding: small ? "1rem" : "2rem", position: "relative", minHeight: "75vh", maxHeight: "80vh", overflowY: "scroll", borderRadius: 6, display: "flex", flexDirection: "column", position: "relative" }}>
            <Cancel onClick={this.props.onClose} style={{ position: "absolute", right: 8, top: 8, color: "red", cursor: "pointer", fontSize: "1.5rem" }} />
            <Grid container item xs={12} alignItems="center">
              <div style={{ width: xs ? "2.5rem" : "3.5rem", height: xs ? "2.5rem" : "3.5rem", borderRadius: 3, overflow: "hidden", marginRight: "1rem" }}>
                <img src={`https://apollocare.blob.core.windows.net/doctor${doctor.id}/profile`} alt="" style={{ width: "100%", borderRadius: 3, objectFit: "cover" }} />
              </div>
              <span style={{ fontSize: xs ? "2rem" : "4rem", lineHeight: xs ? "2rem" : "3rem", fontWeight: 500 }}>{doctor.fname} {doctor.lname}</span>
            </Grid>
            <Divider style={{ width: "100%", margin: "1rem 0" }} />
            <Grid container item xs={12} style={{ position: "relative" }}>
              {!small && (<div style={{ position: chosen ? "relative" : "sticky", display: "flex", justifyContent: "flex-end", top: 0, width: "100%", height: 0 }}>
                <Grid item container xs={12} md={chosen ? 12 : 7} direction="column" style={{ paddingLeft: chosen ? "" : "1rem" }}>
                  <Calendar onChoose={() => this.setState({...this.state, chosen: !chosen})} theme={theme} appointments={appointments} getAppointments={this.props.getAppointments} user={user} doctor={doctor} addAppointment={this.props.addAppointment} onError={this.onError} />
                </Grid>
              </div>)}
              <Grid container item xs={12} md={5} direction="column" style={{ paddingRight: small ? "" : "1rem" }}>
                {!chosen && (<Fragment>
                  <span style={{ fontSize: "1.5rem", fontWeight: 400 }}>{doctor.detail.practicename}</span>
                  <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}>{doctor.detail.address1}{empty(doctor.detail.address2) ? '' : `, ${doctor.detail.address2}`}</span>
                  <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}>{doctor.detail.city}, {doctor.detail.state1} {doctor.detail.zipcode}</span>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: 400 }}>Specializations</span>
                    <span style={{ fontSize: "1rem", fontWeight: 300, display: "flex", alignItems: "center", marginTop: "0.25rem" }}>{doctor.detail.treatscovid ? <CheckCircle style={{ fontSize: "1rem", color: "green", marginRight: "0.25rem" }} /> : <Cancel style={{ fontSize: "1rem", color: "red", marginRight: "0.25rem" }} />} COVID-19 care</span>
                  </div>
                  <Divider style={{ width: "100%", margin: "0.5rem 0" }} />
                  <ul style={{ paddingInlineStart: "1.5rem", marginBlockStart: "0" }}>{getSpecializations(arr).map((item, i) => <li key={i} style={{ fontWeight: 300, fontSize: "0.9rem" }}>{item}</li>)}</ul>
                </Fragment>)}
                {small && (<Grid item container xs={12} direction="column" style={{ paddingLeft: small ? "" : "1rem" }}>
                  <Calendar appointments={appointments} getAppointments={this.props.getAppointments} user={user} doctor={doctor} addAppointment={this.props.addAppointment} onError={this.onError} />
                </Grid>)}
                {!chosen && (<Fragment>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: small ? "2rem" : "1rem" }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: 400 }}>Reviews</span>
                    <Stars style={{ marginBottom: "-0.2rem" }} rating={parseFloat(doctor.reviews.map(r => r.rating).reduce((a,b) => a + b, 0)) / parseFloat(doctor.reviews.length)} number={doctor.reviews.length} />
                  </div>
                  <Divider style={{ width: "100%", marginTop: "0.5rem" }} />
                  {doctor.reviews.map((review, i) => (
                    <Review key={i} review={review} />
                  ))}
                </Fragment>)}
              </Grid>
            </Grid>
          </div>)}
        </Modal>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  dark: state.dark,
  user: state.user,
  appointments: state.appointments
});

export default connect(mapStateToProps, { getAppointments, addAppointment })(withRouter(withToast(DoctorProfile)));
