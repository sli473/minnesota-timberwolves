import React, { Component } from 'react';
import classNames from 'classnames';
import { stats, data } from 'nba.js';
import Logo from './media/loading';
import './App.css';

const delay = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: null,
      pic: null
    };
  }
  componentWillMount = async () => {
    const url =
      'http://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=0&LeagueID=00&Season=2017-18'; // site that doesn’t send Access-Control-*
    const incomingStats = await fetch(url); // https://cors-anywhere.herokuapp.com/https://example.com
    const statPromise = await incomingStats.json();
    const statsData = statPromise.resultSets[0].rowSet;
    const filteredPlayers = statsData.filter(player => player[10] == 'MIN');

    const playerStats = await this.fetchPlayerStats(filteredPlayers);

    this.setState({ players: playerStats });
  };

  fetchPlayerStats = async players => {
    const playerStats = [];
    console.log(players);
    await Promise.all([
      delay(5300),
      players.map(async player => {
        const playerName = player[1].split(', ');
        const playerStatsPromise = await fetch(
          `https://nba-players.herokuapp.com/players-stats/${playerName[0]}/${playerName[1]}`
        );
        console.log(playerStatsPromise);
        const contentType = playerStatsPromise.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const playerStat = await playerStatsPromise.json();
          console.log(playerStat ? playerStat : 'I fucked it up', playerName);
          const playerImagePromise = await fetch(
            `https://nba-players.herokuapp.com/players/${playerName[0]}/${playerName[1]}`
          );
          const playerImage = await playerImagePromise.blob();
          const imageURL = URL.createObjectURL(playerImage);
          playerStats.push({
            ...playerStat,
            imageURL
          });
        }
      })
    ]);

    console.log('what these boys look like g', playerStats);
    return playerStats;
  };

  render() {
    const { players, pic } = this.state;
    return (
      <div className={classNames('patterns-container', !players && 'loading-screen')}>
        {players ? (
          players.map(player => (
            <div key={player.name}>
              {player.name}
              <img height={100} src={player.imageURL} />
            </div>
          ))
        ) : (
          <Logo />
        )}
      </div>
    );
  }
}

export default App;
