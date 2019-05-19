import React from 'react';
import { Link } from 'react-router-dom';
import './Header.less';

const HeaderComponent = () =>
  <header>
    <ul>
      <li><Link to="/">ACME Ltd.</Link></li>
      <li><Link to="/team">Team</Link></li>
      <li><Link to="/careers">Careers</Link></li>
    </ul>
  </header>;

export default HeaderComponent;
