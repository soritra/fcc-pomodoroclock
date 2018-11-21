/**
 *
 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class ResetButton extends Component {
	/**
	 * [render description]
	 * @return {[type]} [description]
	 */
	render () {
		return (
			<div>
				<Button id={this.props.id} onClick={this.props.handleClick}>
					<i className="fa fa-refresh fa-2x"></i>
					Reset
				</Button>
			</div>
		);
	}
}

export default ResetButton;
