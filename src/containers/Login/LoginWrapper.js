import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import moment from 'moment';
import empty from 'is-empty';

import {patient, doctor, insurance} from '../../utils/images';

import {TextField, Grid, MenuItem, Paper, Divider, withWidth, InputAdornment} from '@material-ui/core';

import Loading from '../../components/Graphics/Loading';

class LoginWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    const {maxWidth, small, xs, theme, dark} = this.props;
    
    return (
      <Grid item container xs={12} direction="row" justify="center" style={{backgroundColor: theme.background.main, minHeight: "calc(100vh - 4rem)"}}>
        <Grid item container justify="space-between" style={{width: maxWidth, padding: small ? "2rem 1rem" : "3rem 0", height: "100%", position: "relative"}}>
          <Link to="/signup/patient" style={{width: xs ? "calc(100vw - 2rem)" : "calc(33.33% - 1rem)", marginRight: xs ? "" : "1.5rem", marginBottom: xs ? "1rem" : ""}}>
            <Paper variant="outlined" style={{display: "flex", flexDirection: "column", padding: "1rem", background: theme.primary.contrastText, borderColor: theme.primary.main}}>
              <img src={patient} alt="" style={{width: "100%", height: "10rem", objectFit: "cover", borderRadius: 5}}/>
              <span style={{fontWeight: 500, color: theme.primary.main, fontSize: "1.4rem", marginTop: "0.5rem"}}>Patient</span>
              <span style={{color: theme.primary.main, marginTop: "0.3rem"}}>Search for doctors, choose an insurance provider, or get directions to your next appointment.</span>
            </Paper>
          </Link>
          <Link to="/signup/doctor" style={{width: xs ? "calc(100vw - 2rem)" : "calc(33.33% - 1rem)", marginRight: xs ? "" : "1.5rem", marginBottom: xs ? "1rem" : ""}}>
            <Paper variant="outlined" style={{display: "flex", flexDirection: "column", padding: "1rem", background: theme.primary.contrastText, borderColor: theme.primary.main}}>
              <img src={doctor} alt="" style={{width: "100%", height: "10rem", objectFit: "cover", borderRadius: 5}}/>
              <span style={{fontWeight: 500, color: theme.primary.main, fontSize: "1.4rem", marginTop: "0.5rem"}}>Doctor</span>
              <span style={{color: theme.primary.main, marginTop: "0.3rem"}}>Search for doctors, choose an insurance provider, or get directions to your next appointment.</span>
            </Paper>
          </Link>
          <Link to="/signup/insurance" style={{width: xs ? "calc(100vw - 2rem)" : "calc(33.33% - 1rem)"}}>
            <Paper variant="outlined" style={{display: "flex", flexDirection: "column", padding: "1rem", background: theme.primary.contrastText, borderColor: theme.primary.main}}>
              <img src={insurance} alt="" style={{width: "100%", height: "10rem", objectFit: "cover", borderRadius: 5}}/>
              <span style={{fontWeight: 500, color: theme.primary.main, fontSize: "1.4rem", marginTop: "0.5rem"}}>Insurance Provider</span>
              <span style={{color: theme.primary.main, marginTop: "0.3rem"}}>Search for doctors, choose an insurance provider, or get directions to your next appointment.</span>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(LoginWrapper);
