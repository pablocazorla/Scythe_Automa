import React, { Component } from 'react';
import {I18N} from '../../components';
import {playerTypes,Images}  from '../../config';

export default class FactionButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerIndex: this.props.playerIndex
    };
    this.onChangePlayer = this.onChangePlayer.bind(this);
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      playerIndex: nextProps.playerIndex
    });
  }
  onChangePlayer(){
    const {playerIndex} = this.state;
    const {index} = this.props;
    let newPlayerIndex = playerIndex + 1;
    newPlayerIndex = newPlayerIndex >= playerTypes.length ? 0 : newPlayerIndex;
    this.props.onChangePlayer(index,newPlayerIndex);
  }
  render() {
    const {name,power,cards,icon} = this.props.faction;

    const {playerIndex} = this.state;

    const player = playerTypes[playerIndex];

    let cl = 'faction-item ';
    cl += player.name === 'None' ? 'disabled' : name;

    return <div
        className={cl}
        onClick={this.onChangePlayer}
      >
        <div className="faction-type">
          <div className="icon">
            <i className={player.icon} aria-hidden="true"></i>
          </div>
          <div className="type">
            <I18N id={player.name}/>
          </div>
        </div>
        <div className="faction-to">
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
        </div>



        <div className="faction-flag">
          <div className="faction">
            <img src={icon} alt="" />
          </div>
          <div className="faction-title">
            <I18N id={name}/>
          </div>
          <div className="faction-power">
            <div className="faction-icon-power">
              <img src={Images['power']} alt=""/>
              <span>{power}</span>
            </div>
            <div className="faction-icon-card">
              <img src={Images['card']} alt=""/>
              <span>{cards}</span>
            </div>
          </div>
        </div>






          {/*
          
         
            
            
            
            
            
            <div className="faction-flag">
              <div className="faction">
                <img src="" data-bind="attr:{src:icon}" />
              </div>
              <div className="faction-title" data-bind="text:title"></div>
              <div className="faction-power">
                <div className="faction-icon-power">
                  <img src="images/power.svg" alt="">
                  <span data-bind="text:power"></span>
                </div>
                <div className="faction-icon-card">
                  <img src="images/card-power.svg" alt="">
                  <span data-bind="text:cards"></span>
                </div>
              </div>
            </div>

           */}


    </div>;
  }
};