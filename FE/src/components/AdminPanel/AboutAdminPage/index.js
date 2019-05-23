import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DisplayTable from './DisplayTableAbout';
import uuid from 'uuid';
import axios from 'axios';

import { 
  fetchAbout,
  deleteClickedAbout,
  editAbout,
  cancelEditAbout,
  saveAboutWithPOST,
  saveAboutWithPUT,
  editAboutValue,
  addAbout,
  putSelectedFileInStore,
  storeUploadedPicName
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

  storeUploadedPictureNameInState = newName => {
    const { data } = this.props.about;
    data[this.props.about.clickedRow].image = newName;
    console.log('DATA MASIV:', data);
    this.props.storeUploadedPicName(data);
  };

  uploadFile = async () => {
    const fd = new FormData();
    try {
      if (this.props.about.selectedFile) {
        fd.append('image', this.props.about.selectedFile, this.props.about.selectedFile.name);
        const postFile = await axios.post('http://localhost:3001/images', fd, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
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
            clickedRow={this.props.about.clickedRow}
            data={this.props.about.data}
            handleChange={this.handleChange}
            handleButtonUploadClick={this.handleButtonUploadClick}
            handleClickDelete={this.handleClickDelete}
            handleClickSave={this.handleClickSave}
            handleClickEdit={this.handleClickEdit}
            handleClickCancel={this.handleClickCancel}
            handleImageUpload={this.handleImageUpload}
          />
          <button type="button" name="add" id="addButton" onClick={() => this.props.addAbout({id: null, key: uuid()})}>
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
  putSelectedFileInStore: (payload) => dispatch(putSelectedFileInStore(payload)),
  storeUploadedPicName: (payload) => dispatch(storeUploadedPicName(payload)),
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
  storeUploadedPicName: PropTypes.func,
  handleClickDelete: PropTypes.func,
  handleClickSave: PropTypes.func,
  handleImageUpload: PropTypes.func,
  handleClickEdit: PropTypes.func,
  putSelectedFileInStore: PropTypes.func,
  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (AboutAdminPage);