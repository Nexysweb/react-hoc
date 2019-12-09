import React from 'react';

import PropTypes from 'prop-types';
import CrudDetail from '../../crud/detail';

import { storiesOf } from '@storybook/react';

import FormUI from './form-ui';
import { promise } from './data';

const ViewUI = (props) => <div>This is a view with data: {JSON.stringify(props.data)}</div>;

const initialData = {};

storiesOf('Crud', module)
  .add('Simple', () => <CrudDetail data={initialData} ViewUI={ViewUI} FormUI={FormUI} promise={promise}/>)
  
