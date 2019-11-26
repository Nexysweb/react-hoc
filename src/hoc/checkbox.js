import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/no-unused-prop-types */
const wrapComponent = () => WrappedComponent => class Hoc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};    
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool
  }

  componentDidMount() {
    this.processProps(this.props);
  }

  processProps = (props) => {
    const name = props.name;
    const value = props.value;

    const disabled = props.disabled ? props.disabled : false;

    this.setState({
      name,
      value,
      disabled
    });
  }

  handleChange = () => {
    // get new value
    const newValue = !this.state.value;
    // update state
    this.setState({value: newValue});

    // calls parent function
    this.props.onChange({name: this.props.name, value: newValue});
  }

  handleFocus = () => {
    this.setState({value: this.state.value});
  }

  handleBlur = () => {
    const nValue = this.state.value;
    this.setState({
      value: nValue
    });

    // calls parent function
    if (typeof this.props.onBlur !== 'undefined') {
      this.props.onBlur({name: this.state.name, value: nValue});
    }
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (nextProps.value !== this.props.value) {
      this.processProps(nextProps);
    }
  }

  render() {
    return (<WrappedComponent
      checked={this.state.value}
      onChange={this.handleChange}
      onFocus={this.handleFocus}
      onBlur={this.handleBlur}
      disabled={this.state.disabled ? true : undefined}
      />);
  }
}

export default wrapComponent;