import React, {Component, Fragment} from 'react';

class NumberInput extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		const {job} = this.props;
		return (
			<div className="number-input" style={{...this.props.style, backgroundColor: this.props.color}}>
				<span>$</span>
				<input min="0" type="number" className="text-field" style={{...this.props.inputStyle, backgroundColor: "rgba(188,190,192,0)", width: "100%"}} id={this.props.id} onChange={this.props.onChange} value={this.props.value}/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  
});

export default NumberInput;
