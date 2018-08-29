import React from 'react';
import { MorphReplaceResize } from 'react-svg-morph';
import Logo from './logo';

export default class LoadingLogo extends React.Component {
  constructor(props) {
    super(props);
    this.increment = 0;
  }
  render() {
    var icon = <Logo fill={this.increment} />;
    return <div>{icon}</div>;
  }
}
