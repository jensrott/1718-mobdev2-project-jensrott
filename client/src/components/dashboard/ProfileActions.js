import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ProfileActions extends Component {

  render() {
    console.log(this.props.profile);
    const { profile } = this.props.profile;
    return (
      <div className="btn-group mb-4" role="group">
        <Link to={`/profile/${profile.handle}`} className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" /> View own profile
        </Link>
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
        </Link>
        <Link to="/add-group-ride" className="btn btn-light">
          <i className="fas fa-users text-info mr-1" />
          Create Group Ride
        </Link>
        <Link to="/group-rides" className="btn btn-light">
          <i className="fas fa-users text-info mr-1" />
          View All Group Rides
        </Link>
        <Link to="/friends" className="btn btn-light">
          <i className="fas fa-address-card text-info mr-1" />
          View All Your Friends
        </Link>
        <Link to="/backoffice/posts" className="btn btn-light">
          <i className="fas fa-graduation-cap text-info mr-1" />
          Backoffice
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(ProfileActions);
