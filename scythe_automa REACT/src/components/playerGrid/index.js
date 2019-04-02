import React, { Component } from 'react';
import {Images} from '../../config';

export default class PlayerGrid extends Component {
  render() {
    const {player} = this.props;

    let notRiver = true,
      x = 0,
      y = 0,
      step_x = 0,
      step_y = 0,
      w = 176 / 4;

    return <div className="automa-grid">
      <div className="automa-grid-cont">
        {player.timeline.map((t,i)=>{
          if (t.crossRiver && notRiver) {
            notRiver = false;
          }          
					const notStepRiver =  notRiver,					
            star = t.star ? true : false,
            one = i === 0 ? true : false,
            two = t.changeEstrategy ? true : false;          
          if (player.step === i) {
						step_x = x;
						step_y = y;
					}
					x++;
					if (x >= 4) {
						x = 0;
						y++;
          }
          return <div className="automa-step" key={i}>
            <div className="automa-step-cont">
              {!star ? <div className={'automa-step-img automa-step-notstar' + (notStepRiver ? ' withRiver':'')}>
                <img src={Images['star-o']} alt=""/>
              </div>:null}
              {star ? <div className="automa-step-img automa-step-star" data-bind="visible:star">
                <img src={Images['star']} alt=""/>
              </div>:null}
              {notStepRiver ? <div className="automa-step-img automa-step-notriver" data-bind="visible:notRiver">
                <img src={Images['crossRivers']} alt=""/>
              </div>:null}
              {one ? <div className={'automa-step-img automa-step-one' + (notStepRiver ? ' withRiver':'')} data-bind="visible:one,css:{withRiver:notRiver}">
                <img src={Images['icon1']} alt=""/>
              </div>:null}
              {two ? <div className="automa-step-img automa-step-two" data-bind="visible:two">
                <img src={Images['icon2']} alt=""/>
              </div>:null}
            </div>
          </div>;
        })}
        <div className="automa-grid-marker" style={{
          'top':((w + 1) * step_y) + 'px',
          'left': (w * step_x) + 'px'
        }}>
          <div className="automa-grid-marker-cont">
            <svg viewBox="0 0 30 39">
              <g>
                <path d="M28.309,18.869l-0.889,-1.505l-19.93,-4.7l-1.566,0.926l-4.939,17.754l0.888,1.505l19.931,4.7l1.565,-0.927l4.94,-17.753Z"
                  style={{'fillOpacity':0.631373}} />
                <path d="M0.986,19.345l4.939,-17.754l1.566,-0.926l19.472,4.591l0.889,1.505l-0.003,0.008l0.003,0l0,11.02l-0.008,0l-4.912,17.653l-0.02,0.073l-1.516,0.896l-0.049,0.03l-19.473,-4.592l-0.109,-0.185l-0.779,-1.319l0.068,-0.245l-0.068,0l0,-10.746l0.002,-0.005l-0.002,-0.004Z"
                  className={player.factionName} />
                <path d="M0.988,19.349l0.777,1.315l0,11l-0.779,-1.319l0.068,-0.245l-0.068,0l0,-10.746l0.002,-0.005Z"
                  style={{'fillOpacity':0.396078}} />
                <path d="M1.765,20.664l0.109,0.185l19.473,4.592l0.049,-0.03l0,11l-0.049,0.03l-19.473,-4.592l-0.109,-0.185l0,-11Z"
                  style={{'fillOpacity':0.239216}} />
                <path d="M22.932,24.442l0,11l-0.02,0.073l-1.516,0.896l0,-11l1.516,-0.896l0.02,-0.073Z" style={{'fillOpacity':0.145098}} />
                <path d="M27.852,6.761l-0.889,-1.505l-19.472,-4.591l-1.566,0.926l-4.939,17.754l0.888,1.504l19.473,4.592l1.565,-0.926l4.94,-17.754Z"
                  style={{'fill':'#FFF','fillOpacity':0.121569}} />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>;
  }
};