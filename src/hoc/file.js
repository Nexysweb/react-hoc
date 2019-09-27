import React from 'react';
import PropTypes from 'prop-types';
import Digis from '@nexys/digis-i18n';

const { Request } = Digis;

export default class FileUpload extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    url: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
    onError: PropTypes.func
  }

  handleChange = e => {
    const { name = 'file', url, onSuccess, onError } = this.props;
    const formData = new FormData();

    const files = e.target.files;

    if (files && files.length > 0) {
      const file = file[0];
      formData.append(name, file);
      Request.post(url, formData).then(onSuccess, onError);
    }
  }

  render() {
    return null;
  }
}