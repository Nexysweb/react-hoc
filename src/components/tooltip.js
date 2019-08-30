import React from 'react';
import PropTypes from 'prop-types';
import { Overlay, Tooltip } from 'react-bootstrap';

import Icon from './icon.js';

export default class ToolTip extends React.Component {
  constructor(props) {
    super(props);

    const id = props.id ? props.id : 1;

    this.state = {
      id,
      show: false
    };
  }
  static propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.string
  }

  handleShowTooltip = e => {
    e.preventDefault();
    this.setState({show: true});
  }
  handleHideTooltip = e => {
    e.preventDefault();
    this.setState({show: false});
  }

  render() {
    /* eslint-disable react/no-string-refs, no-script-url */
    return (
      <a onMouseOver={this.handleShowTooltip} onMouseOut={this.handleHideTooltip} ref="target">
        <Icon name="info-circle"/>
        <Overlay show={this.state.show} placement="top" target={this.refs.target}>
          <Tooltip id={this.state.id}>{this.props.text}</Tooltip>
        </Overlay>
      </a>
    );
  }
}
