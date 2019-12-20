import React, { useState } from 'react';

import PropTypes from 'prop-types';
import Utils from '@nexys/utils';

const renderLoading = (isLoading, Loader) => {
  if(isLoading) {
    return <Loader/>;
  }

  return null;
}

const Form = (props) => {
  const {
    data,
    UI,
    promise,
    errors = null,
    onUpdate = x => x,
    onToggle = () => null,
    Loader
  } = props;

  const isLoading = false;

  const [state, setState] = useState({data, errors, isLoading});

  if (!data) {
    return null;
  }

  const handleChange = (a) => setState({...state, data: Utils.ds.updateObject(state.data, a)});

  const handleSubmit = (e) => {
    e.preventDefault();

    // display loader    
    setState({...state, isLoading: true});
    
    // enters promise
    promise(state.data, props).then(x => {
      
      const errors = null;
      const isLoading = false;

      setState({...state, errors, isLoading});
      // successful case
      onUpdate(state.data);
      onToggle(false)
      //
    }, errorResult => {
      const { errors } = errorResult;

      // unsuccessful case
      const isLoading = false;
      setState({...state, errors, isLoading});
    });
  };

  return <React.Fragment>
    <UI onSubmit={handleSubmit} onChange={handleChange} onCancel={onToggle} data={state.data} errors={state.errors} />
    {renderLoading(state.isLoading, Loader)}
  </React.Fragment>;
};

Form.propTypes = {
  data: PropTypes.object.isRequired,
  onToggle: PropTypes.func,
  onUpdate: PropTypes.func,
  UI: PropTypes.func.isRequired,
};

export const FormUIPropTypes = {
  data: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Form;
