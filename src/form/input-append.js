import React from 'react';

export default class InputAppend extends React.Component {
  render() {
    const { children } = this.props;

    return (<div className="input-group-append">
      <span className="input-group-text">{children}</span>
    </div>);
  }
}