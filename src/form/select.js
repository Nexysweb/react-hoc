import React from 'react';
import PropTypes from 'prop-types';

// Convert the id in case it's a number
const getValue = v => {
  if (!isNaN(v)) return Number(v);
  return v;
}

export default class Select extends React.Component {
  constructor(props) {
    super(props);

    // value is raw input, fValue is formatted input
    this.state = {
      name: this.props.name,
      values: this.props.values || this.props.options,
      selected: this.props.selected || this.props.value
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

  handleChange(event) {
    // get new value
    const newValue = getValue(event.target.value);

    // update state
    this.setState({value: newValue});

    // calls parent function
    this.props.onChange({name: this.state.name, value: newValue});
  }

  render() {
    const options = this.state.values.map((x, i) => {
      return <option key={i} value={x.id}>{x.label}</option>;
    });

    if (this.props.placeholder) {
      options.unshift(<option key="placeholder" value="" disabled selected hidden>{this.props.placeholder}</option>);
    }

    return (<select
      className="form-control"
      // defaultValue={this.state.selected}
      value={this.state.selected || 0}
      onChange={this.handleChange}
      disabled={this.props.disabled}
      >
      <option>{this.props.defaultValue}</option>
      {options}
    </select>);
  }
}
