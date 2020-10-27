import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import empty from 'is-empty';

import {TextField, Grid, MenuItem, Button, Divider} from '@material-ui/core';

import Stars from '../Graphics/Stars';

class SearchCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {small, xs, theme, doctor, i} = this.props;
    
    return (
      <Grid id={`${i + 1}`} container item xs={7} style={{padding: "1rem", border: "1px solid #ddd", marginBottom: "1px", position: "relative", paddingRight: "0.5rem"}}>
        <span style={{position: "absolute", right: 3, top: 3, color: "#ccc", fontSize: "0.8rem"}}>{i + 1}</span>
        <Grid container item xs={3}>
          <img src={`https://apollocare.blob.core.windows.net/doctor${doctor.id}/profile`} alt="" style={{width: "100%", objectFit: "cover", borderRadius: 3}}/>
        </Grid>
        <Grid container item xs={6} direction="column" style={{padding: "0 1rem"}}>
          <span style={{fontSize: "1.5rem", fontWeight: 500}}>{doctor.fname} {doctor.lname}</span>
          <span style={{fontSize: "1rem", fontWeight: 400, marginTop: "0.5rem"}}>{doctor.detail.practicename}</span>
          <span style={{fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem"}}>{doctor.detail.address1}{empty(doctor.detail.address2) ? '' : `, ${doctor.detail.address2}`}</span>
          <span style={{fontSize: "1rem", fontWeight: 300, marginTop: "0.25rem"}}>{doctor.detail.city}, {doctor.detail.state1} {doctor.detail.zipcode}</span>
          <Link to={`/book/${doctor.id}`} style={{marginTop: "0.5rem"}}><Button variant="contained" color="secondary">BOOK ONLINE</Button></Link>
        </Grid>
        <Grid container item direction="column" xs={3}>
          <Stars rating={3.5} number={100} style={{marginBottom: "0.25rem"}}/>
          <Link to={`/profile/${doctor.id}`}><Button variant="outlined" color="secondary">VIEW PROFILE</Button></Link>
        </Grid>
      </Grid>
    )
  }
}

export default SearchCard;
