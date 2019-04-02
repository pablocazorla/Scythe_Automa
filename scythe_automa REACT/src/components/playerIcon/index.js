import React, { Component } from 'react';
import I18N from '../i18n';
import {factionImg,svgStyle,svgPoints} from '../../config';

export default class PlayerIcon extends Component {
  render() {
    const {size,player,icon} = this.props;

    const s = size ? ' ' + size : '',
      clIcon = 'player-turn' + s;

    return <div className={clIcon}>
      {icon ? <div className={'player-icon-unit '+player.factionName}>
        <svg width="100%" height="100%" viewBox="0 0 45 52" version="1.1" xmlns="http://www.w3.org/2000/svg" style={svgStyle}>
          <path d={svgPoints[icon].points} />
        </svg>
      </div> : <div className="player-img">
        <img src={factionImg[player.factionName]} alt=""/>
      </div>}
      <div className="player-title">
      <I18N id={player.factionName}/>
      </div>
      <div className="player-sub">
        (
        <i className={player.icon} aria-hidden="true"></i>
        <span className="type"><I18N id={player.name}/></span>)
      </div>
    </div>;
  }
};