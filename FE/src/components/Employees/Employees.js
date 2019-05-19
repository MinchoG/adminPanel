import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Employees.less';

import { fetchEmployees } from '../../redux/actions';

class Employees extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     employees: {big: [], small: []}
  //   };
  // }

  // componentDidMount() {
  //   Api.getEmployees().then(employees => this.setState({ employees: {
  //     big: employees.filter(function(employee) {
  //       return employee.big
  //     }),
  //     small: employees.filter(function(employee, i) {
  //       return employees[i].id >2
  //     })
  //   } }));
  // }

  renderEmployee(employee) {
    return (
      <div className="employee">
        <img src={employee.picture} alt={employee.picture}/>
        <span>{employee.name}</span>
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchEmployees();
  }

  render() {
    return (
      <section className="Employees">
        <h2>Team</h2>
        <div className="big">
          {this.props.employee.data.filter(v => v.big).map(employee => this.renderEmployee(employee))}
        </div>
        <div className="small">{this.props.employee.data.filter(v=>v.big===0).map(employee => this.renderEmployee(employee))}</div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  employee: state.employee
});

const mapDispatchToProps = dispatch => ({
  fetchEmployees: payload => dispatch(fetchEmployees(payload))
});

Employees.propTypes = {
  fetchEmployees: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Employees);
