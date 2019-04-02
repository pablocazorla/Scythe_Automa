import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    const {children,onClick,className} = this.props;

    let cl = 'button';
    cl += className ? ' ' +className : '';

    return <div className={cl} onClick={onClick}>
      {children}
    </div>;
  }
};