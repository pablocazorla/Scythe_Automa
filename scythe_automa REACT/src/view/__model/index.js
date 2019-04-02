import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import {I18N,Button} from '../../components';
import {Images} from '../../config';

class ViewVisual extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentView: this.props.currentView
  //   };
  // }
  // componentWillReceiveProps (nextProps) {
  //   this.setState({
  //     currentView: nextProps.currentView
  //   });
  // }
  render() {
    //const {currentView} = this.state;

    return <div className="container">
      {this.props.currentView + ' is current'}
      <Button onClick={()=>{this.props.goTo('NewGame')}}>
        <I18N id="Continue"/>
      </Button>
    </div>;
  }
}

// REDUX ****************************************/

function mapStateToProps(state) {
  const {currentView} = state;
  return {
    currentView
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