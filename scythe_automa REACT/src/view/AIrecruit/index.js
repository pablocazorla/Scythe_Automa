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
    // advance?
  }
  render() {
    const {players} = this.props,
      currentPlayer = players.list[players.currentIndex];

      const {recruit} = this.props.AIactions;

    return <div className="container">
      <PlayerIcon player={currentPlayer} size={'min'}/>
      <div className="t1 center">
        <I18N id="Gain for recruit"/>
      </div>
      <div className="recruit-box">
        <div className="item for-recruit">
          <img src={Images['recruit']} alt=""/>
        </div>
        <div className={'item for-'+recruit}>
          <img src={Images[recruit]} alt=""/>
        </div>
      </div>
      <p className="mb20 align-center">
        <I18N
          id="If you have enlisted the %type recruit, then you gain the %type recruit bonus."
          replaceText={{'%type':recruit}}
        />
      </p>
     
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