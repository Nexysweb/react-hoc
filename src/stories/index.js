import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button } from '@storybook/react/demo';

import Icon from '../components/icon'

import Input from '../form/input';
import InputNumber from '../form/number-input';
import MyBoolean from '../form/boolean';
import Checkbox from '../form/checkbox';

storiesOf('Components', module)
  .add('icon', () => <Icon name="home"/>);

storiesOf('form', module)
  .add('input', () => <Input name="myinput" onChange={action('clicked')}/>)
  .add('input number', () => <InputNumber name="mynumber" onChange={action('clicked')}/>)
  .add('boolean', () => <MyBoolean name="myboolean" onChange={action('clicked')}/>)
  .add('checkbox', () => <Checkbox name="mycheckbox" onChange={action('clicked')}/>)
