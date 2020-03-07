import React, {Component, Fragment} from 'react';
import ErrorInterior from './ErrorInterior';

class ErrorBanner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: this.props.visible
		};
	}

	onHide = () => {
		this.props.onHide();
	}

	render() {
		return (
			<Fragment>
				<ErrorInterior style={{...this.props.style}} error={this.props.error} onHide={this.onHide}/>
			</Fragment>
		)
	}
}

export default ErrorBanner;
