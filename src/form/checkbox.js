import React from 'react';

import wrapComponent from '../hoc/input';

class Checkbox extends React.Component {
  render() {
    return (<input
      type="checkbox"
      checked={this.props.checked}
      onChange={this.props.onChange}
      onFocus={this.props.onFocus}
      onBlur={this.props.onBlur}
      disabled={this.props.disabled}
      />);
  }
}

export default wrapComponent()(Checkbox);
