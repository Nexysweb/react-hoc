import React from 'react';

//import { Router } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';



const SeeMore = props => {
  const { text, len, seeMoreLabel = 'See more' } = props;

  const onClick = a => {
    
  }

  return <React.Fragment>truncated <a onClick={onClick}>{seeMoreLabel}</a></React.Fragment>
}

const nav = [{name: 'Name', link: '/sdf/sdf', isActive: true}, {name: 'Name2', link: '/sdf/sdf'}, {name: 'Name2', disabled: true, link: '/sdf/sdf'}]

storiesOf('Components', module)
  .add('See more', () => <Layout>see more</Layout>);
 

class Layout extends React.Component {
  render() {
    return (<div className="row">
      <div className="col-md-4" style={{marginLeft: '20pt'}}>
      {this.props.children}
      </div>
    </div>)
  }
}
