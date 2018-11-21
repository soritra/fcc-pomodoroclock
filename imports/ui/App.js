/**
 *
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Panel, Grid, Row, Col } from 'react-bootstrap';

import 'bootstrap3/dist/css/bootstrap.css';
import 'bootstrap3/dist/css/bootstrap-theme.css';

import Timer from './Timer';
import PlayButton from './PlayButton';
import ResetButton from './ResetButton';
import LengthControl from './LengthControl';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {...this.getInitialState()};
    this.soundSrc = './beep.wav';
    this.togglePlay = this.togglePlay.bind(this);
    this.countDown = this.countDown.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
    this.toggleLength = this.toggleLength.bind(this);
    this.showClock = this.showClock.bind(this);
    this.reset = this.reset.bind(this);
  }

  /**
   * [getInitialState description]
   */
  getInitialState () {
  	const state = {
  		breakLength: 5,
      sessionLength: 25,
      playing: false,
      playText: 'Play',
      timerLabel: 'Session',
      timerID: ''
    };

    return {...state, counter: state.sessionLength*60};
  }

  /**
   * [toggleLength description]
   * @param  {Object} evt [description]
   */
  toggleLength (evt) {
    if (this.state.playing) {
    	return;
    }

  	const id = evt.currentTarget.id;
  	const type = id.replace(/^(.+)-.+$/, '$1');
  	const increment = /increment$/i.test(id);
  	const typeLength = type.toLowerCase() + 'Length';
  	let curLength = this.state[typeLength];

  	if (curLength >= 0 && curLength <= 60) {
  		curLength = (increment && curLength != 60) ? curLength+1 : ((!increment && curLength != 1) ? curLength-1 : curLength);
  		this.setState({
      	[typeLength]: curLength
      });

      if (this.state.timerLabel !== type) {
      	this.setState({
	        counter: curLength*60 
	      });
      }
  	}
  }

  /**
   * [togglePlay description]
   */
  togglePlay() {
    if (!this.state.playing) {
      this.countDown();
      this.setState({ 
      	playing: true,
      	playText: 'Pause'
      });
    } else {
      this.setState({ 
      	playing: false,
      	playText: 'Play'
      });
      this.cancelTimer();
    }
  }

  /**
   * [countDown description]
   */
  countDown() {
    this.setState({
      timerID: setInterval(() => {         
        this.countDownCallBack();
       }, 1000)
    })
  }

  /**
   * [decreaseTimer description]
   */
  decreaseTimer() {
    this.setState({ counter: this.state.counter - 1 });
  }

  /**
   * [countDownCallBack description]
   */
  countDownCallBack() {
  	this.decreaseTimer();

    let counter = this.state.counter;
    
    if (counter === 0) {
      this.audioBeep.play();
    }

    if (counter < 0) {
      this.cancelTimer();
      this.countDown();
      const text = this.state.timerLabel == 'Session' ? 'Break' : 'Session';
      const value = this.state.timerLabel == 'Session' ? this.state.breakLength * 60 : this.state.sessionLength * 60;

      this.setState({
	      counter: value,
	      timerLabel: text
	    })
    }  
  }

  /**
   * [showClock description]
   * @return {string} [description]
   */
  showClock() {
    let minutes = parseInt(this.state.counter/60, 10);
    let seconds = this.state.counter%60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }

  /**
   * [cancelTimer description]
   */
  cancelTimer () {
  	//this.state.timerID && this.state.timerID.cancel();
  	this.state.timerID && clearInterval(this.state.timerID);
  }

  /**
   * [reset description]
   */
  reset() {
    this.setState({...this.getInitialState()});
    this.cancelTimer();
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  /**
   * [render description]
   * @return {[type]} [description]
   */
  render () {
  	return (
  		<div className="clock-outer">
        <Panel className="clock-panel">
          <Panel.Heading>
            Pomodoro Clock
          </Panel.Heading>
          <Panel.Body>
            <Grid className="clock-grid">
              <Row className="show-grid clock-subtitle">
              	<Col id="break-label" className="clock-col" xs={6} sm={6} md={6}>
                  <LengthControl type="Break" length={this.state.breakLength} handleClick={this.toggleLength} decText="B-" incText="B+" />
                </Col>
                <Col id="session-label" className="clock-col" xs={6} sm={6} md={6}>
                  <LengthControl type="Session" length={this.state.sessionLength} handleClick={this.toggleLength} decText="S-" incText="S+" />
                </Col>
              </Row>
              <Row className="show-grid clock-session">
                <Col className="clock-col" xs={12} sm={12} md={12}>
                 	<Timer label={this.state.timerLabel} value={this.showClock()} />
                </Col>
              </Row>
            </Grid>
          </Panel.Body>
          <Panel.Footer>
            <Row className="show-grid">
              <Col className="" xs={6} sm={6} md={6}>
                <PlayButton id="start_stop" text={this.state.playText} handleClick={this.togglePlay} />
              </Col>
              <Col className="" xs={6} sm={6} md={6}>
                <ResetButton id="reset" handleClick={this.reset} />
              </Col>
              <div id="beep-wrap">
                <audio id="beep" preload="auto" ref={(audio) => this.audioBeep = audio} src={this.soundSrc}></audio>
              </div>
            </Row>
          </Panel.Footer>
        </Panel>
      </div>
  	);
  }
};

export default App;