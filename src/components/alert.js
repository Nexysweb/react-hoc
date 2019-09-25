import React from 'react';

export default class Alert extends React.Component {
  render() {
    const { type, children } = this.props;
    const className = 'alert alert-' + type;

    return (<div class={className} role="alert">
      {children}
    </div>);
  }
}