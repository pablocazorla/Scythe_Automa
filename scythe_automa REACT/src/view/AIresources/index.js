import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import {I18N,Button,PlayerIcon} from '../../components';
import {Images} from '../../config';
import {capitalize} from '../../utils';

class ViewVisual extends Component {
  constructor(props) {
    super(props);
    this.continueAction = this.continueAction.bind(this);
  }
  componentDidMount(){
    const {players} = this.props;
    const {gain} = this.props.AIactions;
    let currentPlayer = players.list[players.currentIndex];

    for(var a in gain){
      switch(a){
        case 'power':
          currentPlayer.power += gain[a];
          break;
        case 'card':
          currentPlayer.cards += gain[a];
          break;
        case 'money':
          currentPlayer.money += gain[a];
          break;
        case 'worker':
          currentPlayer.board.worker -= gain[a];
          break;
        case 'mech':
          currentPlayer.board.mech -= gain[a];
          break;
        default:
          //
      }
    }
    this.props.updatePlayer(currentPlayer);
  }
  continueAction(){
    const {AIactions,players} = this.props;
    

    if(AIactions.recruit){
      // To evaluate recruit
      this.props.goTo('AIrecruit');
    }else{
      // advance?
      let currentPlayer = players.list[players.currentIndex];
      let changeEstrategy = false;
      let addStar = false;
      if(AIactions.advanceStep){     
        currentPlayer.step++;
        const currentStep = currentPlayer.timeline[currentPlayer.step];
        if(currentStep.crossRiver){
          currentPlayer.crossRiver = true;
        }
        if(currentStep.changeEstrategy){
          currentPlayer.strategy = 2;
          changeEstrategy = true;
        }
        if(currentStep.star){
          addStar = true;
        }
        this.props.updatePlayer(currentPlayer);
      }

      if(changeEstrategy){
        console.log('voy a changeEstrategy');
      }else{
        if(addStar){
          console.log('voy a addStar');
        }else{
          console.log('voy a AVANZO PLAYER');
          this.props.advancePlayer();
          this.props.goTo('StartTurn');
        }
      }
    }
  }
  render() {
    const {players} = this.props,
      currentPlayer = players.list[players.currentIndex];

      const {gain} = this.props.AIactions;

      let gainList = [];
      for(var a in gain){
        gainList.push({
          'type':a,
          'num':gain[a]
        });
      }

    return <div className="container">
      <div className="t1 center" data-bind="text:txt_title">
        <I18N id="Resources for"/>
      </div>
      <PlayerIcon player={currentPlayer} size={'min'}/>
      <div className="ai_resources_box">
        <p className="lead" data-bind="text:txt_gain"></p>
        <div className="ai_resources_row">
          {gainList.map((g,k)=>{
            return <div className={'item for-' + g.type} key={k}>
              <div className="item-content">
                <img src={Images[g.type]} alt=""/>
                <div className="num">{g.num}</div>
              </div>                  
            </div>;
          })}
        </div>
        {gainList.map((g,k)=>{
          const {type,num} = g;
          let text = '';
          const repText = {
              '%faction':capitalize(currentPlayer.factionName),
              '%num':num
            };
          switch(type){
            case 'worker':
              text = 'Deploy %num worker in the %faction\'s home base.';
              text = num > 1 ? text.replace('worker','workers') : text;
              break;
            case 'mech':
              text = 'Deploy %num mech in the %faction\'s home base.';
              text = num > 1 ? text.replace('mech','mechs') : text;
              break;
            case 'money':
              text = '%faction obtain %num of money.';
              break;
            case 'card':
              text = '%faction obtain %num card.';
              text = num > 1 ? text.replace('card','cards') : text;
              break;
            case 'power':
              text = '%faction increases his power in %num.';
              break;
            default:
              //
          }
          return <p className="align-center" key={k}><I18N id={text} replaceText={repText}/></p>;
        })}
      </div>
      <Button onClick={this.continueAction}>
        <I18N id="Continue"/>
      </Button>
    </div>;
  }
}

// REDUX ****************************************/

function mapStateToProps(state) {
  const {players,AIactions} = state;
  return {
    players,
    AIactions
  };
}

const {
  goTo,
  updatePlayer,
  advancePlayer
} = actions;

const mapDispatchToProps = dispatch => {
  return {
    goTo: (dir) => {
      dispatch(goTo(dir))
    },
    updatePlayer: (pl) => {
      dispatch(updatePlayer(pl))
    },
    advancePlayer: () => {
      dispatch(advancePlayer())
    },
  };
};

const View = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewVisual);

export default View;