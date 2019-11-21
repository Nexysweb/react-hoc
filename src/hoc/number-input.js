import React from 'react';
import PropTypes from 'prop-types';

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

const wrapComponent = () => WrappedComponent => class Hoc extends React.Component {
  constructor(props) {
    super(props);

    this.processProps(props);
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
    // get raw numeric value
    const value = Number(event.target.rawValue);
    const { precision } = this.state;

    // update state with formatted value
    this.setState({value: formatNumber(value, precision)});

    // pass numeruc value to parent onChange function
    this.props.onChange({name: this.state.name, value});
  }

  handleBlur = event => {
    // get raw numeric value
    const value = Number(event.target.rawValue);
    const { precision } = this.state;

    // update state with formatted value
    this.setState({value: formatNumber(value, precision)});

    // if parent onBlur, pass the numeric value
    if (typeof this.props.onBlur !== 'undefined') {
      this.props.onBlur({name: this.state.name, value});
    }
  }

  componentWillReceiveProps(nextProps) {
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
      <WrappedComponent
        value={this.state.value}
        className={className}
        options={options}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        placeholder={this.props.placeholder}
        disabled={this.state.disabled ? true : undefined}
        style={style}
        suffix={this.state.suffix}
      />
    );
  }
}

export default wrapComponent;