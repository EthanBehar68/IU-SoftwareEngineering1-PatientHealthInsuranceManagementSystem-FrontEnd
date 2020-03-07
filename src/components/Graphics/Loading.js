import React, {Component} from 'react';
import Lottie from 'lottie-react-web';

import loading from '../../images/loading';

class Loading extends Component {
  render() {

  	const defaultOptions = {
	    loop: true,
	    autoplay: true, 
	    animationData: loading
	  };

  	return(
  		<div className="dead-center">
	      <Lottie
	        options={defaultOptions}
	        width="180px"
					height="180px"
	      />
	    </div>
  	);
  }
}
 
export default Loading;