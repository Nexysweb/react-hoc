/**
 * wrapping of a yes/no input compnents (boolean)
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class Boolean extends React.Component {
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
    return (<div>
      Yes: <input type="radio" value checked={this.state.value === true} disabled={this.state.disabled} onChange={this.handleChange}/>
      &nbsp;&nbsp;
      No: <input type="radio" value={false} checked={this.state.value === false} disabled={this.state.disabled} onChange={this.handleChange}/>
    </div>);
  }
}
