import React from 'react';
import PropTypes from 'prop-types';

const wrapComponent = () => WrappedComponent => class Hoc extends React.Component {
   constructor(props) {
    super(props);

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
    value: PropTypes.array,
    placeholder: PropTypes.string,
    /** Deprecated. Options must be used */
    values: PropTypes.array,
    /** Deprecated. Value must be used */
    selected: PropTypes.array
  }

  /**
   * in case values are fetched async, the component will update once props change
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const values = nextProps.values || nextProps.options;
    const selected = nextProps.selected || nextProps.value;
    this.setState({values, selected});
  }

  handleChange = (v) => {
    console.log(v);
    let selected = [];
    if (v.length > 0) {
      selected = v.map(x => x.value);
    }

    // selected= v.value;

    this.setState({selected});
    this.props.onChange({name: this.props.name, value: selected});
  }

  render() {
    console.log(this.state.values)
    return (
      <WrappedComponent
        name={this.props.name}
        class="form-control"
        options={this.state.values}
        value={this.state.selected}
        onChange={this.handleChange}
        disabled={this.props.disabled}
        placeholder={this.props.placeholder ? this.props.placeholder : 'Select...'}
        multiple
        />);
  }
}

export default wrapComponent;
