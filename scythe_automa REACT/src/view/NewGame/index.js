import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import {I18N,Button} from '../../components';
import {factionTypes,defaultGame} from '../../config';
import FactionButton from './factionButton';

class ViewVisual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerList: []
    };
    this.onChangePlayer = this.onChangePlayer.bind(this);
    this.createGame = this.createGame.bind(this);
  }
  componentWillMount(){
    this.setState({
      playerList: defaultGame
    });
  }
  onChangePlayer(index,playerType){
    let {playerList} = this.state;
    playerList[index] = playerType;
    this.setState({
      playerList
    });
  }
  createGame(){
    const {playerList} = this.state;
    this.props.createGame(playerList);
    
    this.props.goTo('StartTurn');
    //this.props.goTo('Map');
  }
  render() {    
    const {playerList} = this.state;

    return <div className="container">
      <div className="t1 center">
        <I18N id="New Game"/>
      </div>
      <p className="center">
        <I18N id="Choose factions and players:"/>
      </p>

      <div className="faction-list">
        {factionTypes.map((fact,k) =>{
          return <FactionButton
            faction={fact}
            index={k}
            key={k}
            playerIndex={playerList[k]}
            onChangePlayer={this.onChangePlayer}
          />;
        })}
      </div>


      <Button onClick={this.createGame}>
        <I18N id="Continue"/>
      </Button>
    </div>;
  }
}

// REDUX ****************************************/

const {
  goTo,
  createGame
} = actions;



const mapDispatchToProps = dispatch => {
  return {
    goTo: (dir) => {
      dispatch(goTo(dir))
    },
    createGame: (playerList) => {
      dispatch(createGame(playerList))
    },
  };
};

const View = connect(
  null,
  mapDispatchToProps
)(ViewVisual);

export default View;