import React from 'react';
import PropTypes from 'prop-types';

const wrapComponent = () => WrappedComponent => class Hoc extends React.Component {
  static propTypes = {
    /** To display errors properly, Wrapper must have the name of the input field */
    name: PropTypes.string.isRequired,
    /** Object of type {wrapperName: [array of errors]} */
    errors: PropTypes.object,
    /** Wrapped input field */
    children: PropTypes.element.isRequired,
    /** Label on top of the input field (optional) */
    label: PropTypes.string,
    /** If true, red asterisk will be displayed in front of the label */
    mandatory: PropTypes.bool,
    /** If given, info tooltip will be rendered after the label */
    info: PropTypes.string,
    /** If given, helper text in gray will be displayed beyond the field */
    helper: PropTypes.string
  }

  render() {
    return (<WrappedComponent
      mandatory={this.props.mandatory}
      label={this.props.label}
      info={this.props.info}
      helper={this.props.helper}
      errors={this.props.errors}
      >
      {this.props.children}
    </WrappedComponent>);
  }
}

export default wrapComponent;