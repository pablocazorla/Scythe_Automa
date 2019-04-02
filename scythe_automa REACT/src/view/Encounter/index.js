import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import {I18N,Button,PlayerIcon} from '../../components';
import {Images} from '../../config';

class ViewVisual extends Component {
  constructor(props) {
    super(props);
    this.continueAction = this.continueAction.bind(this);
  }
  continueAction(){
    console.log('continue');
  }
  render() {
    const {players} = this.props,
      currentPlayer = players.list[players.currentIndex];   

    return <div className="container">
      <div className="t1">
        <I18N id="Encounter"/>
      </div>
      <div className="attack-row">
        <PlayerIcon player={currentPlayer} size={'mid'} icon="character"/>
      </div>
      <img src={Images['encounter']} alt="" className="encounter-mark-img"></img>
      <p className="mb20">
        <I18N id="Remove the encounter token from the territory"/>
      </p>
      <Button onClick={this.continueAction}>
        <I18N id="Continue"/>
      </Button>
    </div>;
  }
};

// REDUX ****************************************/

function mapStateToProps(state) {
  const {players} = state;
  return {
    players
  };
}

const {
  goTo,
} = actions;

const mapDispatchToProps = dispatch => {
  return {
    goTo: (dir) => {
      dispatch(goTo(dir))
    }
  };
};

const View = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewVisual);

export default View;