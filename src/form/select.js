import React from 'react';

import wrapComponent from '../hoc/select';

class Select extends React.Component {
  render() {
    const options = this.props.options.map((x, i) => {
      return <option key={i} value={x.id}>{x.name || x.label}</option>;
    });

    if (this.props.placeholder) {
      options.unshift(<option key="placeholder" value="" disabled selected hidden>{this.props.placeholder}</option>);
    }
    return (<select
      className="form-control"
      // defaultValue={this.state.selected}
      value={this.props.value}
      onChange={this.props.onChange}
      disabled={this.props.disabled}
      >
      <option>{this.props.defaultValue}</option>
      {options}
    </select>);
  }
}

export default wrapComponent()(Select);

