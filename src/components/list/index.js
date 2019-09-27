import React from 'react';

import NexysUtil from '@nexys/utils';

import { NoRow, ColCell, HeaderUnit, Row, OrderController, ListWrapper, ListContainer, ListHeader, ListBody, RecordInfo } from './ui';
import { SearchUnit } from './form';

import { order, orderWithPagination } from './order-utils';
import { applyFilter } from './filter-utils';

import Pagination from './pagination';

const { get } = NexysUtil.ds;

class ListSuper extends React.Component {
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
      const label = h.label === null ? null : h.label || h.name;

      //const order = label ? <OrderControllerUpAndDown onClick={descAsc => this.setOrder(h.name)}/> : null;
      const order = label ? <OrderController onClick={descAsc => this.setOrder(h.name)}/> : null;

      return <HeaderUnit key={i}>{label} {order}</HeaderUnit>;
    })
  }

  setFilter = (v) => {
    const { filters } = this.state;

    if (v.value === '') {
      //filters.filter(x => x.name !== )
      delete(filters[v.name]);
    } else {
      filters[v.name] = v.value === '' ? null : v.value;
    }

    // when a filter is applied, the page index is reset
    const pageIdx = 1;

    this.setState({filters, pageIdx});
  }

  renderFilters() {
    const { filters } = this.state;
    return this.props.def.map((h, i) => {
      if (!h.filter) {
        return null;
      }

      return (<HeaderUnit key={i}>
        <SearchUnit name={h.name} value={filters[h.name]} onChange={v => this.setFilter(v)}/>
      </HeaderUnit>);
    })
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
    return null;
  }
}

class GlobalSearch extends React.Component {
  render() {
    const { onChange, filters, config } = this.props;

    if (!config.search) {
      return null;
    }

    const key = "globalSearch";
    const value = filters[key];
    return <div className="pull-right"><SearchUnit onChange={v => onChange(v)} name={key} value={value}/></div>;
  }
}

export default class List extends ListSuper {
  componentDidUpdate(p) {
    console.log(p)
    console.log(this.props);

    this.render();
  }

  render() {
    const { data, nPerPage = 5, options, config = {} } = this.props;
    const { filters, pageIdx, sortAttribute, sortDescAsc } = this.state;
    
    const fData = applyFilter(data, filters);
    const n = fData.length;

    const pData = orderWithPagination(order(fData, sortAttribute, sortDescAsc), pageIdx, nPerPage);

    return (<ListWrapper>
      <GlobalSearch config={config} onChange={v => this.setFilter(v)} filters={filters}/>
      <ListContainer>
        <ListHeader>
          <Row>
            {this.renderHeaders()}
          </Row>
          <Row>
            {this.renderFilters()}
          </Row>
        </ListHeader>
        <ListBody>
          {this.renderBody(pData)}
        </ListBody>
      </ListContainer>
    
      <RecordInfo n={n} idx={pageIdx} nPerPage={nPerPage}/>
      <Pagination n={n} nPerPage={nPerPage} idx={pageIdx} onClick={v => this.changePage(v)}/>

      <NoRow n={n}/>
    </ListWrapper>);
  }
}


