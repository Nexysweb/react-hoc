import React from 'react';

import Icon from '../../components/icon';
import { paginationBoundaries } from './order-utils';

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

export class OrderControllerUpAndDown extends React.Component {
  render() {
    return (<span>
      <span key={"asc"} onClick={_ => this.props.onClick(true)}><Icon name="caret-up"/></span>
      <span key={"desc"} onClick={_ => this.props.onClick(false)}><Icon name="caret-down"/></span>
    </span>);
  }
}

export class OrderController extends React.Component {
  render() {
    return (<span onClick={_ => this.props.onClick(null)}><Icon name="sort"/></span>);
  }
} 

export class ListWrapper extends React.Component {
  render() {
    const { children} = this.props;
    return <div className="table-responsive-sm">{children}</div>;
  }
}

export class ListContainer extends React.Component {
  render() {
    const { children} = this.props;
    return <table className="table table-striped table-bordered">{children}</table>;
  }
}

export class Row extends React.Component {
  render() {
    const { children} = this.props;
    return <tr>{children}</tr>;
  }
}

export class ListHeader extends React.Component {
  render() {
    const { children} = this.props;
    return <thead>{children}</thead>;
  }
}

export class ListBody extends React.Component {
  render() {
    const { children} = this.props;
    return <tbody>{children}</tbody>;
  }
}

export class RecordInfo extends React.Component {
  render() {
    const { nPerPage, idx, n } = this.props;
    const { start, end } = paginationBoundaries(idx, nPerPage);
    return <p className="pull-right">Showing {start + 1} to {(Number(start) + Number(nPerPage)) > n ? n : end} of {n} entries</p>
  }
}