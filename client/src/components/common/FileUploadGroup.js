import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class FileUploadGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'file',
      name: 'myFile'
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.files[0] });
  }

  onSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    let formData = new FormData();
    formData.append('myFile', name);
  
    
    axios.post('http://localhost:5000/api/v1/profile/upload', formData) // In redux maken in de profileActions.
    .then(result => {
      console.log(result);
    })
  };

  render() {
    return (
      <div>
        <form method="post" encType="multipart/form-data" onSubmit={this.onSubmit}>
          <label htmlFor="file" />
          <input type={this.state.type} name={this.state.name} onChange={this.onChange} />
          <button value="Change" type="submit" />
          <small className="form-text text-muted">Change your profile picture</small>
        </form>
      </div>
    );
  }
}

FileUploadGroup.defaultProps = {
  type: 'file'
};

export default FileUploadGroup;