import React, { Component } from 'react';
import classNames from 'classnames';

import Player from '../Player';
import './playersListStyle.css';

export default class PlayersList extends Component {
  render() {
    const { players, className } = this.props;
    console.log(players);
    return (
      <div className={classNames(className, 'players-list-style')}>
        {players.map(player => (
          <Player key={player.name} name={player.name} image={player.imageURL} />
        ))}
      </div>
    );
  }
}
