import React from 'react';

import NexysUtil from '@nexys/utils';

import { PaginationUnit, PaginationWrapper, ColCell, HeaderUnit, OrderController, ListWrapper, ListContainer, ListHeader, ListBody } from './ui';
import { getPagination, getPageTiles } from './pagination-utils';

const { get } = NexysUtil.ds;

export default class Table extends React.Component {
  constructor(props) {
    super(props);

    const n = props.data.length;

    this.state = {
      n,
      sortAttribute: null,
      sortDescAsc: true,
      pagination: getPagination(n, props.nPerPage)
    }
  }

  renderHeaders() {
    return this.props.def.map((h, i) => {
      const label = h.label || h.name;
      const order = label ? <OrderController onClick={descAsc => this.setOrder(h.name, descAsc)}/> : null;

      return <HeaderUnit key={i}>{label} {order}</HeaderUnit>;
    })
  }

  renderPaginationUnit(k, isActive, idx) {
    return <PaginationUnit key={idx} isActive={isActive} onClick={x => this.changePage(k)}>{k}</PaginationUnit>; // <li key={k} className="page-item"><button className="page-link" onClick={x => this.changePage(i)}>{k}</button></li>;
  }

  renderPagination() {
    const { pagination } = this.state;
    const { idx, nPage } = pagination;

    const units = getPageTiles(idx, nPage).map((i) => {
      if ( i < 0 ) {
        return <PaginationUnit key={i} isDisabled={true}>...</PaginationUnit>;
      }

      return this.renderPaginationUnit(i, i === idx, i);
    });

    return (<PaginationWrapper>
      <PaginationUnit isDisabled={idx === 1} onClick={x => this.changePage(idx - 1)}>&laquo;</PaginationUnit>
      {units}
      <PaginationUnit isDisabled={idx === nPage} onClick={x => this.changePage(idx + 1)}>&raquo;</PaginationUnit>
    </PaginationWrapper>)
  }

  setOrder = (name, descAsc) => {
    this.setState({sortDescAsc: descAsc, sortAttribute: name});
  }

  order() {
    const { data } = this.props;
    const { sortAttribute, sortDescAsc } = this.state;

    if (!sortAttribute) {
      return data;
    }

    // use function in utils
    const compare = ( a, b, attribute ) => {
      const ac = get(attribute, a);
      const bc = get(attribute, b);

      if ( ac < bc ){
        return -1;
      }
      if ( ac > bc ){
        return 1;
      }
      return 0;
    }

    const ordered = data.sort((a, b) => compare(a, b, sortAttribute));

    if (sortDescAsc === false) {
      return ordered.reverse();
    }

    return ordered;
  }

  orderWithPagination = () => {
    const { pagination } = this.state;
    const { idx, nPerPage } = pagination;

    const start = (idx - 1) * nPerPage;
    const end = (idx) * nPerPage;

    return this.order().slice(start, end);
  }

  changePage = idx => {
    const { pagination } = this.state;
    pagination.idx = idx;

    this.setState({pagination});
  }

  renderBody() {
    const { def } = this.props;
    
    return this.orderWithPagination().map((row, i) => {
      return (<tr key={i}>
        {def.map((h, j) => {
          return <ColCell key={j}>{h.render ? h.render(row) : get(h.name, row)}</ColCell>
        })}
      </tr>);
    });
  }

  render() {
    return (<ListWrapper><ListContainer>
      <ListHeader>
        {this.renderHeaders()}
      </ListHeader>
      <ListBody>
        {this.renderBody()}
      </ListBody>
    </ListContainer>
    {this.renderPagination()}
    </ListWrapper>);
  }
}