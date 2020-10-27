import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import withToast from '../../utils/withToast';
import moment from 'moment';
import empty from 'is-empty';

import {TextField, Grid, MenuItem, Button, Divider, withWidth, InputAdornment, Select} from '@material-ui/core';

import Loading from '../../components/Graphics/Loading';
import SearchCard from '../../components/Doctor/SearchCard';
import GoogleMap from '../../components/Graphics/Map';

import {specializationOptions} from '../../utils/options';

import {getDoctors} from '../../store/actions/patients';

class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      search: {
        namesearch: true,
        speciality: '',
        name: '',
        address: '',
        treatscovid: ''
      }
    };
  }

  handleSearchChange = e => {
    this.setState({
      ...this.state,
      search: {
        ...this.state.search,
        [e.target.name]: e.target.value
      }
    })
  } 

  onSearch = async () => {
    const resp = await this.props.getDoctors(this.state.search);
    if(!resp.complete) {
      this.props.addToast(resp.error, {appearance: 'error', autoDismiss: true});
    }
  }

  render() {
    const {maxWidth, small, xs, theme, dark, user, doctors} = this.props;
    const {loaded, search} = this.state;
    
    return (
      <Fragment>
        {!loaded && (<Loading />)}
        <Grid item container xs={12} direction="column" alignItems="center" style={{backgroundColor: theme.background.main, minHeight: "calc(100vh - 4rem)"}}>
          <Grid item container direction="column" alignItems="center" style={{height: "100%", background: "#bf0a30"}}>
            <Grid item container xs={12} style={{width: maxWidth, padding: "2rem 0 1rem"}}>
              <Grid item container xs={4} direction="column">
                <div style={{display: "flex", alignItems: "center"}}>
                  <span style={{fontSize: "0.9rem", fontWeight: 300, color: "white"}}>Search by:</span>
                  <span onClick={() => this.setState({...this.state, search: {...search, namesearch: false, name: ''}})} style={{fontSize: "0.9rem", margin: "0 0.25rem", fontWeight: !search.namesearch ? 600 : 300, cursor: "pointer", color: "white"}}>Speciality</span>
                  <span style={{fontSize: "0.9rem", fontWeight: 300, color: "white"}}>or</span>
                  <span onClick={() => this.setState({...this.state, search: {...search, namesearch: true, speciality: ''}})} style={{fontSize: "0.9rem", marginLeft: "0.25rem", fontWeight: search.namesearch ? 600 : 300, cursor: "pointer", color: "white"}}>Doctor Name</span>
                </div>
                {!search.namesearch && (<Select
                  native
                  fullWidth
                  name="speciality"
                  placeholder="Speciality"
                  variant="outlined"
                  value={search.speciality}
                  size="small"
                  margin="dense"
                  onChange={this.handleSearchChange}
                  style={{marginTop: '0.5rem', background: "white"}}
                >
                  {[{label: '', value: ''}, ...specializationOptions].map((x, i) =>
                    <option key={i} value={x.value}>{x.label}</option>
                  )}
                </Select>)}
                {search.namesearch && (<TextField
                  size="small"
                  variant="outlined"
                  value={search.name}
                  name="name"
                  onChange={this.handleSearchChange}
                  color="primary"
                  inputProps={{
                    placeholder: "Doctor Name"
                  }}
                  style={{marginTop: "0.5rem", background: "white", borderRadius: 4}}
                  fullWidth
                />)}
              </Grid>
              <Grid item container xs={3} direction="column" style={{paddingLeft: "0.5rem"}}>
                <span style={{fontSize: "0.9rem", fontWeight: 300, color: "white"}}>Location:</span>
                <TextField
                  size="small"
                  variant="outlined"
                  value={search.address}
                  name="address"
                  onChange={this.handleSearchChange}
                  color="primary"
                  inputProps={{
                    placeholder: "Zip Code or City"
                  }}
                  style={{marginTop: "0.5rem", background: "white", borderRadius: 4}}
                  fullWidth
                />
              </Grid>
              <Grid item container xs={2} direction="column" style={{paddingLeft: "0.5rem"}}>
                <span style={{fontSize: "0.9rem", fontWeight: 300, color: "white"}}>COVID-19 Care:</span>
                <Select
                  native
                  fullWidth
                  name="treatscovid"
                  placeholder=""
                  variant="outlined"
                  value={search.treatscovid}
                  size="small"
                  margin="dense"
                  style={{marginTop: "0.5rem", background: 'white'}}
                  onChange={this.handleSearchChange}
                >
                  {['', 'Yes', 'No'].map((x, i) =>
                    <option key={i} value={x}>{x}</option>
                  )}
                </Select>
              </Grid>
              <Grid item container xs={3} alignItems="flex-end" justify="flex-end" style={{paddingLeft: "0.5rem"}}>
                <Button onClick={this.onSearch} variant="contained" color="primary" size="large">Search</Button>
              </Grid>
            </Grid>
            <Divider />
          </Grid>
          <Grid item container direction="column" alignItems="center" style={{height: "100%", background: "#fff"}}>
            <Grid item container xs={12} style={{width: maxWidth, padding: "1rem 0", position: "relative"}}>
              <Grid item container xs={12} direction="column" style={{position: "relative"}}>
                <div style={{position: "sticky", display: "flex", justifyContent: "flex-end", top: 0, width: "100%", height: 0}}>
                  {!empty(doctors) && (<GoogleMap 
                    lat={doctors[0].detail.lat} 
                    lng={doctors[0].detail.lng} 
                    style={{width: "23.4rem", height: "25rem", background: "white", marginTop: "1.5rem"}}
                    markers={doctors.map(doctor => ({lng: doctor.detail.lng, lat: doctor.detail.lat}))}
                  />)}
                </div>
                <Grid container item xs={12} style={{marginBottom: "0.5rem"}}>
                  {!empty(doctors.length) && (<span style={{fontSize: "0.9rem", lineHeight: "1.1rem"}}>{doctors.length} Doctors</span>)}
                  {empty(doctors.length) && (<span style={{fontSize: "0.9rem", lineHeight: "1.1rem"}}>No doctors match this search criteria.</span>)}
                </Grid>
                {doctors.map((doctor, i) => (
                  <SearchCard
                    key={i}
                    doctor={doctor}
                    i={i}
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  dark: state.dark,
  user: state.user,
  doctors: state.doctors
});

export default connect(mapStateToProps,{getDoctors})(withRouter(withToast(Find)));
