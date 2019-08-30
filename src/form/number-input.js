import React from 'react';
import Cleave from 'cleave.js/react';

import wrapComponent from '../hoc/number-input';

class InputNumber extends React.Component {
  render() {
    return (<div className="input-group my-input-group">
      <Cleave
        value={this.props.value}
        className={this.props.className}
        options={this.props.options}
        onChange={this.props.handleChange}
        onBlur={this.props.handleBlur}
        placeholder={this.props.placeholder}
        disabled={this.props.disabled}
        style={this.props.style}
        />
      <span className="input-group-addon">{this.props.suffix}</span>
    </div>);
  }
}

export default wrapComponent()(InputNumber);
