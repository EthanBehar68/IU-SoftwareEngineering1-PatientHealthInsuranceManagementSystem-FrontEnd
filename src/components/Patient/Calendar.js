import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

import {Grid, Divider, Button} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

import {addWeekday} from '../../utils/addWeekday';

class Calendar extends Component {
	constructor(props) {
		super(props);
	}

  render() {
  	const {maxWidth, small, xs, theme, dark} = this.props;

  	return(
  		<Grid xs={12} container item>
        <span style={{fontSize: "1.5rem", fontWeight: 400, width: "100%", marginBottom: "0.5rem"}}>Book an Appointment</span>
  			<Grid container item xs={2} direction="column" style={{borderRight: "1px solid #ddd"}}>
  				<div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "0.5rem"}}/>
  				<div style={{display: "flex", height: '3rem', alignItems: 'center', position: "relative"}}>
  					<span style={{fontWeight: 300, fontSize: "0.8rem", flex: 1}}>9 am</span>
  					<Divider style={{flex: 1}}/>
  					<Divider style={{width: "25%", position: "absolute", right: 0, bottom: 0}}/>
  				</div>
  				<div style={{display: "flex", height: '3rem', alignItems: 'center', position: "relative"}}>
  					<span style={{fontWeight: 300, fontSize: "0.8rem", flex: 1}}>10 am</span>
  					<Divider style={{flex: 1}}/>
  					<Divider style={{width: "25%", position: "absolute", right: 0, bottom: 0}}/>
  				</div>
  				<div style={{display: "flex", height: "3rem", alignItems: 'center', position: "relative"}}>
  					<span style={{fontWeight: 300, fontSize: "0.8rem", flex: 1}}>11 am</span>
  					<Divider style={{flex: 1}}/>
  					<Divider style={{width: "25%", position: "absolute", right: 0, bottom: 0}}/>
  				</div>
  				<div style={{display: "flex", height: "3rem", alignItems: 'center', position: "relative"}}>
  					<span style={{fontWeight: 300, fontSize: "0.8rem", flex: 1}}>12 pm</span>
  					<Divider style={{flex: 1}}/>
  					<Divider style={{width: "25%", position: "absolute", right: 0, bottom: 0}}/>
  				</div>
  				<div style={{display: "flex", height: "3rem", alignItems: 'center', position: "relative"}}>
  					<span style={{fontWeight: 300, fontSize: "0.8rem", flex: 1}}>1 pm</span>
  					<Divider style={{flex: 1}}/>
  					<Divider style={{width: "25%", position: "absolute", right: 0, bottom: 0}}/>
  				</div>
  				<div style={{display: "flex", height: "3rem", alignItems: 'center', position: "relative"}}>
  					<span style={{fontWeight: 300, fontSize: "0.8rem", flex: 1}}>2 pm</span>
  					<Divider style={{flex: 1}}/>
  					<Divider style={{width: "25%", position: "absolute", right: 0, bottom: 0}}/>
  				</div>
  				<div style={{display: "flex", height: "3rem", alignItems: 'center', position: "relative"}}>
  					<span style={{fontWeight: 300, fontSize: "0.8rem", flex: 1}}>3 pm</span>
  					<Divider style={{flex: 1}}/>
  					<Divider style={{width: "25%", position: "absolute", right: 0, bottom: 0}}/>
  				</div>
  				<div style={{display: "flex", height: "3rem", alignItems: 'center', position: "relative"}}>
  					<span style={{fontWeight: 300, fontSize: "0.8rem", flex: 1}}>4 pm</span>
  					<Divider style={{flex: 1}}/>
  					<Divider style={{width: "25%", position: "absolute", right: 0, bottom: 0}}/>
  				</div>
  				<div style={{display: "flex", height: "1.5rem", alignItems: 'flex-end', position: "relative"}}>
  					<span style={{fontWeight: 300, fontSize: "0.8rem", flex: 1, marginBottom: "-0.4rem"}}>5 pm</span>
  					<Divider style={{flex: 1}}/>
  				</div>
  			</Grid>
  			<Grid container item xs={2} direction="column" style={{borderRight: "1px solid #ddd", position: "relative"}}>
  				<Divider style={{width: "100%", position: "absolute", right: 0, bottom: 0, color: "#ddd"}}/>
  				<div style={{borderBottom: "1px solid #ddd", borderTop: "1px solid #ddd", display: "flex", justifyContent: "center", alignItems: "center", height: "calc(2rem - 2px)"}}>
  					<span style={{fontWeight: 300, fontSize: "0.8rem"}}>{moment.utc().format('ddd, M/D')}</span>
  				</div>
  				{[...Array(16)].map(row => (
  					<Button style={{height: "1.5rem"}}>
  						<span style={{fontSize: "0.8rem", fontWeight: 300}}>BOOK</span>
  					</Button>
  				))}
  			</Grid>
  			<Grid container item xs={2} direction="column" style={{borderRight: "1px solid #ddd", position: "relative"}}>
  				<Divider style={{width: "100%", position: "absolute", right: 0, bottom: 0, color: "#ddd"}}/>
  				<div style={{borderBottom: "1px solid #ddd", borderTop: "1px solid #ddd", display: "flex", justifyContent: "center", alignItems: "center", height: "calc(2rem - 2px)"}}>
  					<span style={{fontWeight: 300, fontSize: "0.8rem"}}>{addWeekday(moment.utc(), 1).format('ddd, M/D')}</span>
  				</div>
  				{[...Array(16)].map(row => (
  					<Button style={{height: "1.5rem"}}>
  						<span style={{fontSize: "0.8rem", fontWeight: 300}}>BOOK</span>
  					</Button>
  				))}
  			</Grid>
  			<Grid container item xs={2} direction="column" style={{borderRight: "1px solid #ddd", position: "relative"}}>
  				<Divider style={{width: "100%", position: "absolute", right: 0, bottom: 0, color: "#ddd"}}/>
  				<div style={{borderBottom: "1px solid #ddd", borderTop: "1px solid #ddd", display: "flex", justifyContent: "center", alignItems: "center", height: "calc(2rem - 2px)"}}>
  					<span style={{fontWeight: 300, fontSize: "0.8rem"}}>{addWeekday(moment.utc(), 2).format('ddd, M/D')}</span>
  				</div>
  				{[...Array(16)].map(row => (
  					<Button style={{height: "1.5rem"}}>
  						<span style={{fontSize: "0.8rem", fontWeight: 300}}>BOOK</span>
  					</Button>
  				))}
  			</Grid>
  			<Grid container item xs={2} direction="column" style={{borderRight: "1px solid #ddd", position: "relative"}}>
  				<Divider style={{width: "100%", position: "absolute", right: 0, bottom: 0, color: "#ddd"}}/>
  				<div style={{borderBottom: "1px solid #ddd", borderTop: "1px solid #ddd", display: "flex", justifyContent: "center", alignItems: "center", height: "calc(2rem - 2px)"}}>
  					<span style={{fontWeight: 300, fontSize: "0.8rem"}}>{addWeekday(moment.utc(), 3).format('ddd, M/D')}</span>
  				</div>
  				{[...Array(16)].map(row => (
  					<Button style={{height: "1.5rem"}}>
  						<span style={{fontSize: "0.8rem", fontWeight: 300}}>BOOK</span>
  					</Button>
  				))}
  			</Grid>
  			<Grid container item xs={2} direction="column" style={{borderRight: "1px solid #ddd", position: "relative"}}>
  				<Divider style={{width: "100%", position: "absolute", right: 0, bottom: 0, color: "#ddd"}}/>
  				<div style={{borderBottom: "1px solid #ddd", borderTop: "1px solid #ddd", display: "flex", justifyContent: "center", alignItems: "center", height: "calc(2rem - 2px)"}}>
  					<span style={{fontWeight: 300, fontSize: "0.8rem"}}>{addWeekday(moment.utc(), 4).format('ddd, M/D')}</span>
  				</div>
  				{[...Array(16)].map(row => (
  					<Button style={{height: "1.5rem"}}>
  						<span style={{fontSize: "0.8rem", fontWeight: 300}}>BOOK</span>
  					</Button>
  				))}
  			</Grid>
  		</Grid>
  	);
  }
}
 
export default Calendar;