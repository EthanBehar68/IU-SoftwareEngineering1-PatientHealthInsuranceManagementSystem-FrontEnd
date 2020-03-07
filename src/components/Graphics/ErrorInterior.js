import React, {Component, Fragment} from 'react';

class ErrorInterior extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount(){
    setTimeout(() => {this.props.onHide()}, 3000);
  }

	render() {
		return (
			<div className="error-banner" style={{...this.props.style}}>
				<span className="error-text">{this.props.error}</span>
			</div>
		)
	}
}

export default ErrorInterior;
