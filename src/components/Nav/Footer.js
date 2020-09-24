import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {Grid, Switch} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

import {logo, darklogo} from '../../utils/images';

class Footer extends Component {
	constructor(props) {
		super(props);
	}

	setTheme = () => {
		if(this.props.dark) {
			this.props.state_set_dark(false);
			localStorage.setItem('dark', "false");
		} else {
			this.props.state_set_dark(true);
			localStorage.setItem('dark', "true");
		}
	}

  render() {
  	const {maxWidth, small, xs, theme, dark} = this.props;

  	return(
  		<Grid xs={12} container item direction="column" alignItems="center" style={{background: theme.background.main, zIndex: 100, padding: small ? "1rem" : ""}}>
  			<div style={{zIndex: 99, maxWidth: maxWidth, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}> 
	  			<Grid xs={12} container item alignItems="center" style={{padding: !small ? "0.5rem 0" : "", paddingLeft: !small ? "" : "0.5rem", marginLeft: "-1rem", flex: 1}}>
			  		<Switch
			        checked={dark}
			        onChange={this.setTheme}
			        color="primary"
			      />
			      <span style={{marginLeft: "0.3rem", color: theme.primary.main}}>{dark ? 'Dark' : "Light"}</span>
		      </Grid>
		      <span style={{fontWeight: 300, fontSize: "0.8rem", flex: 1, textAlign: "right", paddingTop: "0.2rem", color: theme.primary.main}}>APOLLOCARE 2020 &copy;</span>
	      </div>
  		</Grid>
  	);
  }
}
 
export default Footer;