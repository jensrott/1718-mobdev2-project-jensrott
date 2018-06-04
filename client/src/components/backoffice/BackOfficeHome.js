import React, { Component } from 'react';
import BackOfficePosts from '../posts/BackOfficePosts';

class BackOfficeHome extends Component {
  render() {
    return (
      <div>
        <BackOfficePosts /> {/* First page of our backoffice are the posts */}
      </div>
    )
  }
}

export default BackOfficeHome;
