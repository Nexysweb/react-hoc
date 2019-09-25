import React from 'react';

//import { Router } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';


import Nav from '../components/nav'

const nav = [{name: 'Name', link: '/sdf/sdf', isActive: true}, {name: 'Name2', link: '/sdf/sdf'}, {name: 'Name2', disabled: true, link: '/sdf/sdf'}]

storiesOf('Components', module)
  .add('Nav tabs', () => <Layout><Router location="sd">
    <a href="https://getbootstrap.com/docs/4.3/components/navs/">https://getbootstrap.com/docs/4.3/components/navs/</a>
    <h3>Tabs</h3>
    <Nav data={nav} tabs/>
    <h3>Pills</h3>
    <Nav data={nav} pills/>
    <h3>Neutral</h3>
    <Nav data={nav}/>
  </Router></Layout>)
 

class Layout extends React.Component {
  render() {
    return (<div className="row">
      <div className="col-md-4" style={{marginLeft: '20pt'}}>
      {this.props.children}
      </div>
    </div>)
  }
}
