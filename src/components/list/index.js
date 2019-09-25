import React from 'react';

import NexysUtil from '@nexys/utils';

import { PaginationUnit, PaginationWrapper, ColCell, HeaderUnit, HeaderRow, OrderController, ListWrapper, ListContainer, ListHeader, ListBody, RecordInfo } from './ui';
import { getPagination, getPageTiles } from './pagination-utils';

import { order, orderWithPagination } from './order-utils';
import { applyFilter } from './filter-utils';

import Icon from '../../components/icon';
import Input from '../../form/input';
import InputAppend from '../../form/input-append';

const { get } = NexysUtil.ds;

export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortAttribute: null,
      sortDescAsc: true,
      filters: {},
      pageIdx: 1
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

    filters[v.name] = v.value;

    // when a filter is applied, the page index is reset
    const pageIdx = 1;

    this.setState({filters, pageIdx});
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

  renderPagination(pagination, idx) {
    const { nPage } = pagination;

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

  changePage = pageIdx => {
    this.setState({pageIdx});
  }

  renderBody(data) {
    const { def } = this.props;
    
    return data.map((row, i) => {
      return (<tr key={i}>
        {def.map((h, j) => {
          return <ColCell key={j}>{h.render ? h.render(row) : get(h.name, row)}</ColCell>
        })}
      </tr>);
    });
  }

  render() {
    const { data } = this.props;
    const { filters, pageIdx } = this.state;
    const fData = applyFilter(data, filters);

    const nPerPage = this.props.nPerPage;
    const n = fData.length;
    const pagination = getPagination(n, nPerPage);

    const { sortAttribute, sortDescAsc } = this.state;

    const pData = orderWithPagination(order(fData, sortAttribute, sortDescAsc), pageIdx, nPerPage);

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
        {this.renderBody(pData)}
      </ListBody>
    </ListContainer>
    
    <RecordInfo n={n} idx={pageIdx} nPerPage={nPerPage}/>
    {this.renderPagination(pagination, pageIdx)}
    </ListWrapper>);
  }
}