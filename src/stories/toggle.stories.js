import React from 'react';

import { storiesOf } from '@storybook/react';

import Toggle from '../components/toggle';

const ToggleView = () => <div>This is a view</div>;
const ToggleForm = (props) => {
  const onClick = e => {
    console.log(e)
    // this allows to toggle back to previous state
    props.onToggle(true);
  }

  return <div>This is a form and <button onClick={onClick}>I would like to submit and go back to other state</button></div>;
}

storiesOf('Toggle', module)
  .add('Simple', () => <Toggle View={ToggleView} Form={ToggleForm}>a</Toggle>)
  