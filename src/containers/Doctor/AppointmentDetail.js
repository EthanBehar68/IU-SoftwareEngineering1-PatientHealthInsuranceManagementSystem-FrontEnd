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
      <Fragment>
        {!loaded && (<Loading />)}
        <Grid xs={12} container item alignItems="center">
          <div onClick={this.props.onClose} style={{display: "flex", alignItems: "center", cursor: "pointer", marginBottom: "0.5rem", marginLeft: "-0.5rem"}}>
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
              <Chat theme={theme} appointment={appointment}/>
            </Grid>
          </div>)}
          <Grid container item xs={12} md={6} direction="column" style={{ paddingRight: small ? "" : "1rem" }}>
            <Fragment>
              <span style={{ fontSize: "1.5rem", fontWeight: 400 }}>{patient.detail.practicename}</span>
              <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}>{patient.detail.address1}{empty(patient.detail.address2) ? '' : `, ${patient.detail.address2}`}</span>
              <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}>{patient.detail.city}, {patient.detail.state1} {patient.detail.zipcode}</span>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                <span style={{ fontSize: "1.1rem", fontWeight: 400 }}>Specializations</span>
                <span style={{ fontSize: "1rem", fontWeight: 300, display: "flex", alignItems: "center", marginTop: "0.25rem" }}>{patient.detail.treatscovid ? <CheckCircle style={{ fontSize: "1rem", color: "green", marginRight: "0.25rem" }} /> : <Cancel style={{ fontSize: "1rem", color: "red", marginRight: "0.25rem" }} />} COVID-19 care</span>
              </div>
              <Divider style={{ width: "100%", margin: "0.5rem 0" }} />
            </Fragment>
            {small && (<Grid item container xs={12} direction="column">
              <Chat theme={theme} appointment={appointment}/>
            </Grid>)}
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

export default withRouter(withToast(AppointmentDetail));
