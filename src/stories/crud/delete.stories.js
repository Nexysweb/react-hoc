import React from 'react';
import { Route, Switch, BrowserRouter as Router, Redirect, Link, useHistory } from 'react-router-dom';

import { storiesOf } from '@storybook/react';

export const Delete = props => {


  const { promise, onSuccess = () => null } = props;

  const onClick = a => {
    promise.then(x => {
      console.log('deleted');
      return onSuccess(x)
    })
  }

  return <button type="button" className="btn btn-danger" onClick={onClick}>Danger</button>;
}

export const DeleteWRedirect = props => {
  let history = useHistory();
  const { promise, link } = props;

  const onSuccess = x => {
    console.log(link)
    return history.push(link)
  };

  return <Delete promise={promise} onSuccess={onSuccess}/>
}


const promise = new Promise(resolve => {
  resolve(true);
})

storiesOf('Crud', module)
  .add('Delete', () => <Delete promise={promise} onSuccess={() => alert('asd')}/>)
  .add('Delete wit redirect', () => <Router>
    <Switch>
      <Route exact path="/a">Redirected! <small><Link to="/">back</Link></small></Route>
      <Route to="/"><DeleteWRedirect promise={promise} link={'/a'}/></Route>
    </Switch>
  </Router>);
  
