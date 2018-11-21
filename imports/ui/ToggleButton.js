/**
 * fa-arrow-down
 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class ToggleButton extends Component {
	/**
	 * [render description]
	 * @return {[type]} [description]
	 */
	render () {
		return (
			<Button id={this.props.id} value={this.props.text} onClick={this.props.handleClick}>
				<i className="fa {{  }} fa-2x"></i>
				{this.props.text}
			</Button>
		);
	}
}

export default ToggleButton;
