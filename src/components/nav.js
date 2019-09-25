import React from 'react';

import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
 render() {
   const { data, tabs, pills } = this.props;

   const className = 'nav' + (tabs ? ' nav-tabs' : '') + (pills ? ' nav-pills' : '')

   return (<ul className={className}>
      {data.map((d, i) => {
        console.log(d)
        const className = 'nav-link' + (d.isActive || d.active ? ' active' : '')  + (d.isDisabled || d.disabled ? ' disabled' : '');;
         return (<li key={i} className="nav-item">
          <Link className={className} to={d.link}>{d.name}</Link>
        </li>)
        }
      )}
    </ul>);
 }
}