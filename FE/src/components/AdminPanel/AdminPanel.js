import React, { Component } from 'react';

class AdminPanel extends Component {
  renderSelect() {
    const onChange = (e) => {
      switch (e.target.value) {
        case 'Employee': {
          this.props.history.push('admin/Employees');
          break;
        }
        case 'Jobs': {
          this.props.history.push('admin/Openings');
          break;
        }
        default:
          return null;
      }
    };

    return (
      <select defaultValue="default" onChange={(e) => onChange(e)}>
        <option value="default">Please ...</option>
        <option value="Employee">Employee</option>
        <option value="Jobs">Jobs</option>
      </select>
    );
  }

  render() {
    return <div>{this.renderSelect()}</div>;
  }
}
export default AdminPanel;
