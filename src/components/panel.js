import React from 'react';

import wrapComponent from '../hoc/panel';

class Panel extends React.Component {
  renderTitle() {
    if (this.props.title) {
      return (<div className="panel-heading">
        {this.props.title}
      </div>);
    }

    return null;
  }

  render() {
    return (<div className="panel">
      {this.renderTitle()}
      <div className="panel-body">
        {this.props.children}
      </div>
    </div>);
  }
}

export default wrapComponent()(Panel);
