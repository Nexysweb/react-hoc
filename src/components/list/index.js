import React from 'react';

import NexysUtil from '@nexys/utils';

import { PaginationUnit, PaginationWrapper, ColCell, HeaderUnit, OrderController, ListWrapper, ListContainer, ListHeader, ListBody, RecordInfo } from './ui';
import { getPagination, getPageTiles } from './pagination-utils';

import { order, orderWithPagination } from './order-utils';

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
    return <PaginationUnit key={idx} isActive={isActive} onClick={x => this.changePage(k)}>{k}</PaginationUnit>;
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

  orderWithPagination = () => {
    const { data } = this.props;
    const { sortAttribute, sortDescAsc, pagination } = this.state;
    const { idx, nPerPage } = pagination;

    return orderWithPagination(order(data, sortAttribute, sortDescAsc), idx, nPerPage);
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
    const {pagination, n} = this.state
    const { idx, nPerPage } = pagination;

    return (<ListWrapper><ListContainer>
      <ListHeader>
        {this.renderHeaders()}
      </ListHeader>
      <ListBody>
        {this.renderBody()}
      </ListBody>
    </ListContainer>
    
    <RecordInfo n={n} idx={idx} nPerPage={nPerPage}/>
    {this.renderPagination()}
    </ListWrapper>);
  }
}