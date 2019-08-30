/**
 * wrapping of a yes/no input compnents (boolean)
 */
import React from 'react';
import PropTypes from 'prop-types';

const wrapComponent = () => WrappedComponent => class Hoc extends React.Component {
  constructor(props) {
    super(props);

    const value = this.props.value;
    const name = this.props.name;
    const disabled = props.disabled === true;

    this.state = {
      name,
      value,
      disabled
    };

  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  }

  handleChange = (v) => {
    // here cast is required otherwise don't get the right value
    const value = v.target.value === 'true';
    const name = this.state.name;

    // update state
    this.setState({value});

    // calls parent function
    this.props.onChange({name, value});
  }

  render() {
    return (<WrappedComponent value={this.state.value} disabled={this.state.disabled} onChange={this.handleChange}/>);
  }
}

export default wrapComponent;

