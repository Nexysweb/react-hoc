/**
 * file upload
 * https://speckyboy.com/custom-file-upload-fields/
 * https://codepen.io/stebaker/pen/tImBc
 */

import React from 'react';

import Icon from './icon';

export default class FileUpload extends React.Component {
  onChange = (e) => {
    this.props.onChangeHandler(e)
  }

  render() {
    const name = this.props.name || 'file';

    return (<div className="file-upload-wrapper">
      <div className="file-upload">
        <input accept={this.props.accept} type="file" name={name} onChange={this.props.onChange}/>
        <Icon name="arrow-up"/>
      </div>
    </div>);
  }
}
