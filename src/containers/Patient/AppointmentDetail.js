import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import withToast from '../../utils/withToast';
import moment from 'moment';
import empty from 'is-empty';

import { TextField, Grid, MenuItem, Button, Divider, withWidth, InputAdornment, Select } from '@material-ui/core';
import { CheckCircle, Cancel, NavigateBefore, StarBorder, Star } from '@material-ui/icons';

import Loading from '../../components/Graphics/Loading';
import Stars from '../../components/Graphics/Stars';
import Review from '../../components/Patient/Review';
import Chat from '../../components/Patient/Chat';

import { getSpecializations } from '../../utils/options';

class AppointmentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      leaveReview: false,
      review: {
        id: this.props.user.id,
        did: this.props.appointment.doctor.id,
        rating: '',
        reviewmessage: ''
      }
    };
  }

  addReview = async () => {
    this.setState({...this.state, loaded: false});
    const resp = await this.props.addReview(this.state.review, this.props.appointment, this.props.user.fname + " " + this.props.user.lname);
    if(resp.complete) {
      this.setState({...this.state, loaded: true, leaveReview: false, review: {...this.state.review, rating: '', reviewmessage: ''}});
    } else {
      this.props.addToast(resp.error, {appearance: 'error'});
    }
  }

  render() {
    const { maxWidth, small, xs, theme, dark, user, filter, appointment } = this.props;
    const { loaded, leaveReview, review } = this.state;

    let arr = [];
    if (!empty(appointment.doctor)) {
      for (let key in appointment.doctor.specializations) {
        if (appointment.doctor.specializations[key] === true) arr.push(key);
      }
    }

    return (
      <div style={{minHeight: "calc(100vh - 4rem)", paddingBottom: "2rem"}}>
        {!loaded && (<Loading />)}
        <Grid xs={12} container item alignItems="center">
          <div onClick={this.props.onClose} style={{display: "flex", alignItems: "center", cursor: "pointer", marginBottom: "0.5rem", marginLeft: "-0.5rem"}}>
            <NavigateBefore style={{ fontSize: "2rem", color: "black" }}/>
            <span style={{fontSize: "0.9rem"}}>BACK</span>
          </div>
        </Grid>
        <Grid container item xs={12} alignItems="center">
          <div style={{ width: xs ? "2.5rem" : "3.5rem", height: xs ? "2.5rem" : "3.5rem", borderRadius: 3, overflow: "hidden", marginRight: "1rem" }}>
            <img src={`https://apollocare.blob.core.windows.net/doctor${appointment.doctor.id}/profile`} alt="" style={{ width: "100%", borderRadius: 3, objectFit: "cover" }} />
          </div>
          <span style={{ fontSize: xs ? "2rem" : "4rem", lineHeight: xs ? "2rem" : "3rem", fontWeight: 500 }}>{appointment.doctor.fname} {appointment.doctor.lname}</span>
        </Grid>
        <Divider style={{ width: "100%", margin: "1rem 0" }} />
        <Grid container item xs={12} style={{ position: "relative" }}>
          {!small && (<div style={{ position: "relative", display: "flex", justifyContent: "flex-end", top: 0, width: "100%", height: 0 }}>
            <Grid item container xs={12} md={6} direction="column" style={{ paddingLeft: "1rem" }}>
              <Chat theme={theme} appointment={appointment} otherUser={appointment.doctor.fname}/>
            </Grid>
          </div>)}
          <Grid container item xs={12} md={6} direction="column" style={{ paddingRight: small ? "" : "1rem" }}>
            <Fragment>
              <span style={{ fontSize: "1.5rem", fontWeight: 400 }}>{appointment.doctor.detail.practicename}</span>
              <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}>{appointment.doctor.detail.address1}{empty(appointment.doctor.detail.address2) ? '' : `, ${appointment.doctor.detail.address2}`}</span>
              <span style={{ fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem" }}>{appointment.doctor.detail.city}, {appointment.doctor.detail.state1} {appointment.doctor.detail.zipcode}</span>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                <span style={{ fontSize: "1.1rem", fontWeight: 400 }}>Specializations</span>
                <span style={{ fontSize: "1rem", fontWeight: 300, display: "flex", alignItems: "center", marginTop: "0.25rem" }}>{appointment.doctor.detail.treatscovid ? <CheckCircle style={{ fontSize: "1rem", color: "green", marginRight: "0.25rem" }} /> : <Cancel style={{ fontSize: "1rem", color: "red", marginRight: "0.25rem" }} />} COVID-19 care</span>
              </div>
              <Divider style={{ width: "100%", margin: "0.5rem 0" }} />
              <ul style={{ paddingInlineStart: "1.5rem", marginBlockStart: "0" }}>{getSpecializations(arr).map((item, i) => <li key={i} style={{ fontWeight: 300, fontSize: "0.9rem" }}>{item}</li>)}</ul>
            </Fragment>
            {small && (<Grid item container xs={12} direction="column">
              <Chat theme={theme} appointment={appointment} otherUser={appointment.doctor.fname}/>
            </Grid>)}
            <Fragment>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: small ? "2rem" : "1rem" }}>
                <span style={{ fontSize: "1.1rem", fontWeight: 400 }}>Reviews</span>
                <Stars style={{ marginBottom: "-0.2rem" }} rating={parseFloat(appointment.doctor.reviews.map(r => r.rating).reduce((a,b) => a + b, 0)) / parseFloat(appointment.doctor.reviews.length)} number={appointment.doctor.reviews.length} />
              </div>
              <Divider style={{ width: "100%", marginTop: "0.5rem" }} />
              {filter === "Past" && !leaveReview && (<Button onClick={() => this.setState({...this.state, leaveReview: true})} color="secondary" variant="contained" style={{marginTop: "0.5rem"}}>ADD A REVIEW</Button>)}
              {leaveReview && (<div style={{display: "flex", flexDirection: "column"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                  {[1,2,3,4,5].map((star, i) => (
                    <div key={i} onClick={() => this.setState({...this.state, review: {...review, rating: star}})} style={{padding: "0.5rem 0", marginRight: "0.5rem", cursor: "pointer"}}>
                      {(empty(review.rating) || star > review.rating) ? (<StarBorder style={{fontSize: "3rem", color: theme.secondary.main}}/>) : (<Star style={{fontSize: "3rem", color: theme.secondary.main}}/>)}
                    </div>
                  ))}
                </div>
                <TextField
                  size="small"
                  variant="outlined"
                  value={review.reviewmessage}
                  multiline
                  onChange={(e) => this.setState({...this.state, review: {...review, reviewmessage: e.target.value}})}
                  color="secondary"
                  inputProps={{
                    placeholder: "Message...",
                    maxLength: "8000"
                  }}
                  style={{width: "100%", backgroundColor: "white"}}
                />
                <Button onClick={this.addReview} color="primary" variant="contained" style={{marginTop: "0.5rem"}} disabled={empty(review.rating) || empty(review.reviewmessage)}>SUBMIT</Button>
              </div>)}
              {appointment.doctor.reviews.map((review, i) => (
                <Review key={i} review={review} />
              ))}
            </Fragment>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  appointments: state.appointments
});

export default connect(mapStateToProps, { })(withRouter(withToast(AppointmentDetail)));
