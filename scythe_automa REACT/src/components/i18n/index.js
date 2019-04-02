import React, { Component } from 'react';
export default class I18N extends Component {
  render() {
    const {id,replaceText} = this.props;

    let txt = id;
    if(replaceText){
      for(var a in replaceText){
        txt = txt.replace(new RegExp(a, 'g'),replaceText[a]);
      }
    }

    return <span>{txt}</span>;
  }
};