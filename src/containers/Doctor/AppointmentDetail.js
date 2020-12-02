import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import withToast from '../../utils/withToast';
import moment from 'moment';
import empty from 'is-empty';

import { TextField, Grid, MenuItem, Button, Divider, withWidth, InputAdornment, Select } from '@material-ui/core';
import { CheckCircle, Cancel, NavigateBefore } from '@material-ui/icons';

import Loading from '../../components/Graphics/Loading';
import Chat from '../../components/Patient/Chat';

import { getSpecializations } from '../../utils/options';

class AppointmentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true
    };
  }

  render() {
    const { maxWidth, small, xs, theme, dark, user, appointment } = this.props;
    const { loaded } = this.state;

    const patient = appointment.patient;

    return (
      <Grid xs={12} container item style={{minHeight: "calc(100vh - 4rem)"}}>
        {!loaded && (<Loading />)}
        <Grid xs={12} container item alignItems="center">
          <div onClick={() => this.props.history.goBack()} style={{display: "flex", alignItems: "center", cursor: "pointer", marginBottom: "0.5rem", marginLeft: "-0.5rem"}}>
            <NavigateBefore style={{ fontSize: "2rem", color: "black" }}/>
            <span style={{fontSize: "0.9rem"}}>BACK</span>
          </div>
        </Grid>
        <Grid container item xs={12} alignItems="center">
          <div style={{ width: xs ? "2.5rem" : "3.5rem", height: xs ? "2.5rem" : "3.5rem", borderRadius: 3, overflow: "hidden", marginRight: "1rem" }}>
            <img src={`https://apollocare.blob.core.windows.net/patient${patient.id}/profile`} alt="" style={{ width: "100%", borderRadius: 3, objectFit: "cover" }} />
          </div>
          <span style={{ fontSize: xs ? "2rem" : "4rem", lineHeight: xs ? "2rem" : "3rem", fontWeight: 500 }}>{patient.fname} {patient.lname}</span>
        </Grid>
        <Divider style={{ width: "100%", margin: "1rem 0" }} />
        <Grid container item xs={12} style={{ position: "relative" }}>
          {!small && (<div style={{ position: "relative", display: "flex", justifyContent: "flex-end", top: 0, width: "100%", height: 0 }}>
            <Grid item container xs={12} md={6} direction="column" style={{ paddingLeft: "1rem" }}>
              <Chat theme={theme} appointment={appointment} otherUser={appointment.patient.fname}/>
            </Grid>
          </div>)}
          <Grid container item xs={12} md={6} direction="column" style={{ paddingRight: small ? "" : "1rem" }}>
            <Fragment>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 400 }}>Personal Information</span>
              </div>
              <Divider style={{ width: "100%", margin: "0.5rem 0" }} />
            </Fragment>
            <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}><span style={{fontWeight: 400}}>Name: </span>{patient.fname} {patient.lname}</span>
            <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}><span style={{fontWeight: 400}}>Email: </span>{patient.email}</span>
            <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}><span style={{fontWeight: 400}}>Phone: </span>{patient.phonenumber}</span>
            <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}><span style={{fontWeight: 400}}>Home location: </span>{patient.detail.city}, {patient.detail.state1}</span>
            <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}><span style={{fontWeight: 400}}>Birthdate: </span>{patient.detail.birthdate}</span>
            <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}><span style={{fontWeight: 400}}>Sex: </span>{patient.detail.sex}</span>
            <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}><span style={{fontWeight: 400}}>Height: </span>{patient.detail.height}</span>
            <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}><span style={{fontWeight: 400}}>Weight: </span>{patient.detail.weight1} lbs</span>
            <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}><span style={{fontWeight: 400}}>Blood type: </span>{patient.detail.bloodtype}</span>
            <Fragment>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 400 }}>Behavioral Information</span>
              </div>
              <Divider style={{ width: "100%", margin: "0.5rem 0" }} />
            </Fragment>
            <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}><span style={{fontWeight: 400}}>Smoke: </span>{patient.detail.smoke ? "YES" : "NO"} {patient.detail.smoke ? `- ${patient.detail.smokefreq} times per week` : ""}</span>
            <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}><span style={{fontWeight: 400}}>Drink: </span>{patient.detail.drink ? "YES" : "NO"} {patient.detail.drink ? `- ${patient.detail.drinkfreq} times per week` : ""}</span>
            <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}><span style={{fontWeight: 400}}>Caffeine: </span>{patient.detail.caffeine ? "YES" : "NO"} {patient.detail.caffeine ? `- ${patient.detail.caffeinefreq} times per week` : ""}</span>
            <Fragment>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 400 }}>COVID-19 Information</span>
              </div>
              <Divider style={{ width: "100%", margin: "0.5rem 0" }} />
            </Fragment>
            <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}><span style={{fontWeight: 400}}>Survey date: </span>{patient.survey.surveydate}</span>
            <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}><span style={{fontWeight: 400}}>Positive test: </span>{patient.survey.covidpositivetest ? "YES" : "NO"}</span>
            <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}><span style={{fontWeight: 400}}>Symptoms: </span>{patient.survey.symptoms ? "YES" : "NO"}</span>
            <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}><span style={{fontWeight: 400}}>Contact with positive individual: </span>{patient.survey.contactwithcovidperson ? "YES" : "NO"}</span>
            <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}><span style={{fontWeight: 400}}>Currently self-isolating: </span>{patient.survey.selfmoniter ? "YES" : "NO"}</span>
            <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem", marginBottom: "1rem" }}><span style={{fontWeight: 400}}>Requesting test: </span>{patient.survey.requesttest ? "YES" : "NO"}</span>
            {small && (<Grid item container xs={12} direction="column">
              <Chat theme={theme} appointment={appointment} otherUser={appointment.patient.fname}/>
            </Grid>)}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(withToast(AppointmentDetail));
