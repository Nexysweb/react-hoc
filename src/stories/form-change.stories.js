import React from 'react';

import { storiesOf } from '@storybook/react';

import { FormWrapper } from '../hoc';

import Wrapper from '../form/wrapper';
import Input from '../form/input';

const form = {myinput: 'a default value'};

class MyForm extends React.Component {
  render() {
    const { onChange, errors } = this.props;
    return (<div>
      <Wrapper name="myinput" errors={errors}><Input name="myinput" value={form.myinput} onChange={onChange}/></Wrapper>
      <Wrapper name="myinput2" errors={errors}><Input name="myinput2" value={form.myinput2} onChange={onChange}/></Wrapper>
    </div>)
  }
}

const MyForm2 = FormWrapper()(MyForm);

storiesOf('Form Change', module)
  .add('Simple', () => <MyForm2/>)
  