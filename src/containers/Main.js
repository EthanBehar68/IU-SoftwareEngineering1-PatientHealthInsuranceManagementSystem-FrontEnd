import React, {Component, Fragment} from 'react';
import {Route, withRouter, Redirect, Switch} from 'react-router-dom';
import PrivateRoute from '../components/Nav/PrivateRoute';
import {connect} from "react-redux";

import {Grid, withWidth, withTheme, ThemeProvider} from '@material-ui/core';
import {createMuiTheme} from '@material-ui/core/styles';

import {state_set_dark} from '../store/actions/dark';

import Navbar from '../components/Nav/Navbar';
import Footer from '../components/Nav/Footer';

import Home from './Static/Home';
import About from './Static/About';
import LoginWrapper from './Login/LoginWrapper';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false
		};
	}

	render() {
		const {width, dark} = this.props;

		const small = width === "xs" || width === "sm";
		const xs = width === "xs";

		const maxWidth = small ? "100%" : "60rem";

		const theme = createMuiTheme({
		  typography: {
		    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
		  },
		  palette: {
		    primary: {
		      main: dark ? "#fff" : "#002868",
		      contrastText: dark ? "#002868" : "#fff"
		    },
		    secondary: {
		      main: dark ? "#fff" : "#bf0a30",
		      contrastText: dark ? "#bf0a30" : "#fff"
		    },
		    background: {
		      main: dark ? "#002868" : "#fff",
		      shadow: dark ? "rgba(0,0,0,0.4)" : "rgba(233,233,233,1.0)"
		    }
		  }
		});

		return (
			<ThemeProvider theme={theme}>
				<Grid container item direction="column" xs={12}>
					<Navbar maxWidth={maxWidth} xs={xs} small={small} theme={theme.palette} dark={dark} state_set_dark={this.props.state_set_dark}/>
					<Switch>
						<Route exact path='/' component={() => <Home maxWidth={maxWidth} xs={xs} small={small} theme={theme.palette}/>} />
						<Route exact path='/about' component={() => <About maxWidth={maxWidth} xs={xs} small={small} theme={theme.palette}/>} />
						<Route exact path='/register/:role' component={() => <LoginWrapper maxWidth={maxWidth} xs={xs} small={small} theme={theme.palette} login={false}/>} />
						<Route exact path='/register' component={() => <LoginWrapper maxWidth={maxWidth} xs={xs} small={small} theme={theme.palette} login={false}/>} />
						<Route exact path='/login/:role' component={() => <LoginWrapper maxWidth={maxWidth} xs={xs} small={small} theme={theme.palette} login/>} />
						<Route exact path='/login' component={() => <LoginWrapper maxWidth={maxWidth} xs={xs} small={small} theme={theme.palette} login/>} />
						<Route path='*' component={() => <Home maxWidth={maxWidth} xs={xs} small={small} theme={theme.palette}/>} />
		      </Switch>
		      <Footer maxWidth={maxWidth} xs={xs} small={small} theme={theme.palette} dark={dark} state_set_dark={this.props.state_set_dark}/>
	      </Grid>
      </ThemeProvider>
		)
	}
}

const mapStateToProps = state => ({
	dark: state.dark
});

export default connect(mapStateToProps,{state_set_dark})(withRouter(withWidth()(Main)));
