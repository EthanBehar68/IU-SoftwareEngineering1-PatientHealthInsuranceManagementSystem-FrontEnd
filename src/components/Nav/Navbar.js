import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import empty from 'is-empty';

import {Grid, Button, ButtonBase, Switch, SwipeableDrawer, ListItem, ListItemText} from '@material-ui/core';
import {Menu, AccountCircle, ChatBubble, Home} from '@material-ui/icons';

import {logo, darklogo} from '../../utils/images';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		}
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
  	const {maxWidth, small, xs, theme, dark, user, conversations} = this.props;
  	const {open} = this.state;

  	const unreadCount = conversations.map(convo => convo.unread).reduce((a,b) => a + b, 0);

  	return(
  		<Grid xs={12} container item direction="column" alignItems="center" style={{background: theme.background.main, zIndex: 100}}>
	  		<Grid container item xs={12} style={{padding: "1.2rem 1rem 1rem", boxShadow: `0 3px 5px ${theme.background.shadow}`, justifyContent: "center", zIndex: 98}}>
	  			<Grid container item justify="space-between" alignItems="center" xs={12} style={{maxWidth: maxWidth}}>
	  				<Link to="/" style={{display: 'flex', alignItems: 'center'}}><img src={dark ? darklogo : logo} style={{height: "1.2rem"}} alt=""/></Link>
	  				{!small && (<div style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
	  					{empty(user) && (<Fragment>
		  					<Link to="/register" style={{marginRight: "1.1rem", padding: "3px 9px"}}>
		  						<span style={{fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75, color: theme.primary.main}}>Register</span>
		  					</Link>
		  					<Link to="/login">
		  						<Button variant="outlined" color="primary" size="small">
		  							Login
		  						</Button>
		  					</Link>
	  					</Fragment>)}
	  					{!empty(user) && (<Fragment>
	  						{user.usertype === "patient" && (<Link to={`/patient/dashboard`} style={{marginLeft: "0.7rem", padding: "3px 9px"}}>
	  							<Home style={{fontSize: "1.25rem", marginTop: "0.25rem", lineHeight: 1.75, color: theme.primary.main}}/>
	  						</Link>)}
	  						{user.usertype === "patient" && (<Link to={`/patient/find`} style={{marginLeft: "0.7rem", padding: "3px 9px"}}>
	  							<span style={{fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75, color: theme.primary.main}}>Find a Doctor</span>
	  						</Link>)}
	  						{user.usertype === "patient" && (<Link to={`/patient/insurance`} style={{marginLeft: "0.7rem", padding: "3px 9px"}}>
	  							<span style={{fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75, color: theme.primary.main}}>Insurance</span>
	  						</Link>)}
	  						{user.usertype === "patient" && (<Link to={`/patient/appointments`} style={{marginLeft: "0.7rem", padding: "3px 9px", position: "relative"}}>
	  							<span style={{fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75, color: theme.primary.main}}>My Appointments</span>
	  							{!empty(unreadCount) && (<div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "1rem", height: "1rem", borderRadius: "50%", backgroundColor: "red", position: 'absolute', top: 0, right: "-0.2rem"}}>
	  								<span style={{color: "white", fontSize: "0.25rem", lineHeight: "0.25rem"}}>{unreadCount > 99 ? "99+" : unreadCount}</span>
	  							</div>)}
	  						</Link>)}
	  						{user.usertype === "doctor" && (<Link to={`/doctor/schedule`} style={{marginLeft: "0.7rem", padding: "3px 9px"}}>
	  							<span style={{fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75, color: theme.primary.main}}>My Schedule</span>
	  						</Link>)}
	  						{user.usertype === "doctor" && (<Link to={`/doctor/appointments`} style={{marginLeft: "0.7rem", padding: "3px 9px", position: "relative"}}>
	  							<ChatBubble style={{fontSize: "1.25rem", marginTop: "0.25rem", lineHeight: 1.75, color: theme.primary.main}}/>
	  							{!empty(unreadCount) && (<div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "1rem", height: "1rem", borderRadius: "50%", backgroundColor: "red", position: 'absolute', top: 0, right: 0}}>
	  								<span style={{color: "white", fontSize: "0.25rem", lineHeight: "0.25rem"}}>{unreadCount > 99 ? "99+" : unreadCount}</span>
	  							</div>)}
	  						</Link>)}
	  						{user.usertype === "insurance" && (<Link to={`/insurance/plans`} style={{marginLeft: "0.7rem", padding: "3px 9px"}}>
	  							<span style={{fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75, color: theme.primary.main}}>Plans</span>
	  						</Link>)}
	  						<Link to={`/${user.usertype}/account`} style={{marginLeft: "1.2rem"}}>
		  						<Button variant="outlined" color="primary" size="small" style={{display: "flex", alignItems: "center"}}>
		  							<AccountCircle style={{fontSize: "1rem"}}/>
		  							<span style={{margin: "0 0.25rem 0 0.15rem"}}>{user.fname}</span>
		  						</Button>
		  					</Link>
	  					</Fragment>)}
	  				</div>)}
	  				{small && (<ButtonBase onClick={() => this.setState({...this.state, open: true})}>
	  					<Menu style={{fontSize: "1.5rem", color: theme.primary.main}} />
	  				</ButtonBase>)} 
	  				{small && (
	  					<SwipeableDrawer
		            anchor="right"
		            open={this.state.open}
		            onClose={() => this.setState({...this.state, open: false})}
		            onOpen={() => this.setState({...this.state, open: true})}
		          >
		          	<Grid direction="column" style={{background: theme.background.main, height: "100%", paddingTop: "0.5rem"}}>
		          		{empty(user) && (<Fragment>
					          <Link to="/register">
					            <ListItem button style={{minWidth: "15rem", padding: "0.2rem 1.2rem"}}>
						  					<span style={{fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75, color: theme.primary.main}}>Register</span>
						          </ListItem>
					          </Link>
					          <Link to="/login">
					            <ListItem button style={{minWidth: "15rem", padding: "0.2rem 1.2rem"}}>
						  					<span style={{fontWeight: 700, fontSize: "0.875rem", lineHeight: 1.75, color: theme.primary.main}}>Login</span>
						          </ListItem>
					          </Link>
				          </Fragment>)}
				          {!empty(user) && (<Fragment>
			  						{user.usertype === "patient" && (<Link to={`/patient/find`} style={{marginRight: "1.1rem", padding: "3px 9px"}}>
			  							<ListItem button style={{minWidth: "15rem", padding: "0.2rem 1.2rem"}}>
			  								<span style={{fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75, color: theme.primary.main}}>Find a Doctor</span>
			  							</ListItem>
			  						</Link>)}
			  						{user.usertype === "patient" && (<Link to={`/patient/insurance`} style={{marginRight: "1.1rem", padding: "3px 9px"}}>
			  							<ListItem button style={{minWidth: "15rem", padding: "0.2rem 1.2rem"}}>
			  								<span style={{fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75, color: theme.primary.main}}>Insurance</span>
			  							</ListItem>
			  						</Link>)}
			  						{user.usertype === "patient" && (<Link to={`/patient/schedule`} style={{marginRight: "1.1rem", padding: "3px 9px"}}>
			  							<ListItem button style={{minWidth: "15rem", padding: "0.2rem 1.2rem"}}>
			  								<span style={{fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75, color: theme.primary.main}}>My Appointments</span>
			  							</ListItem>
			  						</Link>)}
			  						{user.usertype === "doctor" && (<Link to={`/doctor/schedule`} style={{marginRight: "1.1rem", padding: "3px 9px"}}>
			  							<ListItem button style={{minWidth: "15rem", padding: "0.2rem 1.2rem"}}>
			  								<span style={{fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75, color: theme.primary.main}}>My Schedule</span>
			  							</ListItem>
			  						</Link>)}
			  						{user.usertype === "doctor" && (<Link to={`/doctor/appointments`} style={{marginRight: "1.1rem", padding: "3px 9px"}}>
			  							<ListItem button style={{minWidth: "15rem", padding: "0.2rem 1.2rem"}}>
			  								<span style={{fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75, color: theme.primary.main}}>Messages</span>
			  							</ListItem>
			  						</Link>)}
			  						{user.usertype === "insurance" && (<Link to={`/insurance/plans`} style={{marginRight: "1.1rem", padding: "3px 9px"}}>
			  							<ListItem button style={{minWidth: "15rem", padding: "0.2rem 1.2rem"}}>
			  								<span style={{fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75, color: theme.primary.main}}>Plans</span>
			  							</ListItem>
			  						</Link>)}
			  						<Link to={`/${user.usertype}/account`}>
			  							<ListItem button style={{minWidth: "15rem", padding: "0.2rem 1.2rem"}}>
					  						<Button variant="outlined" color="primary" size="small" style={{display: "flex", alignItems: "center"}}>
					  							<AccountCircle style={{fontSize: "1rem"}}/>
					  							<span style={{margin: "0 0.25rem 0 0.15rem"}}>{user.fname}</span>
					  						</Button>
				  						</ListItem>
				  					</Link>
			  					</Fragment>)}
			          </Grid>
		          </SwipeableDrawer>
		        )}
	  			</Grid>
	  		</Grid>
  		</Grid>
  	);
  }
}

const mapStateToProps = state => ({
  user: state.user,
  conversations: state.conversations
});
 
export default connect(mapStateToProps, { })(withRouter(Navbar));

