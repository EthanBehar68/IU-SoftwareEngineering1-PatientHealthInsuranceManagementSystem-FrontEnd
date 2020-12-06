import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import withToast from '../../utils/withToast';
import moment from 'moment';
import empty from 'is-empty';

import axios, { post } from 'axios'

import { updatePlanFile } from '../../store/actions/insurance';
//import { updatePlanFile } from '../..store/actions/insurance';

import {TextField, Grid, MenuItem, Button, Divider, withWidth, InputAdornment} from '@material-ui/core';

import Loading from '../../components/Graphics/Loading';
import Onboarding from './Onboarding';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      updateFile: false
    };
  }

  onFileUpload = e => {
    e.preventDefault();
    if (!empty(e.target.files)) {
      this.setState({ ...this.state, loaded: false });
      this.fileChange(e, this.setFileState);
    }

  }

  fileChange = (e, cb) => {
    var reader = new FileReader();
    reader.onload = function () { cb(reader.result) };
    reader.readAsDataURL(e.target.files[0]);
  }

  setFileState = async blob => {
    const resp = await updatePlanFile({ file: blob, id: this.props.user.id });
    if (resp.complete) {
      this.setState({
        ...this.state,
        basic: {
          ...this.state.basic,
          file: blob
        },
        updateFile: false,
        loaded: true
      });
    } else {
      this.props.addToast(resp.error, { appearance: "error", autoDismiss: true });
      this.setState({ ...this.state, loaded: true });
    }
  }



  render() {
    const {maxWidth, small, xs, theme, dark, user} = this.props;
    const {loaded, updateFile} = this.state;

    return (
      <Fragment>
        {empty(user.detail) && (<Onboarding {...this.props}/>)}
        {!loaded && (<Loading />)}
        <Grid item container xs={12} direction="row" justify="center" style={{backgroundColor: theme.background.main, minHeight: "calc(100vh - 4rem)"}}>
          <Grid item container direction="column" style={{width: maxWidth, padding: small ? "2rem 1rem" : "3rem 0", height: "100%", position: "relative"}}>
            <span>Insurance Dashboard</span>
            {updateFile && (<input type = "file" accept = "application/pdf" name = "File" onChange={this.onFileUpload} style={{ marginBottom: "0.5rem"}} />)}
            {!updateFile && (<Button onClick={() => this.setState({ ...this.state, updateFile: true })} size="small" variant="contained" color="primary" style={{ marginBottom: "0.5rem" }}>UPLOAD PLAN SUMMARY</Button>)}
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  dark: state.dark,
  user: state.user
});

export default connect(mapStateToProps,{})(withRouter(withToast(Dashboard)));
