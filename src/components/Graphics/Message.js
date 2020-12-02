import React, {Component, Fragment} from 'react';
import empty from 'is-empty';
import moment from 'moment-timezone';
import jstz from 'jstz';

class Message extends Component {
  render() {
  	const {message, prevMessage, userMessage, theme, lastMessage, userTyping} = this.props;

  	const calendarFormats = {
			sameDay: '[Today]',
	    nextDay: '[Tomorrow]',
	    nextWeek: 'dddd',
	    lastDay: '[Yesterday]',
	    lastWeek: 'dddd',
	    sameElse: 'MMMM Do'
		}

		const displayDate = empty(prevMessage) ? false : moment.utc(message.timestamp).diff(moment.utc(prevMessage.timestamp), 'minutes') > 60;

  	return(
  		<Fragment>
	  		{(empty(prevMessage) || displayDate) && (<div style={{display: 'flex', justifyContent: "center", alignItems: "center", width: "100%", marginBottom: "0.25rem", marginTop: empty(prevMessage) ? "0.5rem" : ""}}>
	  			<span style={{fontSize: "0.75rem", color: "#aaaaaa"}}>{moment.utc(message.timestamp).tz(jstz.determine().name()).calendar(null, calendarFormats)}</span>
	  		</div>)}
	  		<div style={{display: 'flex', justifyContent: userMessage ? "flex-end" : "flex-start", alignItems: "center", width: "100%", marginTop: "0.15rem", marginBottom: lastMessage && !userMessage && !userTyping ? "1rem" : ""}}>
	  			<div style={{borderRadius: "0.75rem", backgroundColor: userMessage ? theme.primary.light : 'rgb(238, 238, 238)', padding: "0.5rem 0.75rem", maxWidth: "70%"}}>
	  				<span style={{fontSize: "0.9rem"}}>{message.message}</span>
	  			</div>
	  		</div>
	  		{lastMessage && userMessage && (<div style={{display: 'flex', justifyContent: "flex-end", alignItems: "center", width: "100%", marginTop: "0.1rem", marginBottom: "1rem"}}>
	  			<span style={{fontSize: "0.65rem", color: "#aaaaaa"}}>Delivered</span>
	  		</div>)}
  		</Fragment>
  	);
  }
}
 
export default Message;