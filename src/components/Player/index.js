import React, { Component } from 'react';
import classNames from 'classnames';
import './playerStyle.css';

export default class Player extends Component {
  render() {
    const { image, name, className } = this.props;
    return (
      <div className={classNames(className, 'player-style')}>
        <img className="player-style-image" width={250} src={image} />
        {name}
      </div>
    );
  }
}
