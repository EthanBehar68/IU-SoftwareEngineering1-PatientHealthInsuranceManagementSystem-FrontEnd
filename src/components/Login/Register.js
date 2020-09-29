import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import empty from 'is-empty';
import ReCAPTCHA from "react-google-recaptcha";

import {get_role_img} from '../../utils/images';

import {Grid, TextField, Button, Divider} from '@material-ui/core';

import PhoneInput from '../Inputs/PhoneInput';

class Register extends Component {
	constructor(props) {
		super(props);
    this.state = {
      data: {
      	first: '',
      	last: '',
        email: '',
        phone: '',
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
    const {data, captcha} = this.state;

    const emptyCheck = !empty(data.first) && !empty(data.last) && !empty(data.email) && !empty(data.phone) && !empty(data.password) && captcha;

  	return(
  		<Grid xs={12} container item style={{borderRadius: 6, border: `1px solid ${theme.primary.main}`, padding: (dark && small) ? "0" : "1.5rem"}}>
  			{!small && (<Grid sm={0} md={4} container item style={{paddingRight: small ? "" : "1.5rem"}}>
          <img src={get_role_img(role)} alt="" style={{width: "100%", objectFit: "cover", height: "100%", borderRadius: 6}}/>
        </Grid>)}
        <Grid sm={12} md={8} container item direction="column" style={{background: "#fff", padding: dark ? "1rem" : "", borderRadius: 6}}>
          <span style={{color: !dark ? theme.primary.main : theme.primary.contrastText, fontSize: "2rem", lineHeight: "1.6rem", marginBottom: "1rem", fontWeight: 500}}>{role.toUpperCase()} REGISTRATION</span>
          <Grid item container xs={12}>
	          <Grid item container xs={12} sm={6} style={{paddingRight: !xs ? "0.25rem" : ""}}>
	          	<TextField
		            size="small"
		            variant="outlined"
		            value={data.first}
		            name="first"
		            onChange={this.handleDataChange}
		            color="primary"
		            inputProps={{
		              placeholder: "First Name"
		            }}
		            style={{marginBottom: "0.5rem"}}
		            fullWidth
		          />
	          	<TextField
		            size="small"
		            variant="outlined"
		            value={data.email}
		            name="email"
		            onChange={this.handleDataChange}
		            color="primary"
		            inputProps={{
		              placeholder: "Email"
		            }}
		            style={{marginBottom: "0.5rem"}}
		            fullWidth
		          />
	          </Grid>
	          <Grid item container xs={12} sm={6} style={{paddingLeft: !xs ? "0.25rem" : ""}}>
	          	<TextField
		            size="small"
		            variant="outlined"
		            value={data.last}
		            name="last"
		            onChange={this.handleDataChange}
		            color="primary"
		            inputProps={{
		              placeholder: "Last Name"
		            }}
		            style={{marginBottom: "0.5rem"}}
		            fullWidth
		          />
		          <PhoneInput
		          	value={data.phone}
		          	name="phone"
		          	onChange={value => this.setState({...this.state, data: {...data, phone: value}})}
		          	style={{marginBottom: "0.5rem"}}
		          />
	          </Grid>
          </Grid>
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
            fullWidth
          />
          <ReCAPTCHA
            sitekey="6LdAldEZAAAAANrCrYaxC6PpkQBYcmOASFJjXht1"
            style={{marginBottom: "0.5rem"}}
            onChange={value => this.setState({...this.state, captcha: !empty(value)})}
          />
          <Button variant="contained" fullWidth style={{backgroundColor: !emptyCheck ? "" : "#002868", color: !emptyCheck ? "" : "white", marginBottom: "1rem"}} size="large" disabled={emptyCheck}>Register</Button>
          <div style={{display: "flex", alignItems: "center", marginBottom: "1rem", width: "100%"}}>
            <Divider style={{flex: 1, marginRight: "1rem"}}/>
            <span style={{fontSize: "0.9rem", color: "#002868"}}>or</span>
            <Divider style={{flex: 1, marginLeft: "1rem"}}/>
          </div>
          <Link to={`/login/${role}`} style={{width: "100%"}}><Button variant="contained" fullWidth style={{backgroundColor: "#002868", color: "white"}} size="large">Login</Button></Link>
        </Grid>
  		</Grid>
  	);
  }
}

const mapStateToProps = state => ({
  dark: state.dark
});
 
export default connect(mapStateToProps,{})(Register);

