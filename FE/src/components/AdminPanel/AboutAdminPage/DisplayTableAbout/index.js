import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageUpload from '../ImageUpload';


class DisplayTableAbout extends Component {

  handleEdit = (index) => {
    this.props.handleClickEdit(index);
  };

  isEnabled = (index) => ((this.props.clickedRow !== index 
      ? 'disabledField' 
      : 'enabledField'));

  renderButtons = (index) => {
    if (this.props.clickedRow === index) {
      return (
        <React.Fragment>
          {/* Save Button */}
          <button name="save" type="button" onClick={() => this.props.handleClickSave(index)}>
            Save
          </button>
          {/* Cancel Button */}
          <button name="cancel" type="button" onClick={() => this.props.handleClickCancel()}>
            Cancel
          </button>
        </React.Fragment>
      );
    } else {
      return (
        <button name="edit" type="button" onClick={() => this.handleEdit(index)}>
          Edit
        </button>
      );
    }
  };

  displayTable = (data) => {
    return data.map((result, index) => {
      return (
        <tr key={index} className={this.isEnabled(index)}>
          <td>{index}</td>
          <td>{result.id}</td>
          <td>
            <input
              name="description"
              type="text"
              value={result.description}
              className={this.isEnabled(index)}
              disabled={this.props.clickedRow !== index}
              onChange={(e) => (this.props.handleChange(e, 'description', index))}
            />
          </td>
          <td>
            <ImageUpload
              handleChange={this.props.handleImageUpload}
              source={`http://localhost:3001${result.image}`}
              isEnabled={index === this.props.clickedRow}
            />
            <br />
            <button
              type="button"
              onClick={this.props.handleButtonUploadClick}
              disabled={this.props.clickedRow !== index}>
              Upload
            </button>
          </td>
       
          {/* Render Save/Edit/Cancel buttons */}
          <td>{this.renderButtons(index)}</td>
          <td>
            <button
              type="button"
              name="delete"
              id={result.id + 'delete'}
              onClick={() => (this.props.handleClickDelete(result.id))}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    const { data } = this.props;
    console.log(data);
    return (
      <table>
        <tbody>
          <tr>
            <th colSpan="7">Welcome to the admin panel!</th>
          </tr>
          <tr>
            <th>index</th>
            <th>id</th>
            <th>description</th>
            <th>picture</th>

            <th colSpan="2">buttons</th>
          </tr>
          {data && this.displayTable(data)}
        </tbody>
      </table>
    );
  }
}


DisplayTableAbout.propTypes = {
  data: PropTypes.array,
  clickedRow: PropTypes.number,
  handleChange: PropTypes.func,
  handleButtonUploadClick: PropTypes.func,
  handleClickEdit: PropTypes.func,
  handleClickDelete: PropTypes.func,
  handleClickCancel: PropTypes.func,
};

export default DisplayTableAbout;
