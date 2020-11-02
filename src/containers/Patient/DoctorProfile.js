import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import withToast from '../../utils/withToast';
import moment from 'moment';
import empty from 'is-empty';

import {TextField, Grid, MenuItem, Button, Divider, InputAdornment, Modal, Select, RadioGroup, Radio, FormControlLabel} from '@material-ui/core';
import {Cancel, CheckCircle} from '@material-ui/icons';

import Loading from '../../components/Graphics/Loading';
import Calendar from '../../components/Patient/Calendar';
import Review from '../../components/Patient/Review';
import Stars from '../../components/Graphics/Stars';

import {bloodtypes, getSpecializations} from '../../utils/options';

import {getDoctor, getAppointments, addAppointment} from '../../store/actions/patients';

class DoctorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      doctor: {}
    };
  }

  async componentDidMount() {
    const resp = await getDoctor(this.props.doctorId);
    if(resp.complete) {
      this.setState({...this.state, loaded: true, doctor: resp.data});
    } else {
      this.props.onClose();
    }
  }

  onError = error => {
    this.props.addToast(error, {appearance: 'error', autoDismiss: true});
  }

  render() {
    const {maxWidth, small, xs, theme, dark, appointments, user} = this.props;
    const {loaded, doctor} = this.state;

    let arr = [];
    if(!empty(doctor)) {
      for(let key in doctor.specializations) {
        if(doctor.specializations[key] === true) arr.push(key);
      }
    }
    
    return (
      <Fragment>
        {!loaded && (<Loading />)}
        <Modal onClose={this.props.onClose} open={loaded} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          {loaded && (<div style={{backgroundColor: "#fff", width: `calc(${maxWidth} - 4rem)`, padding: small ? "1rem" : "2rem", position: "relative", minHeight: "70vh", maxHeight: "80vh", overflowY: "scroll", borderRadius: 6, display: "flex", flexDirection: "column", position: "relative"}}>
            <Cancel onClick={this.props.onClose} style={{position: "absolute", right: 8, top: 8, color: "red", cursor: "pointer", fontSize: "1.5rem"}}/>
            <Grid container item xs={12} alignItems="center">
              <img src={`https://apollocare.blob.core.windows.net/doctor${doctor.id}/profile`} alt="" style={{width: xs ? "2.5rem" : "3.5rem", height: xs ? "2.5rem" : "3.5rem", borderRadius: 3, marginRight: "1rem", objectFit: "cover"}}/>
              <span style={{fontSize: xs ? "2rem" : "4rem", lineHeight: xs ? "2rem" : "3rem", fontWeight: 500}}>{doctor.fname} {doctor.lname}</span>
            </Grid>
            <Divider style={{width: "100%", margin: "1rem 0"}}/>
            <Grid container item xs={12} style={{position: "relative"}}>
              {!small && (<div style={{position: "sticky", display: "flex", justifyContent: "flex-end", top: 0, width: "100%", height: 0}}>
                <Grid item container xs={12} md={7} direction="column" style={{paddingLeft: small ? "" : "1rem"}}>
                  <Calendar appointments={appointments} getAppointments={this.props.getAppointments} user={user} doctor={doctor} addAppointment={this.props.addAppointment} onError={this.onError}/>
                </Grid>
              </div>)}
              <Grid container item xs={12} md={5} direction="column" style={{paddingRight: small ? "" : "1rem"}}>
                <span style={{fontSize: "1.5rem", fontWeight: 400}}>{doctor.detail.practicename}</span>
                <span style={{fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem"}}>{doctor.detail.address1}{empty(doctor.detail.address2) ? '' : `, ${doctor.detail.address2}`}</span>
                <span style={{fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem"}}>{doctor.detail.city}, {doctor.detail.state1} {doctor.detail.zipcode}</span>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem"}}>
                  <span style={{fontSize: "1.1rem", fontWeight: 400}}>Specializations</span>
                  <span style={{fontSize: "1rem", fontWeight: 300, display: "flex", alignItems: "center", marginTop: "0.25rem"}}>{doctor.detail.treatscovid ? <CheckCircle style={{fontSize: "1rem", color: "green", marginRight: "0.25rem"}}/> : <Cancel style={{fontSize: "1rem", color: "red", marginRight: "0.25rem"}}/>} COVID-19 care</span>
                </div>
                <Divider style={{width: "100%", margin: "0.5rem 0"}}/>
                <ul style={{paddingInlineStart: "1.5rem", marginBlockStart: "0"}}>{getSpecializations(arr).map((item, i) => <li key={i} style={{fontWeight: 300, fontSize: "0.9rem"}}>{item}</li>)}</ul>
                {small && (<Grid item container xs={12} direction="column" style={{paddingLeft: small ? "" : "1rem"}}>
                  <Calendar appointments={appointments} getAppointments={this.props.getAppointments} user={user} doctor={doctor} addAppointment={this.props.addAppointment} onError={this.onError}/>
                </Grid>)}
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: small ?"2rem" : "1rem"}}>
                  <span style={{fontSize: "1.1rem", fontWeight: 400}}>Reviews</span>
                  <Stars style={{marginBottom: "-0.2rem"}} rating={3.5} number={100}/>
                </div>
                <Divider style={{width: "100%", marginTop: "0.5rem"}}/>
                {[
                  {
                    reviewmessage: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing",
                    rating: 4,
                    patientname: "John Doe"
                  },
                  {
                    reviewmessage: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page ed",
                    rating: 3,
                    patientname: "John Ipsum"
                  },
                  {
                    reviewmessage: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reas",
                    rating: 5,
                    patientname: "John Deer"
                  },
                  {
                    reviewmessage: "rspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
                    rating: 2,
                    patientname: "Jane Doe"
                  }
                ].map((review, i) => (
                  <Review key={i} review={review}/>
                ))}
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

export default connect(mapStateToProps,{getAppointments, addAppointment})(withRouter(withToast(DoctorProfile)));
