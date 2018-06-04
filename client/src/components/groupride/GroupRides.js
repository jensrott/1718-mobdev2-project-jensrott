import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GroupRideItem from './GroupRideItem';
import Spinner from '../common/Spinner';

import { getCurrentProfile } from '../../actions/profileActions';

import { Link } from 'react-router-dom';

// Grouprides overzicht pagina
class GroupRides extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {

    const { profile, loading } = this.props.profile;
    let grouprideContent;

    // Vuile code... refactoring it later, resolves bug for now that it doesn't know a profile, so we first check and let it load.
    if (profile === null || loading) {
      grouprideContent = <Spinner />;

      // We checken nog of er een profiel bestaat zoniet, dan laad hij eerst
    } else if (Object.keys(profile).length > 0) {
      if (profile.groupride === null || loading) {
        grouprideContent = <Spinner />;
      } else {
        // Checken of er grouprides zijn in het profiel.
        if (profile.groupride.length > 0) {
          grouprideContent = <GroupRideItem groupride={profile.groupride} />;
        } else {
          grouprideContent = <h4>No grouprides yet! You can be the first!</h4>;
        }
      }
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="lead-title text-center">Group Rides</h1>
              <p className="lead-text text-center">
                Join a group ride or{' '}
                <Link to="/add-group-ride">create one</Link> !
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Link to="/dashboard" className="btn btn-light ml-3 mb-3">
                Go Back
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {/* <GroupRideItem groupride={profile.groupride} />*/}
              {grouprideContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GroupRides.propTypes = {
  // getgrouprides: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(GroupRides);
