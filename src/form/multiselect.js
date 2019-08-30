import React from 'react';

import Select from 'react-select';
import wrapComponent from '../hoc/multiselect';

class MultiSelect extends React.Component {
  render() {
    const options = this.props.options.map(x => {
      return {
        label: x.name || x.value || x.label,
        value: x.id
      };
    });

    return (
      <Select
        name={this.props.name}
        class="form-control"
        options={options}
        defaultValue={this.props.value}
        onChange={this.props.onChange}
        disabled={this.props.disabled}
        placeholder={this.props.placeholder}
        isMulti
        />);
  }
}

export default wrapComponent()(MultiSelect);
