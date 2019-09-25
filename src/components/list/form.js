import React from 'react';

import Icon from '../../components/icon';
import Input from '../../form/input';
import InputAppend from '../../form/input-append';

export class SearchUnit extends React.Component {
  render() {
    const { name, value, onChange } = this.props;
    return (<div className="input-group">
      <Input name={name} value={value} onChange={v => onChange(v)}/>
      <InputAppend>
        <Icon name="search"/>
      </InputAppend>
    </div>)
  }
}