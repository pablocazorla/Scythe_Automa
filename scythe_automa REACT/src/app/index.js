import React, { Component } from 'react';
import Router from './router';

class App extends Component {
  render() {
    return <div id="scythe-container">
        <div id="bg">
          <div className="g g1"></div>
          <div className="g g2"></div>
          <div className="g g3"></div>
          <div className="g g4"></div>
        </div>
        <div className="scythe-view">
          <Router/>
        </div>        
      </div>;
  }
}

export default App;
