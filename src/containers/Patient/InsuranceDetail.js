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

class InsuranceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true
    };
  }

  render() {
    const { maxWidth, small, xs, theme, dark, user, filter, plan } = this.props;
    const { loaded } = this.state;

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
            <img src={`https://apollocare.blob.core.windows.net/insurance${plan.iid}/profile`} alt="" style={{ width: "100%", borderRadius: 3, objectFit: "cover" }} />
          </div>
          <span style={{ fontSize: xs ? "2rem" : "4rem", lineHeight: xs ? "2rem" : "3rem", fontWeight: 500 }}>{plan.companyname}</span>
        </Grid>
        <Divider style={{ width: "100%", margin: "1rem 0" }} />
        <Grid container item xs={12} style={{ position: "relative" }}>
          {!small && (<div style={{ position: "relative", display: "flex", justifyContent: "flex-end", top: 0, width: "100%", height: 0 }}>
            <Grid item container xs={12} md={6} direction="column" style={{ paddingLeft: "1rem" }}>
              <Chat theme={theme} appointment={plan} otherUser={plan.companyname}/>
            </Grid>
          </div>)}
          <Grid container item xs={12} md={6} direction="column" style={{ paddingRight: small ? "" : "1rem" }}>
            <Fragment>
              <span style={{ fontSize: xs ? "2rem" : "4rem", lineHeight: xs ? "2rem" : "3rem", fontWeight: 500 }}>{plan.companyname}</span>
              <Divider style={{width: "100%", margin: "0.5rem 0"}}/>
              <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                <span style={{fontWeight: 300, width: "100%", marginTop: "0.15rem", color: "black", fontSize: "1.1rem"}}>{plan.policynumber}</span>
                <span style={{fontWeight: 300, width: "100%", marginTop: "0.15rem", color: "black", fontSize: "1.1rem"}}>Premium: ${plan.premium.toFixed(2)}</span>
                <span style={{fontWeight: 300, width: "100%", marginTop: "0.15rem", color: "black", fontSize: "1.1rem"}}>Deductible: ${plan.deductible.toFixed(2)}</span>
              </div>
              <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                <span style={{fontSize: "1.1rem", fontWeight: 300, marginTop: "0.15rem", display: "flex", alignItems: "center"}}>{plan.includesmedical ? <CheckCircle style={{fontSize: "1rem", color: "green", marginRight: "0.25rem"}}/> : <Cancel style={{fontSize: "1rem", color: "red", marginRight: "0.25rem"}}/>} Medical</span>
                <span style={{fontSize: "1.1rem", fontWeight: 300, marginTop: "0.15rem", display: "flex", alignItems: "center"}}>{plan.includesdental ? <CheckCircle style={{fontSize: "1rem", color: "green", marginRight: "0.25rem"}}/> : <Cancel style={{fontSize: "1rem", color: "red", marginRight: "0.25rem"}}/>} Dental</span>
                <span style={{fontSize: "1.1rem", fontWeight: 300, marginTop: "0.15rem", display: "flex", alignItems: "center"}}>{plan.includesvision ? <CheckCircle style={{fontSize: "1rem", color: "green", marginRight: "0.25rem"}}/> : <Cancel style={{fontSize: "1rem", color: "red", marginRight: "0.25rem"}}/>} Vision</span>
              </div>
            </Fragment>
            {small && (<Grid item container xs={12} direction="column">
              <Chat theme={theme} appointment={plan} otherUser={plan.companyname}/>
            </Grid>)}
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

export default connect(mapStateToProps, { })(withRouter(withToast(InsuranceDetail)));
