/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Led.css';


class Led extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    led: PropTypes.string.isRequired,
    send: PropTypes.func
  };

  defaultProps() {
    color: "#ffffff";
  }

  constructor(props) {
  	super(props);
    this.viewColorPicker = this.viewColorPicker.bind(this);
    this.state = {
      view: false }
  }

  viewColorPicker() {
    //View color overlay
    this.setState({view: true});
  }

  onClick(color) {
    //Send selected color
    this.setState({view: false});
    this.props.send(this.props.led, color);

  }

  render() {
    return (
      <span className={s.led}>
        <div className={s.innerLed} style={{backgroundColor: this.props.color}} onClick={this.viewColorPicker}></div>
        <div className={this.state.view ? s.visible : s.hidden }>
          <span className={s.colorLed} style={{backgroundColor: '#ff0000' }} onClick={this.onClick.bind(this, '#ff0000')}></span>
          <span className={s.colorLed} style={{backgroundColor: '#00ff00' }} onClick={this.onClick.bind(this, '#00ff00')}></span>
          <span className={s.colorLed} style={{backgroundColor: '#0000ff' }} onClick={this.onClick.bind(this, '#0000ff')}></span>
          <span className={s.colorLed} style={{backgroundColor: '#000000' }} onClick={this.onClick.bind(this, '#000000')}></span>
        </div>
      </span>
      );
  }
}

export default withStyles(s)(Led);
