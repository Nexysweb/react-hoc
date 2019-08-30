import React from 'react';
import PropTypes from 'prop-types';

// Convert the id in case it's a number
const getValue = v => {
  if (!isNaN(v)) return Number(v);
  return v;
}

const wrapComponent = () => WrappedComponent => class Hoc extends React.Component {
  constructor(props) {
    super(props);

    // value is raw input, fValue is formatted input
    this.state = {
      name: this.props.name,
      values: this.props.values || this.props.options,
      value: this.props.selected || this.props.value
    };

    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    /** Array of objects of type {id: <id>, label: <displayed value>} */
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    /** Deprecated. Value must be used */
    defaultValue: PropTypes.string,
    /** Deprecated. Value must be used */
    selected: PropTypes.string,
  }

  /**
   * in case values are fetched async, the component will update once props change
   */
  componentWillReceiveProps(nextProps) {
    const values = nextProps.values || nextProps.options;
    const selected = nextProps.selected || nextProps.value;
    this.setState({values, selected});
  }

  handleChange = (event) => {
    // get new value
    const newValue = getValue(event.target.value);

    // update state
    this.setState({value: newValue});

    // calls parent function
    this.props.onChange({name: this.state.name, value: newValue});
  }

  render() {
    return (<WrappedComponent
      value={this.state.value || 0}
      onChange={this.handleChange}
      placeholder={this.props.placeholder}
      disabled={this.props.disabled}
      options={this.props.options}
      defaultValue={this.props.defaultValue}
      />);
  }
}

export default wrapComponent;
