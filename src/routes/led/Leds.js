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
import Led from './Led';

class Leds extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    fetch: PropTypes.func
  };

  constructor() {
    super();
    this.send=this.send.bind(this);
    this.loop=this.loop.bind(this);
    this.state = {
      color: ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000']
    }
  };

  async getColors() {
    const resp = await this.props.fetch('/api/colors', {method: 'GET'});
    const { colors } = await resp.json();
    if (!colors) throw new Error('Failed to load the colors feed.');
    this.setState({color:colors});
    //console.log("Loop:", colors);
  };

  loop() {
    this.timer = setInterval(() => {
    // Fetch color-array from server
      this.getColors();
    },1000);
  };

  async send(led, color) {
      //Send to server
      const resp = await this.props.fetch('/api/colors/'+led, {
        body:JSON.stringify({color: color})});
      const { colors } = await resp.json();
      if (!colors) throw new Error('Failed to load the colors feed.');
      this.setState({color:colors});
  };

  componentDidMount() {
    this.loop();
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <h2>{this.state.kalle}</h2>
          <Led color={this.state.color[0]} led='0' send={this.send} />
          <Led color={this.state.color[1]} led='1' send={this.send} />
          <Led color={this.state.color[2]} led='2' send={this.send}/>
          <Led color={this.state.color[3]} led='3' send={this.send}/>
          <Led color={this.state.color[4]} led='4' send={this.send}/>
          <Led color={this.state.color[5]} led='5' send={this.send}/>
          <Led color={this.state.color[6]} led='6' send={this.send}/>
          <Led color={this.state.color[7]} led='7' send={this.send}/>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Leds);
