import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import withToast from '../../utils/withToast';
import moment from 'moment';
import empty from 'is-empty';

import {TextField, Grid, MenuItem, Button, Divider, withWidth, InputAdornment} from '@material-ui/core';

import Loading from '../../components/Graphics/Loading';
import Onboarding from './Onboarding';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true
    };
  }

  componentDidMount() {
    
  }

  render() {
    const {maxWidth, small, xs, theme, dark, user} = this.props;
    const {loaded} = this.state;
    
    return (
      <Fragment>
        {!loaded && (<Loading />)}
        {empty(user.detail) && (<Onboarding {...this.props}/>)}
        {!empty(user.detail) && (<Grid item container xs={12} direction="row" justify="center" style={{backgroundColor: theme.background.main, minHeight: "calc(100vh - 4rem)"}}>
          <Grid item container style={{width: maxWidth, padding: small ? "2rem 1rem" : "3rem 0", height: "100%", position: "relative"}}>
            <span style={{width: "100%", fontSize: "1.5rem", fontWeight: 500}}>Hello {user.fname}</span>
            <Divider style={{width: "100%", margin: "0.5rem 0 1rem"}}/>
            <Grid xs={6} container item direction="column" style={{padding: "1.5rem", backgroundColor: theme.secondary.light, borderRadius: 6}}>
              <span style={{width: "100%", fontSize: "1.3rem", fontWeight: 500}}>COVID-19 Recommended Precautions</span>
              <Divider style={{width: "100%", margin: "0.5rem 0"}}/>
              <ol>
                <li style={{fontSize: "1rem", fontWeight: 300}}>Wash your hands often with soap and water or alcohol-based solutions.</li>
                <li style={{fontSize: "1rem", fontWeight: 300, marginTop: "0.5rem"}}>Cover your nose and mouth by putting them into your elbow or with a single-use handkerchief.</li>
                <li style={{fontSize: "1rem", fontWeight: 300, marginTop: "0.5rem"}}>Avoid contact with people when they sneeze, cough, or have a fever.</li>
                <li style={{fontSize: "1rem", fontWeight: 300, marginTop: "0.5rem"}}>Do not share food, cutlery or other objects without washing them properly.</li>
                <li style={{fontSize: "1rem", fontWeight: 300, marginTop: "0.5rem"}}>Wear a mask when in close contact with other individuals.</li>
              </ol>
              <span style={{fontWeight: 500, fontSize: "1rem", marginTop: '0.5rem'}}>IF YOU DEVELOP COVID-19 SYMPTOMS, GET TESTED AS SOON AS POSSIBLE.</span>
              <span style={{fontWeight: 300, fontSize: "1rem", marginTop: '0.25rem'}}><i>Quarantine for two weeks if you receive a positive COVID-19 test or suspect you have COVID-19.</i></span>
            </Grid>
            <Grid xs={6} container item style={{paddingLeft: "1rem", flexDirection: "column"}}>
              <Grid xs={12} item style={{backgroundColor: theme.primary.light, padding: "1.5rem", marginBottom: "0.5rem", flexBasis: "auto", borderRadius: 6, flex: 1}}>
                <span style={{width: "100%", fontSize: "1.3rem", fontWeight: 500}}>Find Insurance</span>
                <Divider style={{width: "100%", margin: "0.5rem 0"}}/>
                <span style={{width: "100%", fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem"}}>Apollocare is an all-in-one health care solution. When you pick a health care provider and plan, it will be immediately available for use and displayed to any doctor.</span>
                <Link to="/patient/insurance" style={{width: "100%"}}><Button style={{marginTop: "0.75rem"}} fullWidth variant="contained" color="secondary">Search Plans</Button></Link>
              </Grid>
              <Grid xs={12} item style={{backgroundColor: theme.primary.light, padding: "1.5rem", marginTop: "0.5rem", flexBasis: "auto", borderRadius: 6, flex: 1}}>
                <span style={{width: "100%", fontSize: "1.3rem", fontWeight: 500}}>Find a Doctor</span>
                <Divider style={{width: "100%", margin: "0.5rem 0"}}/>
                <span style={{width: "100%", fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem"}}>Find doctors of all specialties in your area. See patient reviews and chat with the doctor if you have any questions!</span>
                <Link to="/patient/find" style={{width: "100%"}}><Button style={{marginTop: "0.75rem"}} fullWidth variant="contained" color="secondary">Book an Appointment</Button></Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>)}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  dark: state.dark,
  user: state.user
});

export default connect(mapStateToProps,{})(withRouter(withToast(Dashboard)));
