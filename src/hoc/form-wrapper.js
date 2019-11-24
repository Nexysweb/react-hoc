import React from 'react';

import Utils from  '@nexys/utils';

const { updateObject } = Utils.ds;

const FormChange = props => FormComponent => class Hoc extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      form: {},
      errors: {}
    };
  }

  onChange = (a) => {
    const form = updateObject(this.state.form, a);

    this.setState({form});
  }

  render() {
    return <FormComponent errors={this.state.errors} onChange={this.onChange}/>;
  }
}

export default FormChange;