import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import withToast from '../../utils/withToast';
import moment from 'moment';
import empty from 'is-empty';

import { TextField, Grid, MenuItem, Button, Divider, withWidth, InputAdornment, Select } from '@material-ui/core';
import { CheckCircle, Cancel, NavigateBefore } from '@material-ui/icons';

import Loading from '../../components/Graphics/Loading';
import Stars from '../../components/Graphics/Stars';
import Review from '../../components/Patient/Review';
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

    const doctor = appointment.doctor;

    let arr = [];
    if (!empty(doctor)) {
      for (let key in doctor.specializations) {
        if (doctor.specializations[key] === true) arr.push(key);
      }
    }

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
            <img src={`https://apollocare.blob.core.windows.net/doctor${doctor.id}/profile`} alt="" style={{ width: "100%", borderRadius: 3, objectFit: "cover" }} />
          </div>
          <span style={{ fontSize: xs ? "2rem" : "4rem", lineHeight: xs ? "2rem" : "3rem", fontWeight: 500 }}>{doctor.fname} {doctor.lname}</span>
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
              <span style={{ fontSize: "1.5rem", fontWeight: 400 }}>{doctor.detail.practicename}</span>
              <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}>{doctor.detail.address1}{empty(doctor.detail.address2) ? '' : `, ${doctor.detail.address2}`}</span>
              <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}>{doctor.detail.city}, {doctor.detail.state1} {doctor.detail.zipcode}</span>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                <span style={{ fontSize: "1.1rem", fontWeight: 400 }}>Specializations</span>
                <span style={{ fontSize: "1rem", fontWeight: 300, display: "flex", alignItems: "center", marginTop: "0.25rem" }}>{doctor.detail.treatscovid ? <CheckCircle style={{ fontSize: "1rem", color: "green", marginRight: "0.25rem" }} /> : <Cancel style={{ fontSize: "1rem", color: "red", marginRight: "0.25rem" }} />} COVID-19 care</span>
              </div>
              <Divider style={{ width: "100%", margin: "0.5rem 0" }} />
              <ul style={{ paddingInlineStart: "1.5rem", marginBlockStart: "0" }}>{getSpecializations(arr).map((item, i) => <li key={i} style={{ fontWeight: 300, fontSize: "0.9rem" }}>{item}</li>)}</ul>
            </Fragment>
            {small && (<Grid item container xs={12} direction="column">
              <Chat theme={theme} appointment={appointment}/>
            </Grid>)}
            <Fragment>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: small ? "2rem" : "1rem" }}>
                <span style={{ fontSize: "1.1rem", fontWeight: 400 }}>Reviews</span>
                <Stars style={{ marginBottom: "-0.2rem" }} rating={3.5} number={100} />
              </div>
              <Divider style={{ width: "100%", marginTop: "0.5rem" }} />
              {[
                {
                  reviewmessage: "Great appointment! They heard my concerns. I told them I didn't want to take presciption pills. They recommended a natural remedy.",
                  rating: 4,
                  patientname: "John Doe"
                },
                {
                  reviewmessage: "My experience with the doctor was great. But the service at the practice was subpar. The people behind the desk frequently ignored me. It took my 15 minutes just to sign in and get my paper work done because the clerks were so unhelpful. I hope the doctor takes my feedback seriously. I told them about this awful experience; I just hope they act on it.",
                  rating: 3,
                  patientname: "John Ipsum"
                },
                {
                  reviewmessage: "I ended up speaking with the doctor for one hour. We talked a lot about my concerns for my health. We discuss many treatment options and possible routes. Then we discussed the recovery options for each treatment. They are very transparent with the whole process for my treatment. Couldn.t ask for a better experience.",
                  rating: 5,
                  patientname: "John Deer"
                },
                {
                  reviewmessage: "I don't think I'll see this doctor ever again. It seems like my own reserach on my health conditions proved to be more meaningful then the doctor's degree and experience. I knew more about my symptoms and issues. I corrected them on two aspects of my disease they spoke about. All in all this doctor is either not familiar with many disease or honestly... a hack. Please avoid this doctor.",
                  rating: 2,
                  patientname: "Jane Doe"
                }
              ].map((review, i) => (
                <Review key={i} review={review} />
              ))}
            </Fragment>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

export default withRouter(withToast(AppointmentDetail));
