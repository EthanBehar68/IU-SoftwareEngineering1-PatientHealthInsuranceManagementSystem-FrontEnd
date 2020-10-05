import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import moment from 'moment';
import empty from 'is-empty';

import {TextField, Grid, MenuItem, Button, Divider, withWidth, InputAdornment} from '@material-ui/core';

import Loading from '../../components/Graphics/Loading';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  render() {
    const {maxWidth, small, xs, theme, dark} = this.props;
    const {loaded} = this.state;
    
    return (
      <Grid item container xs={12} direction="row" justify="center" style={{backgroundColor: theme.background.main, minHeight: "calc(100vh - 4rem)"}}>
        <Grid item container direction="column" style={{width: maxWidth, padding: small ? "2rem 1rem" : "3rem 0", height: "100%", position: "relative"}}>
          <span>Patient Dashboard</span>
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(Dashboard);
