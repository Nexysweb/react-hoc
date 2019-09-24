import React from 'react';

import Icon from '../../components/icon';

export class PaginationWrapper extends React.Component {
  render() {
    return (<nav>
      <ul className="pagination">
        {this.props.children}
      </ul>
    </nav>);
  }
}

export class PaginationUnit extends React.Component {
  render() {
    const className = 'page-item' + (this.props.isActive ? ' active' : '') + (this.props.isDisabled ? ' disabled' : '');
    return <li className={className}><button className="page-link" onClick={this.props.onClick}>{this.props.children}</button></li>;
  }
}

export class ColCell extends React.Component {
  render() {
    const { children} = this.props;
    return <td>{children}</td>
  }
}

export class HeaderUnit extends React.Component {
  render() {
    const { children} = this.props;
    return <th>{children}</th> 
  }
}

export class OrderController extends React.Component {
  render() {
    return (<span>
      <span key={"asc"} onClick={_ => this.props.onClick(true)}><Icon name="caret-up"/></span>
      <span key={"desc"} onClick={_ => this.props.onClick(false)}><Icon name="caret-down"/></span>
    </span>);
  }
} 

export class ListWrapper extends React.Component {
  render() {
    const { children} = this.props;
    return <div>{children}</div>;
  }
}

export class ListContainer extends React.Component {
  render() {
    const { children} = this.props;
    return <table className="table">{children}</table>;
  }
}

export class ListHeader extends React.Component {
  render() {
    const { children} = this.props;
    return <thead><tr>{children}</tr></thead>;
  }
}

export class ListBody extends React.Component {
  render() {
    const { children} = this.props;
    return <tbody>{children}</tbody>;
  }
}