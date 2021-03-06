import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.less';

import About from './About/About';
import Employees from './Employees/Employees';
import Openings from './Openings/Openings';
import Header from './Header/Header';
import PrivateRoute from './PrivateRoute';
import LoginPage from './AdminPanel/LoginPage';
import LoggedOut from './AdminPanel/LoggedOut';
import AdminPanel from './AdminPanel/AdminPanel';
import EmployeesAdminPage from './AdminPanel/EmployeesAdminPage';
import OpeningsAdminPage from './AdminPanel/JobsAdminPage';
import AboutAdminPage from './AdminPanel/AboutAdminPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={About} />
          <Route path="/team" component={Employees} />
          <Route path="/careers/:id?" component={Openings} />
          <Route exact path="/admin" component={LoginPage} />
          <Route path="/logged_out" component={LoggedOut} />
          <PrivateRoute path="/admin/panel" component={AdminPanel} />
          <PrivateRoute exact path="/admin/panel/Employees" component={EmployeesAdminPage} />
          <PrivateRoute exact path="/admin/panel/Openings" component={OpeningsAdminPage} />
          <PrivateRoute exact path="/admin/panel/About" component={AboutAdminPage} />
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
