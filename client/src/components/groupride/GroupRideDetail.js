import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getGroupRideById } from '../../actions/profileActions';

class GroupRideDetail extends Component {
  componentDidMount() {
    if (this.props.match.params.grp_id) {
      this.props.getGroupRideById(this.props.match.params.grp_id); // als parameter de group id
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found'); // 404
    }
  }

  render() {
    const { groupride, loading } = this.props.profile.profile;
    const { profile } = this.props.profile;
    console.log(groupride);
    const { auth } = this.props;

    let profileContent;

    if (groupride === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6 center-items">
              {profile.user === auth.user.id ? (
                <div className="col-md-6 center-items">
                  <Link
                    to="/dashboard"
                    className="btn btn-light mb-3 float-left"
                  >
                    Back To Dashboard
                  </Link>
                </div>
              ) : (
                <Link to="/profiles" className="btn btn-light mb-3 float-left">
                  Back To Profiles
                </Link>
              )}
            </div>
          </div>
          <div>
            <p>{groupride.name}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

GroupRideDetail.propTypes = {
  getGroupRideById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getGroupRideById }
)(GroupRideDetail);
