import React from 'react';

export class CardFooter extends React.Component {
  render () {
    const { children } = this.props;

    if (!children) {
      return null;
    }

    return (<div className="card-footer">
      {children}
    </div>);
  }
}

export class CardHeader extends React.Component {
  render () {
    const { children } = this.props;

    if (!children) {
      return null;
    }

    return (<div className="card-header">
      {children}
    </div>);
  }
}

export default class Card extends React.Component {
  render() {
    const {title, children, footer} = this.props;
    return (<div className="card">
      <CardHeader>
        <h3>{title}</h3>
      </CardHeader>
      <div className="card-body">
        {children}
      </div>
      <CardFooter>{footer}</CardFooter>
    </div>);
  }
}
