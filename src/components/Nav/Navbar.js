import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {Grid, Button, ButtonBase, Switch, SwipeableDrawer, ListItem, ListItemText} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

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
  	const {maxWidth, small, xs, theme, dark} = this.props;
  	const {open} = this.state;

  	return(
  		<Grid xs={12} container item direction="column" alignItems="center" style={{background: theme.background.main, zIndex: 100}}>
	  		<Grid container item xs={12} style={{padding: "1.2rem 1rem 1rem", boxShadow: `0 3px 5px ${theme.background.shadow}`, justifyContent: "center", zIndex: 98}}>
	  			<Grid container item justify="space-between" alignItems="center" xs={12} style={{maxWidth: maxWidth}}>
	  				<Link to="/" style={{display: 'flex', alignItems: 'center'}}><img src={dark ? darklogo : logo} style={{height: "1.2rem"}} alt=""/></Link>
	  				{!small && (<div style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
	  					<Link to="/about" style={{marginRight: "0.9rem", padding: "3px 9px"}}>
	  						<span style={{fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75, color: theme.primary.main}}>ABOUT US</span>
	  					</Link>
	  					<Link to="#" style={{marginRight: "1.1rem", padding: "3px 9px"}}>
	  						<span style={{fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75, color: theme.primary.main}}>SIGN UP</span>
	  					</Link>
	  					<Link to="#">
	  						<Button variant="outlined" color="primary" size="small">
	  							Sign In
	  						</Button>
	  					</Link>
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
			          	<Link to="#">
				            <ListItem button style={{minWidth: "15rem", padding: "0.7rem 1.2rem"}}>
					  					<span style={{fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75, color: theme.primary.main}}>ABOUT US</span>
					          </ListItem>
				          </Link>
				          <Link to="#">
				            <ListItem button style={{minWidth: "15rem", padding: "0.7rem 1.2rem"}}>
					  					<span style={{fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75, color: theme.primary.main}}>SIGN UP</span>
					          </ListItem>
				          </Link>
				          <Link to="#">
				            <ListItem button style={{minWidth: "15rem", padding: "0.7rem 1.2rem"}}>
					  					<span style={{fontWeight: 700, fontSize: "0.875rem", lineHeight: 1.75, color: theme.primary.main}}>SIGN IN</span>
					          </ListItem>
				          </Link>
			          </Grid>
		          </SwipeableDrawer>
		        )}
	  			</Grid>
	  		</Grid>
  		</Grid>
  	);
  }
}
 
export default Navbar;