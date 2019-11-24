import React from 'react';
import PropTypes from 'prop-types';

export default class FileUpload extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    url: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    postRequest: PropTypes.func.isRequired
  }

  handleChange = e => {
    const { name = 'file', url, onSuccess, onError } = this.props;

    const formData = new FormData();

    const files = e.target.files;

    if (files && files.length > 0) {
      const file = file[0];
      formData.append(name, file);

      //postRequest(url, formData).then(onSuccess, onError);
    }
  }

  render() {
    return null;
  }
}