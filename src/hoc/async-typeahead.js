import React from 'react';

const wrapComponent = (requestFetchFunc) => MainComponent => class Hoc extends React.Component {
  constructor(props) {
    super(props);

    const data = [];
    const value = null;
    const clear = false;

    this.state = {data, clear, value};
  }

  search = value => {
    /** possible to pass either a function or a URL for request */
    const {  url } = this.props;
    if (this.props.onSearch && typeof this.props.onSearch === 'function') {
      this.props.onSearch(value).then(data => {
        this.setState({data})
      });
    } else {
      requestFetchFunc.get(url).then(data => this.setState({data}));
    }
  }

  handleCreateLabel = v => {
    const { optionFormat } = this.props;

    if (optionFormat && typeof optionFormat === 'function') {
      return optionFormat(v);
    }

    return <span>{v.name}</span>;
  };

  handleCreateValue = v => {
    const { valueFormat } = this.props;

    if (valueFormat && typeof valueFormat === 'function') {
      return valueFormat(v);
    }

    return v.name;
  };

  handleSelect = v => {
    const {name} = this.props;

    this.setState({value: v});

    // makes sense to return entire object
    const value = {name, value: v};

    const { onChange, onSelect } = this.props;
    if (onChange && typeof onChange === 'function') {
      this.props.onChange(value);
    }  
    if (onSelect && typeof onSelect === 'function') {
      this.props.onSelect(value);
    } 
  }

  handleClear = () => this.setState({data: [], value: null});

  render() {
    const { data, clear } = this.state;

    return <MainComponent
      values={data}
      clear={clear}
      onChange={this.handleSelect}
      search={this.search}
      onClear={this.handleClear}
      onCreateLabel={this.handleCreateLabel}
      onCreateValue={this.handleCreateValue}
      url={this.props.url}
      {...this.props}
      />;
  }
}

export default wrapComponent;