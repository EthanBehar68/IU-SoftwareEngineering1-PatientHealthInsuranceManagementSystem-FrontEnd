import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import withToast from '../../utils/withToast';
import { connect } from "react-redux";
import moment from 'moment';
import empty from 'is-empty';

import { Grid, Divider, Button, TextField } from '@material-ui/core';
import { Menu, NavigateNext, NavigateBefore, CheckCircle } from '@material-ui/icons';

import Loading from '../Graphics/Loading';
import Message from '../Graphics/Message';

import {add_message, user_typing, state_update_conversation, socket_join_page, socket_leave_page} from '../../store/actions/conversations';

class Chat extends Component {
	constructor(props) {
		super(props);
		this.timeout = 0;
		this.timeout2 = 0;
		this.state = {
			loaded: false,
			chat: {
				id: this.props.user.id,
				usertype: this.props.user.usertype,
				room_id: `${this.props.appointment.id}appt`,
				message: ''
			}
		}
	}

	async componentDidMount() {
		this.props.socket_join_page({id: this.props.user.id, usertype: this.props.user.usertype, room_id: `${this.props.appointment.id}appt`});
		this.props.state_update_conversation({room_id: `${this.props.appointment.id}appt`, unread: 0, meConnected: true});
		this.setState({ ...this.state, loaded: true }); 
		this.messagesEnd.scrollTop = this.messagesBottom.offsetTop;
	}

	componentWillUnmount() {
		this.props.socket_leave_page({id: this.props.user.id, usertype: this.props.user.usertype, room_id: `${this.props.appointment.id}appt`});
		this.props.state_update_conversation({room_id: `${this.props.appointment.id}appt`, meConnected: false});
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.conversations !== this.props.conversations) {
			this.messagesEnd.scrollTop = this.messagesBottom.offsetTop;
		}
	}

	handleChatChange = e => {
		e.preventDefault();
		if(this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.user_typing({room_id: this.state.chat.room_id, userTyping: true});
    }, 200);
    if(this.timeout2) clearTimeout(this.timeout2);
    this.timeout2 = setTimeout(() => {
      this.props.user_typing({room_id: this.state.chat.room_id, userTyping: false});
    }, 3000);
    this.setState({
      ...this.state,
      chat: {
        ...this.state.chat,
       	message: e.target.value
      }
    })
  }

  sendChat = () => {
  	this.props.add_message(this.state.chat);
  	this.props.user_typing({room_id: this.state.chat.room_id, userTyping: false});
  	this.setState({...this.state, chat: {...this.state.chat, message: ""}});
  }

	render() {
		const { maxWidth, small, xs, theme, appointment, user, otherUser } = this.props;
		const { loaded, chat } = this.state;

		const conversation = this.props.conversations.filter(convo => convo.room_id === `${appointment.id}appt`)[0];

		return (
			<Fragment>
				{!loaded && (<Loading />)}
				<Grid xs={12} container item>
					<Grid xs={12} container item justify="space-between" alignItems="center">
						<span style={{ fontSize: "1.5rem", fontWeight: 400 }}>Chat</span>
						<div style={{display: "flex", alignItems: "center"}}>
							<span style={{ fontSize: "0.9rem", fontWeight: 300 }}>{otherUser} {empty(conversation) ? "" : conversation.userConnected ? "connected" : "not connected"}</span>
							{!empty(conversation) && (<div style={{backgroundColor: conversation.userConnected ? "green" : "red", width: "0.75rem", height: "0.75rem", borderRadius: "50%", marginLeft: "0.25rem"}}/>)}
						</div>
						<Divider style={{width: "100%", marginBottom: "0.75rem", marginTop: "0.5rem"}}/>
					</Grid>
					<Grid xs={12} container direction="column" item style={{border: `1px solid ${theme.primary.main}`, borderRadius: 3, height: "30rem", maxHeight: "70vh", overflowY: 'scroll', padding: "0 0.5rem", position: "relative", paddingBottom: "calc(40px + 1rem)"}}>

						<div style={{height: "100%", overflowY: "scroll"}} ref={(el) => { this.messagesEnd = el; }}>
							{!empty(conversation) && (<Fragment>
								{conversation.messages.map((message, i) => (
									<Message 
										key={i}
										message={message}
										prevMessage={i !== 0 ? conversation.messages[i - 1] : ''}
										theme={theme}
										userMessage={message.user_id === user.id}
										lastMessage={conversation.messages.length - 1 === i}
										userTyping={conversation.userTyping}
									/>
								))}
								{conversation.userTyping && (<div style={{display: 'flex', alignItems: "center", width: "100%", marginTop: "0.15rem", marginBottom: "1rem"}}>
									<div style={{backgroundColor: 'rgb(238, 238, 238)', display: "flex", alignItems: "center", justifyContent: "center", padding: "0.1rem 0.6rem", borderRadius: 1000}}>
										<span style={{fontSize: "1.4rem", linHeight: "2rem", color: "#aaaaaa", paddingBottom: "0.15rem"}}>•••</span>
									</div>
								</div>)}
							</Fragment>)}
							<div ref={(el) => { this.messagesBottom = el; }}/>
						</div>

						<div style={{position: "absolute", bottom: 0, left: 0, width: "100%", padding: "0.5rem", backgroundColor: "rgb(238, 238, 238)"}}>
							<div style={{position: "relative", width: "calc(100% - 1rem)"}}>
								<TextField
	                size="small"
	                variant="outlined"
	                value={chat.message}
	                name="message"
	                multiline
	                onChange={this.handleChatChange}
	                color="primary"
	                inputProps={{
	                  placeholder: "Message...",
	                  maxLength: "1000"
	                }}
	                InputProps={{
	                	style: {
	                		paddingRight: "2.5rem"
	                	}
	                }}
	                style={{width: "100%", backgroundColor: "white"}}
	              />
	              <div style={{position: "absolute", right: 0, top: 0, display: "flex", justifyContent: "flex-end", alignItems: "flex-end", height: "100%", paddingRight: "0.3rem"}}>
	              	<div style={{borderRadius: "50%", display: "flex", paddingBottom: "0.3rem"}}>
	              		<CheckCircle onClick={empty(chat.message) ? () => {} : this.sendChat} style={{width: "1.8rem", height: '1.8rem', color: empty(chat.message) ? "#dddddd" : theme.secondary.main, cursor: empty(chat.message) ? "" : "pointer"}}/>
	              	</div>
	              </div>
              </div>
						</div>
					</Grid>
				</Grid>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
  user: state.user,
  conversations: state.conversations
});

export default connect(mapStateToProps, { add_message, user_typing, state_update_conversation, socket_join_page, socket_leave_page })(withRouter(withToast(Chat)));

