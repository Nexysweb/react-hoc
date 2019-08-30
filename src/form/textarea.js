import React from 'react';
import Textarea from 'react-textarea-autosize';

import wrapComponent from '../hoc/textarea';

class MyTextarea extends React.Component {
  render() {
    const myClass = 'form-control';

    return (
      <Textarea
      /* eslint-disable react/forbid-component-props */
        className={myClass}
        value={this.props.value}
        onChange={this.props.onChange}
        onBlur={this.props.handleBlur}
        rows={this.props.rows}
        cols={this.props.cols}
        placeholder={this.props.placeholder}
        disabled={this.props.disabled}
        />
    );
  }
}

export default wrapComponent()(MyTextarea);
