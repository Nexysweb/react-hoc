import React from 'react';

import withLoader from '../../crud/load';
import { storiesOf } from '@storybook/react';

const promise = new Promise(resolve => setTimeout(() => {
  resolve({a: 'fake data'});
}, 1000));

const SampleComponent = props => {
  const { data } = props;

  return <p>My data is {JSON.stringify(data)}</p>;
}

const ComponentWithData = withLoader(SampleComponent, promise)

storiesOf('Crud', module)
  .add('Load', () => <ComponentWithData/>)
