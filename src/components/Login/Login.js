import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import empty from 'is-empty';

import {get_role_img} from '../../utils/images';

import {Grid, TextField, Button} from '@material-ui/core';

import ReCAPTCHA from "react-google-recaptcha";

class Login extends Component {
	constructor(props) {
		super(props);
    this.state = {
      data: {
        username: '',
        password: ''
      },
      captcha: false
    }
	}

  handleDataChange = e => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    })
  }

  render() {
  	const {small, xs, theme, dark, role} = this.props;
    const {data} = this.state;

  	return(
  		<Grid xs={12} container item style={{borderRadius: 6, border: `1px solid ${theme.primary.main}`, padding: (dark && small) ? "0" : "1.5rem"}}>
  			{!small && (<Grid sm={0} md={6} container item style={{paddingRight: small ? "" : "1.5rem"}}>
          <img src={get_role_img(role)} alt="" style={{width: "100%", objectFit: "cover", height: "100%", borderRadius: 6}}/>
        </Grid>)}
        <Grid sm={12} md={6} container item direction="column" style={{background: "#fff", padding: dark ? "1rem" : "", borderRadius: 6}}>
          <span style={{color: !dark ? theme.primary.main : theme.primary.contrastText, fontSize: "2rem", lineHeight: "1.6rem", marginBottom: "1rem"}}>{role.toUpperCase()} LOGIN</span>
          <TextField
            size="small"
            variant="outlined"
            value={data.username}
            name="username"
            onChange={this.handleDataChange}
            color="primary"
            inputProps={{
              placeholder: "Username"
            }}
            style={{marginBottom: "0.5rem"}}
          />
          <TextField
            size="small"
            variant="outlined"
            value={data.password}
            name="password"
            type="password"
            color="primary"
            onChange={this.handleDataChange}
            inputProps={{
              placeholder: "Password"
            }}
            style={{marginBottom: "0.5rem"}}
          />
          <Link to="/forgot" style={{marginBottom: "0.5rem", color: !dark ? theme.primary.main : theme.primary.contrastText, fontSize: "0.9rem"}}>Forgot Password?</Link>
          <ReCAPTCHA
            sitekey="6LdAldEZAAAAANrCrYaxC6PpkQBYcmOASFJjXht1"
            style={{marginBottom: "0.5rem"}}
            onChange={value => this.setState({...this.state, captcha: !empty(value)})}
          />
          <Button variant="contained" style={{backgroundColor: "#002868", color: "white"}} size="large">Login</Button>
        </Grid>
  		</Grid>
  	);
  }
}

const mapStateToProps = state => ({
  dark: state.dark
});
 
export default connect(mapStateToProps,{})(Login);

