import React from 'react';

import { storiesOf } from '@storybook/react';

import Icon from '../components/icon'
import Card from '../components/card';
import Loader from '../components/loader';
import Nav from '../components/nav'

import List from '../components/list'

const data = [
  {name: 'Sheep', location: 'Europe', country: {name: 'United Kingdom'}},
  {name: 'Tiger', location: 'Asia', country: {name: 'India'}},
  {name: 'Elephant', location: 'Africa', country: {name: 'Tanzania'}},
  {name: 'Lion', location: 'Africa', country: {name: 'South Africa'}},
  {name: 'Cat', location: 'Europe', country: {name: 'Germany'}},
  {name: 'Grizzly', location: 'America', country: {name: 'Canada'}},
  {name: 'Antelope', location: 'Africa', country: {name: 'Namibia'}}];

const def = [
  {name: 'name'},
  {name: 'location'},
  {name: 'country.name', label: 'Country'}
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
