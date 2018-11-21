/**
 * 
 */
import React, { Component } from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';

import ToggleButton from './ToggleButton';

class LengthControl extends Component {
	/**
	 * [render description]
	 * @return {[type]} [description]
	 */
	render () {
		return (
      <Grid className="control-grid">
        <Row className="show-grid">
          <Col className="" xs={12} sm={12} md={12}>
            {this.props.type} Length
          </Col>
        </Row>
        <Row className="show-grid">
          <Col className="" xs={4} sm={4} md={4}>
            <ToggleButton id={`${this.props.type.toLowerCase()}-decrement`} handleClick={this.props.handleClick} text={this.props.decText} />
          </Col>
          <Col className="" xs={4} sm={4} md={4}>
            <div id={`${this.props.type.toLowerCase()}-length`}>{this.props.length}</div>
          </Col>
          <Col className="" xs={4} sm={4} md={4}>
            <ToggleButton id={this.props.type.toLowerCase()+'-increment'} handleClick={this.props.handleClick} text={this.props.incText} />
          </Col>
        </Row>
      </Grid>
		);
	}
}

export default LengthControl;
