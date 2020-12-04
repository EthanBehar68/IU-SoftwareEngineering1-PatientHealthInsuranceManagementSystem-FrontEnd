import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import withToast from '../../utils/withToast';
import moment from 'moment';
import empty from 'is-empty';

import { TextField, Grid, MenuItem, Button, Divider, withWidth, InputAdornment, Select } from '@material-ui/core';

import Loading from '../../components/Graphics/Loading';
import PlanRow from '../../components/Insurance/PlanRow';
import PlanDetail from './PlanDetail';

import { getPlans, addPlan, updatePlan } from '../../store/actions/insurance';

class Plans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      planId: !empty(this.props.match.params.planId) ? this.props.match.params.planId : "",
      addPlan: false,
      plan: {
        id: '',
        iid: this.props.user.id,
        planname: '',
        policynumber: '',
        premium: '',
        deductible: '',
        includesmedical: '',
        includesdental: '',
        includesvision: ''
      }
    };
  }

  async componentDidMount() {
    await this.props.getPlans(this.props.user.id);
    this.setState({...this.state, loaded: true, plan: empty(this.props.plans.filter(appt => appt.id == this.props.match.params.planId)) ? this.state.plan : this.props.plans.filter(appt => appt.id == this.props.match.params.planId)[0]});
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.match.params != this.props.match.params) {
      this.setState({
        ...this.state,
        planId: this.props.match.params.planId,
        plan: empty(this.props.plans.filter(appt => appt.id == this.state.planId)) ? this.state.plan : this.props.plans.filter(appt => appt.id == this.state.planId)[0]
      });
    }
  }

  onChangePlan = e => {
    this.setState({
      ...this.state,
      plan: {
        ...this.state.plan,
        [e.target.name]: e.target.value
      }
    })
  }

  onChangeNumber = e => {
    this.setState({
      ...this.state,
      plan: {
        ...this.state.plan,
        [e.target.name]: e.target.value === '' ? '' : Number(e.target.value)
      }
    })
  }

  addPlan = async () => {
    this.setState({...this.state, loaded: false});
    const resp = await this.props.addPlan(this.state.plan);
    if(resp.complete) {
      this.setState({...this.state, loaded: true, addPlan: false, plan: {...this.state.plan, id: ''}});
      this.props.addToast("Successfully added plan.", {appearance: 'success', autoDismiss: true});
    } else {
      this.setState({...this.state, loaded: true});
      this.props.addToast(resp.error, {appearance: 'error'});
    }
  }

  updatePlan = async () => {
    this.setState({...this.state, loaded: false});
    const resp = await this.props.updatePlan(this.state.plan);
    if(resp.complete) {
      this.setState({...this.state, loaded: true, addPlan: false});
      this.props.addToast("Successfully updated plan.", {appearance: 'success', autoDismiss: true});
    } else {
      this.setState({...this.state, loaded: true});
      this.props.addToast(resp.error, {appearance: 'error'});
    }
  }

  render() {
    const { maxWidth, small, xs, theme, dark, user, plans } = this.props;
    const { loaded, planId, addPlan, plan } = this.state;

    const list = plans.map(p => 
      <PlanRow
        key={p.id}
        plan={p}
        theme={theme}
        small={small}
        xs={xs}
      />
    );

    return (
      <Fragment>
        {!loaded && (<Loading />)}
        <Grid item container xs={12} direction="column" alignItems="center" style={{ backgroundColor: theme.background.main, minHeight: "calc(100vh - 4rem)" }}>
          <Grid xs={12} item container direction="column" alignItems="center" style={{ height: "100%", background: theme.primary.main }}>
            <Grid item container xs={12} style={{ width: maxWidth, padding: small ? "1rem" : "2rem 0 1rem" }}>
              <Grid item container xs={12} style={{ margin: "1rem 0 0.75rem" }}>
                <span style={{ fontSize: "2rem", color: 'white', fontWeight: 500 }}>{(empty(plan.id) && !addPlan) ? <span>{user.detail.companyname}<span style={{fontWeight: 200}}> Plans</span></span> : empty(plan.planname) ? "New Plan" : `${plan.planname}`}</span>
              </Grid>
            </Grid>
            <Divider />
          </Grid>
          <Grid xs={12} item container direction="column" alignItems="center" style={{ height: "100%"}}>
            <Grid item container xs={12} direction="column" style={{ width: maxWidth, padding: small ? "1rem" : "2rem 0 1rem" }}>
              {empty(plan.id) && !addPlan && (<Fragment>
                <div style={{display: "flex", width: "100%", justifyContent: "space-between"}}>
                  <div style={{padding: "1rem 1.5rem 0 0", cursor: "pointer", display: "flex", flexDirection: "column"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                      <span style={{fontWeight: 500, color: theme.primary.main}}>Plans</span>
                      <div style={{backgroundColor: theme.primary.main, display: "flex", alignItems: "center", justifyContent: "center", width: "1.2rem", height: "1.2rem", borderRadius: "0.6rem", marginLeft: "0.5rem"}}>
                        <span style={{color: "#fff", lineHeight: "1.2rem", fontWeight: 500, fontSize: "0.7rem"}}>{plans.length}</span>
                      </div>
                    </div>
                    <div style={{height: "0.25rem", marginTop: "0.5rem", backgroundColor: theme.primary.main}} />
                  </div>
                  <div style={{display: "flex", alignItems: "center"}}>
                    <Button onClick={() => this.setState({...this.state, addPlan: true})} color="secondary" variant="contained" size="small">Add Plan</Button>
                  </div>
                </div>
                <Divider style={{marginBottom: "1rem", width: "100%"}}/>
                {loaded && (list)}
              </Fragment>)}
              {(!empty(plan.id) || addPlan) && (<PlanDetail 
                onClose={() => { this.setState({...this.state, planId: '', addPlan: false, plan: {...plan, id: ''}}); this.props.history.push('/insurance/plans') } }
                onChangePlan={this.onChangePlan}
                onChangeNumber={this.onChangeNumber}
                addPlan={this.addPlan}
                updatePlan={this.updatePlan}
                plan={plan}
                theme={theme} 
                small={small}
                user={user}
                xs={xs}
              />)}
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

export default connect(mapStateToProps, { getPlans, addPlan, updatePlan })(withRouter(withToast(Plans)));
