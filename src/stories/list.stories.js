import React from 'react';

import { storiesOf } from '@storybook/react';


import List from '../components/list'
import Checkbox from '../form/checkbox'

const data = [
  {id: 2, check: true, name: 'Sheep', location: 'Europe', country: {name: 'United Kingdom'}, amount: 23.3, int: 23, date: '2019-09-05'},
  {id: 3, name: 'Tiger', location: 'Asia', country: {name: 'India'}, amount: 24.1, int:  43, date: '2019-09-05'},
  {id: 4, name: 'Elephant', location: 'Africa', country: {name: 'Tanzania'}, amount: 23, int:  3, date: '2019-09-05'},
  {id: 5, name: 'Lion', location: 'Africa', country: {name: 'South Africa'}, amount: 0.3, int:  2, date: '2019-09-05'},
  {id: 6, name: 'Cat', location: 'Europe', country: {name: 'Germany'}, amount: 2.31, int:  7, date: '2019-09-05'},
  {id: 7, name: 'Grizzly', location: 'America', country: {name: 'Canada'}, amount: 3.35, int:  43, date: '2019-09-05'},
  {id: 8, name: 'Antelope', location: 'Africa', country: {name: 'Namibia'}, amount: 2.3, int:  87, date: '2019-09-05'}
];

const def = [
  {name: 'name', filter: true},
  {name: 'location', filter: true},
  {name: 'country.name', label: 'Country', filter: true},
  {name: 'amount', label: 'A long label', filter: true},
  {name: 'int', label: 'd', filter: true},
  {name: 'date', label: 'a date', filter: true}
];

class ListTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checks: {}
    };
  }

  setCheck (v) {
    const { checks } = this.state;
    console.log(v)

    checks[v.name] = "true";

    data[2].check = true;


    this.setState({checks})
  }

  render() {
    const { checks } = this.state;
    console.log(checks)
    const def2 = [
      {name: 'check', label: null, render: x => <span>sdf{JSON.stringify(x.check)}<Checkbox name={x.name} value={x.check} onChange={v => this.setCheck(v)}/></span>},
      {name: 'name'},
      {name: 'location'}
    ];

    const config = {search: true};

    return <List data={data} def={def2} config={config}/>
  }

}

storiesOf('List', module)
  .add('list with filters', () => <List data={data} def={def} nPerPage="3"/>)
  .add('list with checkbox', () => <ListTest/>)
