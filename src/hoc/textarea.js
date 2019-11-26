import React from 'react';
import PropTypes from 'prop-types';

const wrapComponent = () => WrappedComponent => class Hoc extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      value: this.props.value,
      rows: this.props.rows
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    /** Number of columns */
    cols: PropTypes.number,
    /** Number of rows (default is 1) */
    rows: PropTypes.number,
    disabled: PropTypes.bool
  }

  handleChange(event) {
    // get new value
    const newValue = event.target.value;

    // update state
    this.setState({value: newValue});

    // calls parent function
    this.props.onChange({name: this.state.name, value: newValue});
  }

  handleBlur() {
    const nValue = this.state.value;
    this.setState({
      value: nValue
    });

    // calls parent function
    if (typeof this.props.onBlur !== 'undefined') {
      this.props.onBlur({name: this.state.name, value: nValue});
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
  }

  render() {

    return (
      <WrappedComponent
      /* eslint-disable react/forbid-component-props */
        value={this.state.value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        rows={this.state.rows}
        cols={this.props.cols}
        placeholder={this.props.placeholder}
        disabled={this.props.disabled}
        />
    );
  }
}

export default wrapComponent;
