import React, {Component, Fragment} from 'react';

class YesNo extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{...this.props.style, display: "flex", borderRadius: 6, border: `2px solid ${this.props.color}`, width: "8rem"}}>
				<div onClick={() => this.props.onClick('YES')} style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem 0.75rem", backgroundColor: this.props.value === "YES" ? this.props.color : "white", cursor: "pointer", borderTopLeftRadius: 4, borderBottomLeftRadius: 4}}>
					<span style={{fontSize: "0.9rem", color: this.props.value === "YES" ?  "white" : this.props.color}}>YES</span>
				</div>
				<div onClick={() => this.props.onClick('NO')} style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem 0.75rem", backgroundColor: this.props.value === "NO" ? this.props.color : "white", cursor: "pointer", borderTopRightRadius: 4, borderBottomRightRadius: 4}}>
					<span style={{fontSize: "0.9rem", color: this.props.value === "NO" ?  "white" : this.props.color}}>NO</span>
				</div>
			</div>
		)
	}
}

export default YesNo;
