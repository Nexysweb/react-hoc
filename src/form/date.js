/**
 * wrapping of datepicker into components
 * @see https://chmln.github.io/flatpickr/#example-basic
 * @see https://github.com/coderhaoxin/react-flatpickr
 */
import React from 'react';

import Flatpickr from 'react-flatpickr';
import wrapComponent from '../hoc/date';

class MyDate extends React.Component {
  render() {
    const className = 'form-control';
    const options = {
      enableTime: this.props.enableTime,
      dateFormat: this.props.dateFormat,
      inline: this.props.inline
    };

    console.log(options)
    console.log('s')

    // since flatpickr doesn't understant string format need to change the value for it
    const value = this.props.value ? new Date(this.props.value) : this.props.value;

    /* eslint-disable react/forbid-component-props */
    return (
      <Flatpickr
        className={className}
        options={options}
        value={value}
        disabled={this.props.disabled}
        onChange={this.props.onChange}
        />);
  }
}

export default wrapComponent()(MyDate);