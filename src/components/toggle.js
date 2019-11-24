import React from 'react';

import toggleHoc from '../hoc/toggle';
import Card from '../components/card';
import Icon from '../components/icon'

const LayoutComponent = props => {
  const { children, onClick, toggle } = props;

  return <Card>{children}<button onClick={onClick}><Icon name={toggle ? "close": "pencil"}/></button></Card>
}

const Toggle = toggleHoc()(LayoutComponent);

export default Toggle;