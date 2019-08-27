import React from 'react';

export default class Icon extends React.Component {
  render() {
    const { name } = this.props;
    const className = `fa fa-${name}`;

    return <i className={className}></i>;
  }
};