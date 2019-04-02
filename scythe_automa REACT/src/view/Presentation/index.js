import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import {I18N,Button} from '../../components';

class ViewVisual extends Component {
  render() {    
    return <div className="container center">
      <div className="t1">SCYTHE AUTOMA</div>
      
        
          {/* <label>Language</label>
          <select>
          <option value="">Español</option>
          <option value="">Inglés</option>
          </select> */}

          <div style={{'height':'300px'}}></div>
        
        <Button onClick={()=>{this.props.goTo('NewGame')}}>
          <I18N id="Continue"/>
        </Button>
    </div>;
  }
}

// REDUX ****************************************/
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
  null,
  mapDispatchToProps
)(ViewVisual);

export default View;