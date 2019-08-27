import React from 'react';
import PropTypes from 'prop-types';
import Cleave from 'cleave.js/react';

import Utils from  '@nexys/utils';

const { formatNumber } = Utils.number;

const determineSuffix = (type) => {
  switch (type) {
    case 'kPrice':
      return 'k$';
    case 'price':
      return '$';
    case 'rate':
      return '%';
    default:
      return null;
  }
}

const determinePrecision = (type) => {
  switch (type) {
    case 'number':
    case 'kPrice':
    case 'price':
      return 0;
    case 'rate':
      return 2;
    default:
      return 2;
  }
}

/* eslint-disable react/forbid-component-props, react/no-unused-prop-types */
export default class NumberInput extends React.Component {
  constructor(props) {
    super(props);

    this.processProps(props);
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    /** Supported types: price, kPrice, rate and number */
    type: PropTypes.string
  }

  processProps = (props) => {
    const name = props.name;
    const suffix = determineSuffix(props.type);
    const disabled = props.disabled ? props.disabled : false;
    const precision = determinePrecision(props.type);
    const value = formatNumber(props.value, precision);

    /* eslint-disable react/no-direct-mutation-state */
    this.state = {
      value,
      name,
      disabled,
      suffix,
      precision
    };
  }

  
  handleChange = (event) => {
    // get new value
    let newValue = event.target.rawValue;

    // update state
    this.setState({value: newValue});

    // calls parent function
    this.props.onChange({name: this.state.name, value: Number(newValue)});
  }

  handleBlur = () => {
    const value = formatNumber(this.state.value, this.state.precision);
    this.setState({value});

    if (typeof this.props.onBlur !== 'undefined') {
      this.props.onBlur({name: this.state.name, value: Number(this.state.value)});
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.processProps(nextProps);
    }
  }

  render() {
    const options = {
      numeral: true,
      numericOnly: true,
      numeralThousandsGroupStyle: 'thousand',
      delimiter: '\'',
      numeralDecimalMark: '.',
      numeralDecimalScale: this.state.precision
    };
    const className = 'input-numeral form-control';
    const style = {textAlign: 'right'};

    return (
      <div className="input-group my-input-group">
        <Cleave
          value={this.state.value}
          className={className}
          options={options}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          placeholder={this.props.placeholder}
          disabled={this.state.disabled ? true : undefined}
          style={style}
          />
        <span className="input-group-addon">{this.state.suffix}</span>
      </div>
    );
  }
}
