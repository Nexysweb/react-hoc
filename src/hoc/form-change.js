import React from 'react';

import Utils from  '@nexys/utils';

const { updateObject } = Utils.ds;

/**
 * @comment: this is not supposed to be rendered, use this class as a super class and replace the render method
 * 
 */
export default class FormChangeSuper extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      form: {}
    };
  }

  onChange = (a) => {
    const form = updateObject(this.state.form, a);

    this.setState({form});
  }
}
