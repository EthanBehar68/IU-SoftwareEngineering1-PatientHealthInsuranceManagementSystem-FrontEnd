import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {Grid} from '@material-ui/core';

class Register extends Component {
	constructor(props) {
		super(props);
	}

  render() {
  	const {maxWidth, small, xs, theme, dark} = this.props;

  	return(
  		<Grid xs={12} container item direction="column" alignItems="center" style={{background: theme.background.main}}>
  			Register
  		</Grid>
  	);
  }
}
 
export default Register;