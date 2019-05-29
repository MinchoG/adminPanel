import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import DisplayTable from './DisplayTableEmployees';
import { 
  fetchEmployees, 
  receiveEmployees, 
  receiveClickedRow,
  deleteClickedRow,
  addEmployee,
  editEmployee,
  cancelEditEmployee,
  editEmployeeValue,
  saveEmployeeWithPOST,
  saveEmployeeWithPUT,
  storeUploadedPicName,
  putSelectedFileInStore,
  takeUISnapShot
   } from '../../../redux/actions';
   

class EmployeesAdminPage extends Component {

  handleClickDelete = async eventId => {
    this.props.deleteClickedRow(eventId);
  }

  handleClickEdit = index => {
    this.props.editEmployee(index);
    // this.props.takeUISnapShot(); DOES NOT WORK WITHOUT IMMUTABLE
  };
  
  handleClickCancel = () => {
    this.props.cancelEditEmployee();
  };

  handleClickLogout = () => {
    this.props.history.push('/');
    localStorage.clear();
    return;
  };

  handleClickSave = async index => {
    if(this.props.employee.addingRow) {
      //we will do POST, cause we have added a row
      const changedData = this.props.employee.data[index];
      const token = localStorage.getItem('token');
      const payload = {
        changedData,
        token
      }
      this.props.saveEmployeeWithPOST(payload);
    } else {
      const changedData = this.props.employee.data[index];
      console.log('changedData:',changedData);
      const token = localStorage.getItem('token');
      const payload = {
        changedData,
        token
      };
      this.props.saveEmployeeWithPUT(payload);
    }
  }

  handleChange = (e, propName, index) => {
    const { data } = this.props.employee;
    data[parseInt(index)][propName] = e.target.value;
    this.props.editEmployeeValue(data);
  };

  componentDidMount() {
    this.props.fetchEmployees();
  }
  
  storeUploadedPictureNameInState = newName => {
    const { data } = this.props.employee;
    data[this.props.employee.clickedRow].picture = newName;
    console.log('DATA MASIV:', data);
    this.props.storeUploadedPicName(data);
  };

  uploadFile = async () => {
    const fd = new FormData();
    try {
      if (this.props.employee.selectedFile) {
        fd.append('image', this.props.employee.selectedFile, this.props.employee.selectedFile.name);
        const postFile = await axios.post('http://localhost:3001/images', fd, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Form DATA:', fd);
        this.storeUploadedPictureNameInState(postFile.data);
      } else {
        console.log('File in state is null!');
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleImageUpload = file => {
    this.props.putSelectedFileInStore(file);
  };

  handleButtonUploadClick = () => {
    this.uploadFile();
  };


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
          handleImageUpload={this.handleImageUpload}
          handleClickEdit={this.handleClickEdit}
          handleClickCancel={this.handleClickCancel}
        />
        <button type="button" name="add" id="addButton" onClick={() => this.props.addEmployee({id: null, key: uuid()})}>
          Add
        </button>
        <button type="button" name="logout" id="logoutButton" onClick={this.handleClickLogout}>
          Logout
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  employee: state.employee
});

const mapDispatchToProps = dispatch => ({
  addEmployee: (payload) => dispatch(addEmployee(payload)),
  fetchEmployees: (payload) => dispatch(fetchEmployees(payload)),
  receiveEmployees: (payload) => dispatch(receiveEmployees(payload)),
  receiveClickedRow: (payload) => dispatch(receiveClickedRow(payload)),
  deleteClickedRow: (payload) => dispatch(deleteClickedRow(payload)),
  editEmployee: (payload) => dispatch(editEmployee(payload)),
  cancelEditEmployee: (payload) => dispatch(cancelEditEmployee(payload)),
  editEmployeeValue: (payload) => dispatch(editEmployeeValue(payload)),
  saveEmployeeWithPOST: (payload) => dispatch(saveEmployeeWithPOST(payload)),
  saveEmployeeWithPUT: (payload) => dispatch(saveEmployeeWithPUT(payload)),
  storeUploadedPicName: (payload) => dispatch(storeUploadedPicName(payload)),
  putSelectedFileInStore: (payload) => dispatch(putSelectedFileInStore(payload)),
  takeUISnapShot: (payload) => dispatch(takeUISnapShot(payload)),
});

EmployeesAdminPage.propTypes = {
  //from dispatch
  fetchEmployees: PropTypes.func,
  receiveEmployees: PropTypes.func,
  receiveClickedRow: PropTypes.func,
  deleteClickedRow: PropTypes.func,
  addEmployee: PropTypes.func,
  editEmployeeValue: PropTypes.func,
  saveEmployeeWithPOST: PropTypes.func,
  saveEmployeeWithPUT: PropTypes.func,
  storeUploadedPicName: PropTypes.func,
  //from state
  employee: PropTypes.object,
  data: PropTypes.array,
  handleChange: PropTypes.func,
  handleButtonUploadClick: PropTypes.func,
  handleClickDelete: PropTypes.func,
  handleClickSave: PropTypes.func,
  handleImageUpload: PropTypes.func,
  handleClickEdit: PropTypes.func,
  cancelEditEmployee: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesAdminPage);
