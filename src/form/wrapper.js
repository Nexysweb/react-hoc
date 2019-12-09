/**
* wrapping input fields
* @see http://getbootstrap.com/css/#forms
*/
import React from 'react';
import Mandatory from '../components/mandatory.js';
//import Tooltip from '../components/tooltip.js';

import wrapComponent from '../hoc/wrapper';

const i18n = {
  translate: k => k
}

const ErrorMessage = props => <ul>{props.errors.map((error, idx) => <li key={idx}><span>{i18n.translate(error)}</span></li>)}</ul>;

const renderMandatory = mandatory => {
  if (mandatory && mandatory === true) {
    return <span>
      <Mandatory/>&nbsp;
    </span>;
  }

  return null;
}

const renderErrors = (errors, attribute) => {
  // if an error, show the note with error
  if (errors && errors[attribute]) {
    return <ErrorMessage errors={errors[attribute]}/>
  }

  return null;
}

const Label = props => {
  if (!props.label) {
    return null;
  }

  return <label className="control-label" style={{marginRight: 4}}>
    {renderMandatory(props.mandatory)}
    {props.label}
    <Info info={props.info}/>
  </label>;
}

const Helper = props => {
  if (!props.helper) {
    return null;
  }

  // if a note should be displayed
  return <span className="help-block">{props.helper}</span>;
}

const Info = props => {
  if (!props.info) {
    return null;
  }

  return <span>
    &nbsp;
    {/*<Tooltip id={this.props.name} text={this.props.info}/>*/}
  </span>;
}

const Wrapper = props => (<div className={'form-group'}>
  <Label label={props.label} mandatory={props.mandatory} info={props.info}/>
  <div>
    {props.children}
    <Helper helper={props.helper}/>
    {renderErrors(props.errors, props.name)}
  </div>
</div>);

export default wrapComponent()(Wrapper);
