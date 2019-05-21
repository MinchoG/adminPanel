import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';



class AdminPanel extends Component {

    render() {
    return (
      <div>
        <NavLink to='/admin/panel/Employees'>
          <button> 
            EMPLOYEES 
          </button>
        </NavLink>
        <NavLink to='/admin/panel/Openings'>
          <button> 
            OPENINGS 
          </button>
        </NavLink>
        <NavLink to='/admin/panel/About'>
          <button> 
            ABOUT 
          </button>
        </NavLink>
      </div>
    )
  }
}
export default withRouter(AdminPanel);
