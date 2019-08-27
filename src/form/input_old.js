import React from 'react';
import PropTypes from 'prop-types';

import Utils from  '@nexys/utils';

const { formatNumber, formatKprice } = Utils.number;

const getType = t => {
  if (t === 'email' || t === 'password') {
    return t;
  }

  // set text as default
  return 'text';
}

// sets value to empty for numeric fields
const setValue = (type, v) => {
  switch (type) {
    case 'number':
    case 'kPrice':
    case 'price':
    case 'rate':
      if (isNaN(v)) {
        return '';
      }
      return v;
    default:
      return v || '';
  }
}

  // depending on the 'type' format the value
const formatValue = (type, v) => {
  switch (type) {
    case 'number':
      return formatNumber(v, 0);
    case 'kPrice':
      return formatKprice(v) + ' k$';
    case 'price':
      return formatNumber(v, 2) + ' $';
    case 'rate':
      return formatNumber(v, 2) + ' %';
    default:
      return v || '';
  }
}

const numberTypes = ['number', 'kPrice', 'price', 'rate'];

const isNumberType = (type) => numberTypes.includes(type);

// depending on the 'type' assign style
const inputStyle = (type) => isNumberType(type) ? {textAlign: 'right', paddingRight: '5px'} : {};

/* eslint-disable react/no-unused-prop-types */
export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.processProps(props);
  }

  processProps = (props) => {
    const type = getType(props.type);

    const name = props.name;
    const value = setValue(props.type, props.value);

    const disabled = props.disabled ? props.disabled : false;
    const autoFocus = props.autoFocus ? props.autoFocus : false;

    // formatted value - value that will be displayed
    const fValue = formatValue(props.type, props.value);

    const style = inputStyle(props.type);

    // value is raw input, fValue is formatted input
    /* eslint-disable react/no-direct-mutation-state */
    this.state = {
      type,
      name,
      value,
      fValue,
      style,
      disabled,
      autoFocus
    };
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    /** Can accept one of the following types: email, password or text. The field will be formatted accordingly */
    type: PropTypes.string,
    /** If true, the field will get the focus once rendered. Can be handy for popovers */
    autoFocus: PropTypes.bool
  }

  handleChange = (event) => {
    console.log('handle')
    // get new value
    const newValue = setValue(this.props.type, event.target.value);

    // update state
    this.setState({fValue: newValue});

    // calls parent function
    this.props.onChange({name: this.state.name, value: newValue});
  }

  handleFocus = () => {
    this.setState({fValue: this.state.value});
  }

  handleBlur = () => {
    const nValue = this.state.fValue;
    this.setState({
      value: nValue,
      fValue: formatValue(this.props.type, nValue)
    });

    // calls parent function
    if (typeof this.props.onBlur !== 'undefined') {
      this.props.onBlur({name: this.state.name, value: nValue});
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.processProps(nextProps);
    }
  }

  render() {
    const className = 'form-control';

    return (<input
      className={className}
      type={this.state.type}
      placeholder={this.props.placeholder}
      value={this.state.fValue}
      onChange={this.handleChange}
      onFocus={this.handleFocus}
      onBlur={this.handleBlur}
      disabled={this.state.disabled ? true : undefined}
      style={this.state.style}
      autoFocus={this.state.autoFocus ? true : undefined}
      />);
  }
}
