import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      source: props.source
    };
  }

  onChange = async ({
    target: {
      files: [file]
    }
  }) => {
    const source = await this.readFile(file);

    this.setState({ source });

    this.props.handleChange(file);
  };

  readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = ({ target: { result } }) => {
        resolve(result);
      };
      reader.readAsDataURL(file);
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.source && <img src={this.state.source} alt="alt" />}

        <br />
        <input
          type="file"
          accept="image/*"
          onChange={this.onChange}
          className={this.props.isEnabled ? 'enabledField' : 'disabledField'}
          disabled={!this.props.isEnabled}
        />
      </React.Fragment>
    );
  }
}

ImageUpload.propTypes = {
  source: PropTypes.string,
  handleChange: PropTypes.func,
  isEnabled: PropTypes.bool
};

ImageUpload.defaultProps = {
  source: '',
  handleChange: () => null
};

export default ImageUpload;
