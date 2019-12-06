import React from 'react';

const toggleHoc = () => WrappedComponent => class Hoc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {toggle: false};
  }

  handleToggle = () => {
    const toggle = !this.state.toggle;

    this.setState({toggle});
  }

  /*static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  }*/

  render() {
    //console.log(wrapperLayoutComponent)
    const { toggle } = this.state;
    const { View, Form } = this.props;

    const Content = toggle ? Form : View;

    return <WrappedComponent
      {...this.props}
      toggle={toggle}
      onClick={this.handleToggle}
      >
      <Content onToggle={this.handleToggle}/>
    </WrappedComponent>;
  }
}

export default toggleHoc;
