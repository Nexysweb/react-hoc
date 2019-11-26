/**
 * wrapping of datepicker into components
 * @see https://chmln.github.io/flatpickr/#example-basic
 * @see https://github.com/coderhaoxin/react-flatpickr
 */
import React from 'react';
import PropTypes from 'prop-types';

import Utils from '@nexys/utils';

import Config from '../config';

const getDateFormat = (dateFormatProps, enableTimeProps) => {
  const dateFormatString =  Config.format.date;
  const datetimeFormatString = Config.format.datetime;

  if (dateFormatProps) {
    return dateFormatProps;
  }

  if (enableTimeProps){
    return datetimeFormatString;
  }

  return  dateFormatString;
}

const wrapComponent = () => WrappedComponent => class Hoc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      value: this.props.value,
      dateFormat: getDateFormat(props.dateFormat, props.enableTime),
      inline: this.props.inline || false
    };
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    /** If true, time picker will be displayed, and date format will be ISO (default is string of type 'dd-mm-yyyy') */
    enableTime: PropTypes.bool,
    /** If given, displayed date will be format according to it */
    dateFormat: PropTypes.string,
    /** If true, the calendar will be displayed initially. Otherwise only after clicking on the input field */
    inline: PropTypes.bool
  }

  handleChange = (v) => {
    // get new value
    if (typeof v[0] !== 'undefined') {
      // return ISO date for dateTime picker, otherwise return 'YYYY-MM-DD' string format
      const value = this.props.enableTime ? v[0] : Utils.date.formatDateFromObject(v[0]);

      const name = this.state.name;

      // update state
      this.setState({value});

      // calls parent function
      this.props.onChange({name, value});
    } else {
      // value is deleted
      this.setState({value: null});
      this.props.onChange({name: this.state.name, value: null});
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (typeof nextProps.value !== 'undefined') {
      const format = getDateFormat(nextProps.dateFormat, nextProps.enableTime);
      this.setState({value: nextProps.value, dateFormat: format});
    }
  }

  render() {
    // since flatpickr doesn't understant string format need to change the value for it
    const value = this.state.value ? new Date(this.state.value) : this.state.value;

    /* eslint-disable react/forbid-component-props */
    return (
      <WrappedComponent
        value={value}
        disabled={this.props.disabled}
        onChange={this.handleChange}
        enableTime={this.props.enableTime}
        dateFormat={this.state.dateFormat}
        inline={this.state.inline}
        />);
  }
}

export default wrapComponent
