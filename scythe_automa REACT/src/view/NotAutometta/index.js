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
    this.props.advancePlayer();
    this.props.goTo('StartTurn');
  }
  render() {
    const {players} = this.props,
      currentPlayer = players.list[players.currentIndex];

    return <div className="container">
      <PlayerIcon player={currentPlayer} size={'mid'}/>
      <div className="not-autometta-img">
        <img src={Images['notAutometta']} alt=""/>
      </div>
      <p className="lead mb20">
        <I18N id={'%faction skip this turn (because is in "Autometta" mode).'} replaceText={{
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
  const {players} = state;
  return {
    players
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