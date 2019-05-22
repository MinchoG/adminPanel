import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DisplayTable from './DisplayTableAbout';

import { 
  fetchAbout,
  deleteClickedAbout,
  editAbout,
  cancelEditAbout,
  saveAboutWithPOST,
  saveAboutWithPUT,
  editAboutValue,
  addAbout,
   } from '../../../redux/actions';
   
class AboutAdminPage extends Component {

  handleClickDelete = async eventId => {
    this.props.deleteClickedAbout(eventId);
  }

  handleClickEdit = index => {
    this.props.editAbout(index);
  };

  handleClickCancel = () => {
    this.props.cancelEditAbout();
  };

  handleClickLogout = () => {
    this.props.history.push('/');
    localStorage.clear();
    return;
  };

  handleClickSave = async index => {
    if(this.props.about.addingRow) {
      //we will do POST, cause we have added a row
      const changedData = this.props.about.data[index];
      const token = localStorage.getItem('token');
      const payload = {
        changedData,
        token
      }
      this.props.saveAboutWithPOST(payload);
    } else {
      const changedData = this.props.about.data[index];
      console.log('changedData:',changedData);
      const token = localStorage.getItem('token');
      const payload = {
        changedData,
        token
      };
      this.props.saveAboutWithPUT(payload);
    }
  }

  handleChange = (e, propName, index) => {
    const { data } = this.props.about;
    data[parseInt(index)][propName] = e.target.value;
    this.props.editAboutValue(data);
  };

  componentDidMount() {
    this.props.fetchAbout();
  }

  
  render() {
      return (
        <div className="tableCont">
          <DisplayTable
            clickedRow={this.props.about.clickedRow}
            data={this.props.about.data}
            handleChange={this.handleChange}
            handleButtonUploadClick={this.handleButtonUploadClick}
            handleClickDelete={this.handleClickDelete}
            handleClickSave={this.handleClickSave}
            handleClickEdit={this.handleClickEdit}
            handleClickCancel={this.handleClickCancel}
          />
          <button type="button" name="add" id="addButton" onClick={() => this.props.addAbout({id: null})}>
            Add
          </button>
          <button type="button" name="logout" id="logoutButton" onClick={this.handleClickLogout}>
            Logout
          </button>
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  about: state.about
})

const mapDispatchToProps = (dispatch) => ({
  fetchAbout: (payload) => dispatch(fetchAbout(payload)),
  deleteClickedAbout: (payload) => dispatch(deleteClickedAbout(payload)),
  editAbout: (payload) => dispatch(editAbout(payload)),
  cancelEditAbout: (payload) => dispatch(cancelEditAbout(payload)),
  saveAboutWithPOST: (payload) => dispatch(saveAboutWithPOST(payload)),
  saveAboutWithPUT: (payload) => dispatch(saveAboutWithPUT(payload)),
  editAboutValue: (payload) => dispatch(editAboutValue(payload)),
  addAbout: (payload) => dispatch(addAbout(payload)),
})

AboutAdminPage.propTypes = {
  fetchAbout: PropTypes.func,
  deleteClickedAbout: PropTypes.func,
  editAbout: PropTypes.func,
  cancelEditAbout: PropTypes.func,
  saveAboutWithPOST: PropTypes.func,
  saveAboutWithPUT: PropTypes.func,
  editAboutValue: PropTypes.func,
  addAbout: PropTypes.func,
  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (AboutAdminPage);