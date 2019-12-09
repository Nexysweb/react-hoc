import React from 'react';

import { storiesOf } from '@storybook/react';

import Layout from '../layout';
import Icon from '../../components/icon'
import Card from '../../components/card';
import Loader from '../../components/loader';

const nav = [{name: 'Name', link: '/sdf/sdf'}]

storiesOf('Components', module)
  .add('icon', () => <Icon name="home"/>)
  .add('Card', () => <Layout><Card title="Panel title">Panel with custom header</Card></Layout>)
  .add('Loader', () => <Layout><Loader/></Layout>)
  
