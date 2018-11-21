/**
 * 
 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class PlayButton extends Component {
	/**
	 * [render description]
	 * @return {[type]} [description]
	 */
	render () {
		return (
			<div>
				<Button id={this.props.id} onClick={this.props.handleClick}>
					<i className="fa fa-play fa-2x"></i>
          			<i className="fa fa-pause fa-2x"></i>
          			{this.props.text}
				</Button>
			</div>
		);
	}
}

export default PlayButton;
