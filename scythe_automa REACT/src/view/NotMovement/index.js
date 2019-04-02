import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import {I18N,Button,PlayerIcon} from '../../components';
import {Images} from '../../config';
import {capitalize} from '../../utils';


class ViewVisual extends Component {
  constructor(props) {
    super(props);
    this.endTurn = this.endTurn.bind(this);
  }
  endTurn(){
    const {AIactions} = this.props;
    if(AIactions.gain){
      // To evaluate resources
      this.props.goTo('AIresources');
    }else{
      if(AIactions.recruit){
        // To evaluate recruit
        this.props.goTo('AIrecruit');
      }else{
        // advance?
        // this.props.advancePlayer();
        // this.props.goTo('StartTurn');
      }        
    }   
  }
  render() {
    const {players} = this.props,
      currentPlayer = players.list[players.currentIndex];

    return <div className="container">
      <PlayerIcon player={currentPlayer} size={'mid'}/>
      <div className="not-move-img">
        <img src={Images['notMove']} alt=""/>
      </div>
      <p className="lead mb20 align-center">
        <I18N id={'%faction does not move any unit this turn.'} replaceText={{
          '%faction':capitalize(currentPlayer.factionName)
        }}/>
      </p>

      <Button onClick={this.endTurn}>
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
  advancePlayer
} = actions;

const mapDispatchToProps = dispatch => {
  return {
    goTo: (dir) => {
      dispatch(goTo(dir))
    },
    advancePlayer: () => {
      dispatch(advancePlayer())
    }
  };
};

const View = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewVisual);

export default View;