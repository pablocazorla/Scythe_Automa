import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import {I18N,Button,PlayerIcon} from '../../components';
import {Images} from '../../config';


class ViewVisual extends Component {
  constructor(props) {
    super(props);
    this.moveOrAdd = this.moveOrAdd.bind(this);
    this.endTurn = this.endTurn.bind(this);
  }
  // componentWillReceiveProps (nextProps) {
  //   this.setState({
  //     currentView: nextProps.currentView
  //   });
  // }
  moveOrAdd(){
    this.props.goTo('Map');
  }
  endTurn(){
    this.props.advancePlayer();
    this.props.goTo('StartTurn');
  }
  render() {
    const {players} = this.props,
      currentPlayer = players.list[players.currentIndex];

    return <div className="container">
      <div className="centered_human_start">
        <PlayerIcon player={currentPlayer} size="min"/>
        <p>
          <I18N id="Choose one action to do"/>:        
        </p>
        <Button onClick={this.moveOrAdd}>
          <span className="btn-ic">
            <img src={Images['move_or_add']} alt=""/>
          </span>
          <I18N id="MOVE or ADD units"/>
        </Button>
        <p>or:</p>
        <Button className="btn-continue" onClick={this.endTurn}>
          <I18N id="End your turn"/>
        </Button>
      </div>
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