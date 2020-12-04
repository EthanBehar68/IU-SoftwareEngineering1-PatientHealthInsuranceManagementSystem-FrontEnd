import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import withToast from '../../utils/withToast';
import moment from 'moment';
import empty from 'is-empty';

import { TextField, Grid, MenuItem, Button, Divider, withWidth, InputAdornment, Select } from '@material-ui/core';

import Loading from '../../components/Graphics/Loading';
import SearchCard from '../../components/Insurance/SearchCard';

import { getPlans, addPlan, updatePlan } from '../../store/actions/patients';

class Insurance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      search: {
        companyname: '',
        includesmedical: '',
        includesdental: '',
        includesvision: ''
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
    this.setState({ ...this.state, loaded: false });
    const resp = await this.props.getPlans(this.state.search);
    if (!resp.complete) {
      this.props.addToast(resp.error, { appearance: 'error', autoDismiss: true });
    }
    this.setState({ ...this.state, loaded: true });
  }

  render() {
    const { maxWidth, small, xs, theme, dark, user, plans } = this.props;
    const { loaded, search } = this.state;

    const searchBtn = !empty(search.companyname) || !empty(search.includesmedical) || !empty(search.includesdental) || !empty(search.includesvision);

    return (
      <Fragment>
        {!loaded && (<Loading />)}
        <Grid item container xs={12} direction="column" alignItems="center" style={{ backgroundColor: theme.background.main, minHeight: "calc(100vh - 4rem)" }}>
          <Grid item container direction="column" alignItems="center" style={{ height: "100%", background: theme.primary.main }}>
            <Grid item container xs={12} style={{ width: maxWidth, padding: small ? "1rem" : "2rem 0 1rem" }}>
              <Grid item container xs={12} style={{ margin: "1rem 0 0.75rem" }}>
                <span style={{ fontSize: "2rem", color: 'white', fontWeight: 500 }}>Find Insurance</span>
              </Grid>
              <Grid item container xs={12} sm={6} md={4} direction="column">
                <span style={{ fontSize: "0.9rem", fontWeight: 300, color: "white" }}>Company:</span>
                <TextField
                  size="small"
                  variant="outlined"
                  value={search.companyname}
                  name="companyname"
                  onChange={this.handleSearchChange}
                  color="primary"
                  inputProps={{
                    placeholder: "Company Name"
                  }}
                  style={{ marginTop: "0.5rem", background: "white", borderRadius: 4 }}
                  fullWidth
                />
              </Grid>
              <Grid item container xs={6} sm={3} md={2} direction="column" style={{ paddingLeft: "0.5rem", marginTop: xs ? "0.5rem" : "" }}>
                <span style={{ fontSize: "0.9rem", fontWeight: 300, color: "white" }}>Medical Included:</span>
                <Select
                  native
                  fullWidth
                  name="includesmedical"
                  placeholder=""
                  variant="outlined"
                  value={search.includesmedical}
                  size="small"
                  margin="dense"
                  style={{ marginTop: "0.5rem", background: 'white' }}
                  onChange={this.handleSearchChange}
                >
                  {['', 'Yes'].map((x, i) =>
                    <option key={i} value={x}>{x}</option>
                  )}
                </Select>
              </Grid>
              <Grid item container xs={6} sm={3} md={2} direction="column" style={{ paddingLeft: "0.5rem", marginTop: xs ? "0.5rem" : "" }}>
                <span style={{ fontSize: "0.9rem", fontWeight: 300, color: "white" }}>Dental Included:</span>
                <Select
                  native
                  fullWidth
                  name="includesdental"
                  placeholder=""
                  variant="outlined"
                  value={search.includesdental}
                  size="small"
                  margin="dense"
                  style={{ marginTop: "0.5rem", background: 'white' }}
                  onChange={this.handleSearchChange}
                >
                  {['', 'Yes'].map((x, i) =>
                    <option key={i} value={x}>{x}</option>
                  )}
                </Select>
              </Grid>
              <Grid item container xs={6} sm={3} md={2} direction="column" style={{ paddingLeft: "0.5rem", marginTop: xs ? "0.5rem" : "" }}>
                <span style={{ fontSize: "0.9rem", fontWeight: 300, color: "white" }}>Vision Included:</span>
                <Select
                  native
                  fullWidth
                  name="includesvision"
                  placeholder=""
                  variant="outlined"
                  value={search.includesvision}
                  size="small"
                  margin="dense"
                  style={{ marginTop: "0.5rem", background: 'white' }}
                  onChange={this.handleSearchChange}
                >
                  {['', 'Yes'].map((x, i) =>
                    <option key={i} value={x}>{x}</option>
                  )}
                </Select>
              </Grid>
              <Grid item container xs={12} md={2} alignItems="flex-end" justify="flex-end" style={{ paddingLeft: small ? "" : "0.5rem", marginTop: small ? "0.5rem" : "" }}>
                <Button fullWidth={small} onClick={this.onSearch} variant="contained" color="secondary" size="large" disabled={!searchBtn}>Search</Button>
              </Grid>
            </Grid>
            <Divider />
          </Grid>
          <Grid item container direction="column" alignItems="center" style={{ height: "100%", background: "#fff" }}>
            <Grid item container xs={12} style={{ width: maxWidth, padding: small ? "1rem" : "1rem 0", position: "relative" }}>
              <Grid item container xs={12} direction="column" style={{ position: "relative" }}>
                {!empty(user.insurance) && (<Fragment>
                  <SearchCard
                    key={'my plan'}
                    plan={user.insurance}
                    small={small}
                    xs={xs}
                    user={user}
                    addPlan={this.props.addPlan}
                    updatePlan={this.props.updatePlan}
                  />
                  <Divider style={{width: "100%", margin: "1rem 0"}}/>
                </Fragment>)}
                <Grid container item xs={12} style={{ marginBottom: "0.5rem" }}>
                  {!empty(plans.length) && (<span style={{ fontSize: "0.9rem", lineHeight: "1.1rem" }}>{plans.length} Plans</span>)}
                  {empty(plans.length) && (<span style={{ fontSize: "0.9rem", lineHeight: "1.1rem" }}>No plans match this search criteria.</span>)}
                </Grid>
                {plans.map((plan, i) => (
                  <SearchCard
                    key={i}
                    plan={plan}
                    i={i}
                    small={small}
                    xs={xs}
                    user={user}
                    addPlan={this.props.addPlan}
                    updatePlan={this.props.updatePlan}
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
  plans: state.plans
});

export default connect(mapStateToProps, { getPlans, addPlan, updatePlan })(withRouter(withToast(Insurance)));
