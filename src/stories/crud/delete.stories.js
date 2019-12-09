import React from 'react';
import { Route, Switch, BrowserRouter as Router, Redirect, Link } from 'react-router-dom';

import { storiesOf } from '@storybook/react';

import * as D from '../../crud/delete';

const promise = new Promise(resolve => {
  resolve(true);
})

storiesOf('Crud', module)
  .add('Delete', () => <D.Delete promise={promise} onSuccess={() => alert('asd')}/>)
  .add('Delete wit redirect', () => <Router>
    <Switch>
      <Route exact path="/a">Redirected! <small><Link to="/">back</Link></small></Route>
      <Route to="/"><D.DeleteWRedirect promise={promise} link={'/a'}/></Route>
    </Switch>
  </Router>);
