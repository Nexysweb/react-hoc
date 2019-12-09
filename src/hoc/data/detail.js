import React, { useState } from 'react';

import PropTypes from 'prop-types';
//import { useSnackbar } from 'notistack';
//import { confirmMessage } from 'utils';

const messageDefault = {
  edit: {
    success: 'Page has been updated successfully',
    error: 'error.message',
  }
};

function CrudDetail(props) {
  //const { enqueueSnackbar } = useSnackbar();

  const {
    data, ViewUI, FormUI, promise, Form, Toggle, message = messageDefault,
  } = props;

  const [state, setState] = useState(data);

  const handleUpdate = (d) => {
    // here call to the API
    console.log('handle update')
    setState(d);

    // to move the form component
    // confirmMessage(enqueueSnackbar, message.edit.success, 'success');
    // confirmMessage(enqueueSnackbar, message.edit.error, 'error');
  };

  return <Toggle
    View={(props) => <ViewUI data={state} {...props} />}
    // note the {...state} this is meant to remove the implicit reference, do not change
    Form={(props) => <Form UI={FormUI} data={{...state}} promise={promise} onUpdate={handleUpdate} {...props} />}
  />;
}

CrudDetail.propTypes = {
  data: PropTypes.object.isRequired,
  ViewUI: PropTypes.func.isRequired,
  FormUI: PropTypes.func.isRequired
};

export default CrudDetail;