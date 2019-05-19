import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DisplayTable from './DisplayTableJobs';

import {
  fetchOpenings,
  receiveOpenings,
  deleteClickedOpening,
  editOpening,
  cancelEditOpening,
  addOpening,
  editOpeningValue,
  saveOpeningsWithPOST,
  saveOpeningsWithPUT
  
} from '../../../redux/actions';

class JobsAdminPage extends Component {


  handleClickDelete = async eventId => {
    this.props.deleteClickedOpening(eventId);
  }

  handleClickEdit = index => {
    this.props.editOpening(index);
    // this.props.takeUISnapShot(); DOES NOT WORK WITHOUT IMMUTABLE
  };

  handleClickCancel = () => {
    this.props.cancelEditOpening();
  };
  
  handleClickLogout = () => {
    this.props.history.push('/');
    localStorage.clear();
    return;
  };
  

  handleClickSave = async (index) => {
    if(this.props.openings.addingRow) {
      //we will do POST, cause we have added a row
      const changedData = this.props.openings.data[index];
      const token = localStorage.getItem('token');
      const payload = {
        changedData,
        token
      }
      this.props.saveOpeningsWithPOST(payload);
    } else {
      const changedData = this.props.openings.data[index];
      console.log('changedData:',changedData);
      const token = localStorage.getItem('token');
      const payload = {
        changedData,
        token
      };
      this.props.saveOpeningsWithPUT(payload);
    }
  };

  handleChange = (e, propName, index) => {
    const { data } = this.props.openings;
    data[parseInt(index)][propName] = e.target.value;
    this.props.editOpeningValue(data);
  };

  componentDidMount() {
    this.props.fetchOpenings();
  }

  render() {
    return (
      <div className="tableCont">
        <DisplayTable
          clickedRow={this.props.openings.clickedRow}
          data={this.props.openings.data}
          handleChange={this.handleChange}
          handleClickDelete={this.handleClickDelete}
          handleClickSave={this.handleClickSave}
          handleClickEdit={this.handleClickEdit}
          handleClickCancel={this.handleClickCancel}
        />
        <button
          type="button"
          name="add"
          id="addButton"
          onClick={() => this.props.addOpening({id: null})}>
          Add
        </button>
        <button
          type="button"
          name="logout"
          id="logoutButton"
          onClick={this.handleClickLogout}>
          Logout
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  openings: state.openings,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOpenings: (payload) => dispatch(fetchOpenings(payload)),
  receiveOpenings: (payload) => dispatch(receiveOpenings(payload)),
  deleteClickedOpening: (payload) => dispatch(deleteClickedOpening(payload)),
  editOpening: (payload) => dispatch(editOpening(payload)),
  cancelEditOpening: (payload) => dispatch(cancelEditOpening(payload)),
  addOpening: (payload) => dispatch(addOpening(payload)),
  editOpeningValue: (payload) => dispatch(editOpeningValue(payload)),
  saveOpeningsWithPOST: (payload) => dispatch(saveOpeningsWithPOST(payload)),
  saveOpeningsWithPUT: (payload) => dispatch(saveOpeningsWithPUT(payload)),
});

JobsAdminPage.propTypes = {
  
  fetchOpenings: PropTypes.func,
  openings: PropTypes.object,
  receiveOpenings: PropTypes.func,
  deleteClickedOpening: PropTypes.func,
  editOpening: PropTypes.func,
  cancelEditOpening: PropTypes.func,
  clickedRow: PropTypes.number,
  data: PropTypes.array,
  handleChange: PropTypes.func,
  handleClickDelete: PropTypes.func,
  handleClickSave: PropTypes.func,
  handleClickEdit: PropTypes.func,
  handleClickCancel: PropTypes.func,
  addOpening: PropTypes.func,
  editOpeningValue: PropTypes.func,
  saveOpeningsWithPOST: PropTypes.func,
  saveOpeningsWithPUT: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobsAdminPage);
