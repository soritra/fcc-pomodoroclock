/**
 * 
 */
import React, { Component } from 'react';

class Timer extends Component {
	/**
	 * [render description]
	 * @return {[type]} [description]
	 */
	render () {
		return (
			<div>
				<div id="timer-label">{this.props.label}</div>
				<div id="time-left">
					{this.props.value}
				</div>
			</div>
		);
	}

	/**
	 * [componentWillReceiveProps description]
	 * @param  {[type]} props [description]
	 */
	componentWillReceiveProps(props) {
        
  }
}

export default Timer;
