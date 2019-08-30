import React from 'react';

import wrapComponent from '../hoc/boolean';

class Input extends React.Component {
  render() {
    return (<div>
      Yes: <input type="radio" value checked={this.props.value === true} disabled={this.props.disabled} onChange={this.props.onChange}/>
      &nbsp;&nbsp;
      No: <input type="radio" value={false} checked={this.props.value === false} disabled={this.props.disabled} onChange={this.props.onChange}/>
    </div>);
  }
}

export default wrapComponent()(Input);
