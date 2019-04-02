import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import {I18N,Button,PlayerIcon,PlayerGrid} from '../../components';
import evaluateAI from '../../automa';

class ViewVisual extends Component {
  render() {

    const {players} = this.props,
      currentPlayer = players.list[players.currentIndex],
      size = currentPlayer.ai ? 'min':null;

    const continueAction = () => {
      if(currentPlayer.ai){
        const card = this.props.deck.getCard();
        const AIactions = evaluateAI(card,this.props.map,currentPlayer);
       
        this.props.setAIactions(AIactions);

        if(AIactions){
          if(AIactions.move){
            this.props.goTo('Map');
          }else{            
            this.props.goTo('NotMovement');            
          }
        }else{
          // NO ACTIONS
          this.props.goTo('NotAutometta');
        }
      }else{
        this.props.goTo('StartHuman');
      }
    };

    return <div className="container">      
      <div className="t1 center">
        <I18N id="Turn of"/>
      </div>
      <PlayerIcon player={currentPlayer} size={size}/>
      {currentPlayer.ai ? <PlayerGrid player={currentPlayer}/> : null}
      <Button onClick={continueAction}>
        <I18N id="Continue"/>
      </Button>
    </div>;
  }
}

// REDUX ****************************************/

function mapStateToProps(state) {
  const {players,deck,map} = state;
  return {
    players,
    deck,
    map
  };
}

const {
  goTo,
  setAIactions
} = actions;

const mapDispatchToProps = dispatch => {
  return {
    goTo: (dir) => {
      dispatch(goTo(dir))
    },
    setAIactions: (newAIactions) => {
      dispatch(setAIactions(newAIactions))
    }
  };
};

const View = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewVisual);

export default View;