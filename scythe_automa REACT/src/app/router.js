import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import Presentation from '../view/Presentation';
import NewGame from '../view/NewGame';
import StartTurn from '../view/StartTurn';
import StartHuman from '../view/StartHuman';
import Map from '../view/Map';
import NotAutometta from '../view/NotAutometta';
import NotMovement from '../view/NotMovement';
import AIresources from '../view/AIresources';
import AIrecruit from '../view/AIrecruit';
import AttackWorker from '../view/AttackWorker';
import Encounter from '../view/Encounter';



const viewCollection = {
  'Presentation': <Presentation key={0}/>,
  'NewGame': <NewGame key={1}/>,
  'StartTurn': <StartTurn key={2}/>,
  'StartHuman': <StartHuman key={3}/>,
  'Map': <Map key={4}/>,
  'NotAutometta': <NotAutometta key={5}/>,
  'NotMovement': <NotMovement key={6}/>,
  'AIresources': <AIresources key={7}/>,
  'AIrecruit': <AIrecruit key={8}/>,
  'AttackWorker': <AttackWorker key={9}/>,
  'Encounter': <Encounter key={10}/>
};

class RouterVisual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: this.props.currentView
    };
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      currentView: nextProps.currentView
    });
  }
  render() {
    const view = viewCollection[this.state.currentView];
    return <CSSTransitionGroup
      transitionName="fade"
      transitionEnterTimeout={100}
      transitionLeaveTimeout={300}>
      {view}
    </CSSTransitionGroup>;
  }
}

// REDUX ****************************************/

function mapStateToProps(state) {
  const {currentView} = state;
  return {
    currentView
  };
}

// const {
//   toggleModalSuitcase,
//   toggleModalComment,
//   toggleModalEditBooking
// } = actions;

// const mapDispatchToProps = dispatch => {
//   return {
//     toggleModalSuitcase: (status,booking,type) => {
//       dispatch(toggleModalSuitcase(status,booking,type))
//     },
//     toggleModalComment: (status,booking,type, note) => {
//       dispatch(toggleModalComment(status,booking,type,note))
//     },
//     toggleModalEditBooking: (status,booking,typeIn) => {
//       dispatch(toggleModalEditBooking(status,booking,typeIn))
//     }
//   };
// };

const Router = connect(
  mapStateToProps,
  null//mapDispatchToProps
)(RouterVisual);

export default Router;