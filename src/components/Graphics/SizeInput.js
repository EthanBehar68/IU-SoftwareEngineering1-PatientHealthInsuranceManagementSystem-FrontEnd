import React, {Component, Fragment} from 'react';

class SizeInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	
    }
  }

  render() {
    const {size, total} = this.props;
    return (
			<div className="size-input-choice" style={{width: total == 1 ? "100%" : `calc((100% - 4rem) / ${total})`}}>
				<input className="size-input" id={size} type="number" pattern="\d*" onChange={this.props.onChange}/>
				<span>{size}</span>
			</div>
    );
  }
}

export default SizeInput;
