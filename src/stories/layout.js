import React from 'react';

export default props => {
  return (<div className="row">
    <div className="col-md-4" style={{marginLeft: '20pt'}}>
    {props.children}
    </div>
  </div>);
}
