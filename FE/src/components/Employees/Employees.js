import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Employees.less';
import uuid from 'uuid';

import { fetchEmployees } from '../../redux/actions';

class Employees extends Component {
  renderEmployee(employee) {
    return (
      <div className="employee" key={employee.id || uuid()}>
        <img src={`http://localhost:3001/images/${employee.picture}`} alt={employee.picture}/>
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
        <div className="small">{this.props.employee.data.filter(v => !v.big).map(employee => this.renderEmployee(employee))}</div>
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
