import React from 'react';

import NexysUtil from '@nexys/utils';

import { PaginationUnit, PaginationWrapper, ColCell, HeaderUnit, HeaderRow, OrderController, ListWrapper, ListContainer, ListHeader, ListBody, RecordInfo } from './ui';
import { getPagination, getPageTiles } from './pagination-utils';

import { order, orderWithPagination } from './order-utils';
import { applyFilter } from './filter-utils';

import Icon from '../../components/icon';
import Input from '../../form/input';
import InputAppend from '../../form/input-append';

const { get, set } = NexysUtil.ds;

export default class Table extends React.Component {
  constructor(props) {
    super(props);

    const n = props.data.length;

    const filters = {};

    this.state = {
      n,
      sortAttribute: null,
      sortDescAsc: true,
      pagination: getPagination(n, props.nPerPage),
      filters
    }
  }

  renderHeaders() {
    return this.props.def.map((h, i) => {
      const label = h.label || h.name;
      //const order = label ? <OrderControllerUpAndDown onClick={descAsc => this.setOrder(h.name)}/> : null;
      const order = label ? <OrderController onClick={descAsc => this.setOrder(h.name)}/> : null;

      return <HeaderUnit key={i}>{label} {order}</HeaderUnit>;
    })
  }

  setFilter = (v) => {
    const { filters } = this.state;

    // set(v.name, v.value, filters);

    filters[v.name] = v.value;
    console.log(filters);

    this.setState({filters});
  }

  renderFilters() {
    const { filters } = this.state;
    return this.props.def.map((h, i) => {
      return <HeaderUnit key={i}><div className="input-group"><Input name={h.name} value={filters[h.name]} onChange={v => this.setFilter(v)}/><InputAppend><Icon name="search"/></InputAppend></div></HeaderUnit>;
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

  /**
   * defines order to apply
   * @param  {[type]} name    attribute/column
   * @param  {[type]} descAsc true/false - asc or desc. if null, will toggle
   * @return {[type]}         [description]
   */
  setOrder = (name, descAsc = null) => {
    if (descAsc === null) {
      const { sortDescAsc } = this.state;
      descAsc = !sortDescAsc;
    }

    this.setState({sortDescAsc: descAsc, sortAttribute: name});
  }

  orderWithPagination = () => {
    const { data } = this.props;
    const { sortAttribute, sortDescAsc, pagination, filters } = this.state;
    const { idx, nPerPage } = pagination;

    const fData = applyFilter(data, filters);

    const n = fData.length;
    // this.setState({n});

    return orderWithPagination(order(fData, sortAttribute, sortDescAsc), idx, nPerPage);
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
        <HeaderRow>
          {this.renderHeaders()}
        </HeaderRow>
        <HeaderRow>
          {this.renderFilters()}
        </HeaderRow>
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