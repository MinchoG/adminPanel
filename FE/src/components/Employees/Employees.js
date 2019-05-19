import React, { Component } from 'react';
import Api from '../helpers/Api';
import './Employees.less';

class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: {big: [], small: []}
    };
  }

  componentDidMount() {
    Api.getEmployees().then(employees => this.setState({ employees: {
      big: employees.filter(function(employee) {
        return employee.big
      }),
      small: employees.filter(function(employee, i) {
        return employees[i].id >2
      })
    } }));
  }

  renderEmployee(employee) {
    return (
      <div className="employee">
        <img src={employee.picture} />
        <span>{employee.name}</span>
      </div>
    );
  }

  render() {
    return (
      <section className="Employees">
        <h2>Team</h2>
        <div className="big">{this.state.employees.big.map(employee => this.renderEmployee(employee))}</div>
        <div className="small">{this.state.employees.small.map(employee => this.renderEmployee(employee))}</div>
      </section>
    );
  }
}

export default Employees;
