import React from 'react';

import { storiesOf } from '@storybook/react';

import Icon from '../components/icon'
import Card from '../components/card';
import Loader from '../components/loader';
import Nav from '../components/nav'

const nav = [{name: 'Name', link: '/sdf/sdf'}]

storiesOf('Components', module)
  .add('icon', () => <Icon name="home"/>)
  .add('Card', () => <Layout><Card title="Panel title">Panel with custom header</Card></Layout>)
  .add('Loader', () => <Layout><Loader/></Layout>)
  .add('Nav', () => <Layout><Nav data={nav}/> </Layout>)

class Layout extends React.Component {
  render() {
    return (<div className="row">
      <div className="col-md-4" style={{marginLeft: '20pt'}}>
      {this.props.children}
      </div>
    </div>)
  }
}
