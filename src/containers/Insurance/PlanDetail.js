import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import withToast from '../../utils/withToast';
import moment from 'moment';
import empty from 'is-empty';

import { TextField, Grid, MenuItem, Button, Divider, withWidth, InputAdornment, Select, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { CheckCircle, Cancel, NavigateBefore } from '@material-ui/icons';

import Loading from '../../components/Graphics/Loading';

class PlanDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true
    };
  }

  render() {
    const { maxWidth, small, xs, theme, dark, user, plan } = this.props;
    const { loaded } = this.state;

    const submitBtn = !empty(plan.planname) && !empty(plan.policynumber) && (plan.premium !== '') && (plan.deductible !== '') && (plan.includesmedical !== '') && (plan.includesdental !== '') && (plan.includesvision !== '');

    return (
      <div style={{minHeight: "calc(100vh - 4rem)"}}>
        {!loaded && (<Loading />)}
        <Grid xs={12} container item alignItems="center">
          <div onClick={this.props.onClose} style={{display: "flex", alignItems: "center", cursor: "pointer", marginBottom: "0.5rem", marginLeft: "-0.5rem"}}>
            <NavigateBefore style={{ fontSize: "2rem", color: "black" }}/>
            <span style={{fontSize: "0.9rem"}}>BACK</span>
          </div>
        </Grid>
        <Grid container item xs={12} alignItems="center">
          <span style={{ fontSize: xs ? "2rem" : "3rem", lineHeight: xs ? "2rem" : "3rem", fontWeight: 500 }}>{empty(plan.id) ? "New Plan" : "Edit Plan"}</span>
        </Grid>
        <Divider style={{ width: "100%", margin: "1rem 0" }} />
        <Grid container item xs={12} style={{ position: "relative" }}>
          <Grid container item xs={12} md={6} direction="column">
            <Fragment>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 400 }}>Plan Information</span>
              </div>
              <Divider style={{ width: "100%", margin: "0.5rem 0" }} />
            </Fragment>
            <span style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}>Plan Name</span>
            <TextField 
              size="small"
              variant="outlined"
              value={plan.planname}
              name="planname"
              onChange={this.props.onChangePlan}
              color="primary"
              inputProps={{
                placeholder: ""
              }}
              style={{ marginBottom: "0.5rem" }}
              fullWidth
            />
            <span style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}>Policy Number</span>
            <TextField 
              size="small"
              variant="outlined"
              value={plan.policynumber}
              name="policynumber"
              onChange={this.props.onChangePlan}
              color="primary"
              inputProps={{
                placeholder: ""
              }}
              style={{ marginBottom: "0.5rem" }}
              fullWidth
            />
          </Grid>
          <Grid container item xs={12} md={6} direction="column" style={{ paddingLeft: small ? "" : "1rem" }}>
            <Fragment>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 400 }}>Price Information</span>
              </div>
              <Divider style={{ width: "100%", margin: "0.5rem 0" }} />
            </Fragment>
            <span style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}>Premium</span>
            <TextField 
              size="small"
              variant="outlined"
              value={plan.premium}
              name="premium"
              onChange={this.props.onChangeNumber}
              color="primary"
              inputProps={{
                placeholder: ""
              }}
              type="number"
              InputProps={{
                startAdornment: <InputAdornment style={{marginRight:"0.25rem"}}>$</InputAdornment>
              }}
              style={{ marginBottom: "0.5rem" }}
              fullWidth
            />
            <span style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}>Deductible</span>
            <TextField 
              size="small"
              variant="outlined"
              value={plan.deductible}
              name="deductible"
              onChange={this.props.onChangeNumber}
              color="primary"
              type="number"
              inputProps={{
                placeholder: ""
              }}
              InputProps={{
                startAdornment: <InputAdornment style={{marginRight:"0.25rem"}}>$</InputAdornment>
              }}
              style={{ marginBottom: "0.5rem" }}
              fullWidth
            />
          </Grid>
          <Grid container item xs={12} md={6} direction="column">
            <Fragment>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 400 }}>Benefits</span>
              </div>
              <Divider style={{ width: "100%", margin: "0.5rem 0" }} />
            </Fragment>
            <span style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}>Includes medical?</span>
            <RadioGroup row value={plan.includesmedical} name="includesmedical" onChange={e => this.props.onChangePlan({target: {name: 'includesmedical', value: e.target.value === "true" ? true : false}})}>
              <FormControlLabel value={true} control={<Radio color="primary" />} label="Yes" />
              <FormControlLabel value={false} control={<Radio color="primary" />} label="No" />
            </RadioGroup>
            <span style={{ fontSize: "0.9rem", marginBottom: "0.25rem", marginTop: "0.5rem" }}>Includes dental?</span>
            <RadioGroup row value={plan.includesdental} name="includesdental" onChange={e => this.props.onChangePlan({target: {name: 'includesdental', value: e.target.value === "true" ? true : false}})}>
              <FormControlLabel value={true} control={<Radio color="primary" />} label="Yes" />
              <FormControlLabel value={false} control={<Radio color="primary" />} label="No" />
            </RadioGroup>
            <span style={{ fontSize: "0.9rem", marginBottom: "0.25rem", marginTop: "0.5rem" }}>Includes vision?</span>
            <RadioGroup row value={plan.includesvision} name="includesvision" onChange={e => this.props.onChangePlan({target: {name: 'includesvision', value: e.target.value === "true" ? true : false}})}>
              <FormControlLabel value={true} control={<Radio color="primary" />} label="Yes" />
              <FormControlLabel value={false} control={<Radio color="primary" />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid container item xs={12} md={6} direction="column" justify="flex-end" alignItems="flex-end">
            <Button onClick={empty(plan.id) ? this.props.addPlan : this.props.updatePlan} variant="contained" color="primary" disabled={!submitBtn}>{empty(plan.id) ? "SUBMIT" : "SAVE"}</Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withRouter(withToast(PlanDetail));
