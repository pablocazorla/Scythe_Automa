import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import {I18N,Button,PlayerIcon} from '../../components';
//import {Images} from '../../config';
import {cloneObject,getPlayerByFaction,capitalize} from '../../utils';
import {getBaseNumByFaction} from '../../config/map';
import {Images} from '../../config';

const resourceTypes = {
  'food': 'food',
  'iron': 'iron',
  'oil': 'oil',
  'wood': 'wood'
};

class ViewVisual extends Component {
  constructor(props) {
    super(props);

    let {map,players} = this.props;
    let hex = null;

    for(var num in map){
      if(map[num].attack){
        if(map[num].people.mech === 0 && map[num].people.character === 0){
          // Attack workers
          hex = cloneObject(map[num]);
        }
      }
    }
    if(hex){
      const numBase = getBaseNumByFaction(hex.faction);
      // translate the workers to home base
      map[numBase].people.worker += hex.people.worker;
      // and quit from hex
      map[hex.num].people.worker = 0;
      // put the victory units
      map[hex.num].people.mech = map[hex.num].attack.mech || 0;
      map[hex.num].people.character = map[hex.num].attack.character || 0;
      // change the faction "color"
      map[hex.num].faction = map[hex.num].attack.faction;
      // delete attack
      delete map[hex.num].attack;
      this.props.updateMap(cloneObject(map));
    }

    const p1 = hex ? getPlayerByFaction(players.list,hex.attack.faction) : null;
    const p2 = hex ? getPlayerByFaction(players.list,hex.faction) : null;

    this.state = {
      hex,
      step:1,
      p1,
      p2
    };

    this.continueAction = this.continueAction.bind(this);
  }
  // componentWillReceiveProps (nextProps) {
  //   this.setState({
  //     currentView: nextProps.currentView
  //   });
  // }
  continueAction(){
    const {step,p1,p2} = this.state;
    const {aiResources} = this.props;
    if(p2.ai && !p1.ai && aiResources > 0 && step === 1){
      this.setState({
        step: 2
      });
    }else{
      // continue
      
    }    
  }
  render() {
    const {hex,step,p1,p2} = this.state;

    const {aiResources} = this.props;    

    let aiResList = [];
    let air = 'resource';

    if(p2.ai && !p1.ai && aiResources > 0){
      for(var ires = 0; ires < aiResources;ires++){
        air = resourceTypes[hex.type] || 'resource';
        aiResList.push(air);
      }
    }

    return <div className="container">
      <div className="tit_combat">
        <i className="fa fa-star"></i>
        <I18N id="Attack workers"/>
        <i className="fa fa-star"></i>
      </div>
      <div className="attack-row">
        {p1 ? <PlayerIcon player={p1} size={'min'} icon="mech"/>:null}
        <div className="player-turn-mid">vs.</div>
        {p2 ? <PlayerIcon player={p2} size={'min'} icon="worker"/>:null}
      </div>
      {step === 1 ? <p className="italic line-top mb20 fadeIn">
        <I18N
          id="Each of %faction2’s workers on that territory immediately retreats to their faction’s home base, leaving behind any resource tokens. %faction1 loses %num of popularity for the workers he forced to retreat (they’re not happy with you for forcing them off their land)."
          replaceText={{
            '%faction1': capitalize(hex.attack.faction),
            '%faction2': capitalize(hex.faction),
            '%num': hex.people.worker
        }}/>
      </p>:null}
      {step === 2 && aiResources > 0 ? <div className="line-top mb20 fadeIn">
        <p className="mb10">
          <I18N id="Put %num %type in the territory."
            replaceText={{
              '%type': air,
              '%num': aiResources
            }}
          />
        </p>
        <div className="resources-row">
            {aiResList.map((ic,k)=>{
              return <div className="resources-item" key={k}>
                <div className="resources-item-cont">
                  <img src={Images[ic]} alt=""/>
                </div>
              </div>
            })}
        </div>
      </div> : null}    
      <Button onClick={this.continueAction}>
        <I18N id="Continue"/>
      </Button>
    </div>;
  }
}

// REDUX ****************************************/

function mapStateToProps(state) {
  const {map,players,aiResources} = state;
  return {
    map,players,aiResources
  };
}

const {
  goTo,
  updateMap
} = actions;

const mapDispatchToProps = dispatch => {
  return {
    goTo: (dir) => {
      dispatch(goTo(dir))
    },
    updateMap: (newMap) => {
      dispatch(updateMap(newMap))
    }
  };
};

const View = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewVisual);

export default View;