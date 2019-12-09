import React from 'react';

import { storiesOf } from '@storybook/react';

import Form from '../../crud/form';

import FormUI from './form-ui';
import { promise } from './data';

const dataInitial = {myinput: 'a default value'};

storiesOf('Crud', module)
  .add('Form Change Simple', () => <Form UI={FormUI} data={dataInitial} promise={promise}/>)
  