import React from 'react';


import AsyncSelect from 'react-select/async';
import wrapComponent from '../hoc/select2';

const colourOptions = [
  {id: 1, name: 'red'},
  {id: 2, name: 'green'},
  {id: 3, name: 'pink'},
  {id: 4, name: 'yellow'},
  {id: 5, name: 'black'}
].map(x => {
  x.label = x.name;
  x.value = x.name;
  return x;
})

const filterColors = (inputValue) => {
  return colourOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

class Typeahead extends React.Component {
  handleChange = v => {
    console.log(v)
    this.props.onChange(v.id)
  }

  render() {
    return (<AsyncSelect
      cacheOptions defaultOptions
      loadOptions={promiseOptions}
      defaultValue={this.props.value}
      onChange={this.props.onChange}
      />);
  }
}

export default wrapComponent()(Typeahead);

