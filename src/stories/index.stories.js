import React from 'react';

import { storiesOf } from '@storybook/react';

import Icon from '../components/icon'
import Card from '../components/card';
import Loader from '../components/loader';
import Nav from '../components/nav'

import List from '../components/list'

const data = [
  {name: 'Sheep', location: 'Europe', country: {name: 'United Kingdom'}, amount: 23.3, int: 23, date: '2019-09-05'},
  {name: 'Tiger', location: 'Asia', country: {name: 'India'}, amount: 24.1, int:  43, date: '2019-09-05'},
  {name: 'Elephant', location: 'Africa', country: {name: 'Tanzania'}, amount: 23, int:  3, date: '2019-09-05'},
  {name: 'Lion', location: 'Africa', country: {name: 'South Africa'}, amount: 0.3, int:  2, date: '2019-09-05'},
  {name: 'Cat', location: 'Europe', country: {name: 'Germany'}, amount: 2.31, int:  7, date: '2019-09-05'},
  {name: 'Grizzly', location: 'America', country: {name: 'Canada'}, amount: 3.35, int:  43, date: '2019-09-05'},
  {name: 'Antelope', location: 'Africa', country: {name: 'Namibia'}, amount: 2.3, int:  87, date: '2019-09-05'}
];

const def = [
  {name: 'name'},
  {name: 'location'},
  {name: 'country.name', label: 'Country'},
  {name: 'amount', label: 'A long label'},
  {name: 'int', label: 'd'},
  {name: 'date', label: 'a date'}
];

const nav = [{name: 'Name', link: '/sdf/sdf'}]

storiesOf('Components', module)
  .add('icon', () => <Icon name="home"/>)
  .add('list', () => <List data={data} def={def} nPerPage="3"/>)
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
