/**
* wrapping input fields
* @see http://getbootstrap.com/css/#forms
*/
import React from 'react';
import Mandatory from '../components/mandatory.js';
import Tooltip from '../components/tooltip.js';

import wrapComponent from '../hoc/wrapper';

const i18n = {
  translate: (k) => k
}

class Wrapper extends React.Component {
  render() {
    let errorMsg = null;
    let mandatory = null;
    let info = null;
    let helper = null;
    let attribute = this.props.name;
    let label = null;

    // if mandatory, display asterisk after label
    if (this.props.mandatory && this.props.mandatory === true) {
      mandatory = (<span>
        <Mandatory/>&nbsp;
      </span>);
    }

    // if information link is required
    if (typeof this.props.info !== 'undefined') {
      info = (<span>
        &nbsp;
        <Tooltip id={this.props.name} text={this.props.info}/>
      </span>);
    }

    if (typeof this.props.label !== 'undefined') {
      label = (<label className="control-label" style={{marginRight: 4}}>
        {mandatory}
        {this.props.label}
        {info}
      </label>);
    }

    // if an error, show the note with error
    if (this.props.errors && this.props.errors[attribute]) {
      errorMsg = (this.props.errors[attribute]).map(function (err, idx) {
        return <span key={idx} className="has-error">{i18n.translate(err)}</span>;
      });
    }

    let r = ''

    if (this.props.errors && this.props.errors[attribute]) {
      r += ' has-error';

      errorMsg = (this.props.errors[attribute]).map(function (err, idx) {
        return <span key={idx} className="help-block">{err}</span>;
      });
    }

    // if a note should be displayed
    if (typeof this.props.helper !== 'undefined') {
      helper = <span className="help-block">{this.props.helper}</span>;
    }

    const className = 'form-group';

    return (
      <div className={className}>
        {label}
        <div>
          {this.props.children}
          {helper}
          {errorMsg}
        </div>
      </div>);
  }
}

export default wrapComponent()(Wrapper);
