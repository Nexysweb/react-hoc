import React from 'react';
import PropTypes from 'prop-types';

const wrapComponent = () => WrappedComponent => class Hoc extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    title: PropTypes.string,
    /** Element that will be rendered in the panel head */
    header: PropTypes.element,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
      PropTypes.array
    ]),
    /** Deprecated. To show any type of actions use 'header' property */
    editState: PropTypes.func,
    /** Deprecated. To show any type of actions use 'header' property */
    edit: PropTypes.bool,
    /** Deprecated. To show any type of actions use 'header' property */
    toggle: PropTypes.bool,
    /** Deprecated. To show any type of actions use 'header' property */
    refresh: PropTypes.bool,
    /** Deprecated. To show any type of actions use 'header' property */
    onRefresh: PropTypes.func
  }

  render() {
    return <WrappedComponent title={this.props.title}>{this.props.children}</WrappedComponent>;
  }
}

export default wrapComponent;
