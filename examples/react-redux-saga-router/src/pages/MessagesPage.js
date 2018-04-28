import React, { Component } from "react";
import { connect } from "react-redux";
import {getMessageById, getMessagesIds, shouldDeleteMessage, shouldSaveMessage} from "../ducks/messages";

export const Messages = connect(null, dispatch => ({
	onSubmit: submitEvent => {
		submitEvent.preventDefault();
		dispatch(shouldSaveMessage(window.message.value));
		window.message.value = "";
	}
}))(
	class Messages extends Component {
		render() {
			return (
				<React.Fragment>
					<MessageList />
					<hr />
					<form onSubmit={this.props.onSubmit}>
						<textarea name="message" id="message" cols="30" rows="10" />
						<input type="submit" />
					</form>
				</React.Fragment>
			);
		}
	}
);

export const MessageList = connect(state => ({
	ids: getMessagesIds(state)
}))(
	class MessageList extends React.Component {
		render() {
			const haveItems = Array.isArray(this.props.ids) && this.props.ids.length > 0;
			return (
				<React.Fragment>
					<ul>
						{haveItems ? (
							this.props.ids.map(id => <MessageItem key={id} id={id} />)
						) : (
							<li>Empty!</li>
						)}
					</ul>
				</React.Fragment>
			);
		}
	}
);

export const MessageItem = connect(
	(state, ownProps) => ({
		data: getMessageById(state, ownProps.id)
	}),
	dispatch => ({
		deleteItem: id => dispatch(shouldDeleteMessage(id))
	}),
	(stateProps, dispatchProps, ownProps) =>
		Object.assign(
			{},
			stateProps,
			{
				onClick: () => dispatchProps.deleteItem(ownProps.id)
			},
			ownProps
		)
)(
	class MessageItem extends Component {
		render() {
			return (
				<li>
					{this.props.data.text}
					<span> </span>
					<button type="button" title="Delete" onClick={this.props.onClick}>
						X
					</button>
				</li>
			);
		}
	}
);
