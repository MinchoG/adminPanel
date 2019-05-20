import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DisplayTable from './DisplayTableAbout';


class AboutAdminPage extends Component {

    

    render() {
        return (
          <div className="tableCont">
            <DisplayTable
              clickedRow={this.props.employee.clickedRow}
              data={this.props.employee.data}
              handleChange={this.handleChange}
              handleButtonUploadClick={this.handleButtonUploadClick}
              handleClickDelete={this.handleClickDelete}
              handleClickSave={this.handleClickSave}
              handleClickEdit={this.handleClickEdit}
              handleClickCancel={this.handleClickCancel}
            />
            <button type="button" name="add" id="addButton" onClick={() => this.props.addEmployee({id: null})}>
              Add
            </button>
            <button type="button" name="logout" id="logoutButton" onClick={this.handleClickLogout}>
              Logout
            </button>
          </div>
        );
      }
}


export default AboutAdminPage;