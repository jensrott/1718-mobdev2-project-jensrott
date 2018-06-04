import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deleteGroupRide } from '../../actions/profileActions';
import ProfileMaps from '../profile/ProfileMaps';

class GroupRideItem extends Component {
  onDeleteClick(id) {
    this.props.deleteGroupRide(id);
  }
  /* Todo */
  onLikeClick() {
    console.log('like');
  }

  onUnlikeClick() {
    console.log('unlike');
  }

  /* View Specific GroupRideItem */
  render() {
    const { auth } = this.props;
    const groupride = this.props.groupride.map(grp => (
      <div className="card mb-3" key={grp._id}>
        <div className="row">
          <div className="col-12">
            <h1>{grp.name}</h1>
            <p>{grp.location}</p>
            <p>
              {grp.start_date === "" ? (
                <Moment format="DD/MM/YYYY">{Date.now()}</Moment>
              ) : (
                <Moment format="DD/MM/YYYY">{grp.start_date}</Moment>
              )}
            </p>
            <p>Time: {grp.from_time}, {grp.to_time}</p>
             
             
            <div>Estimated distance: {grp.from_route && grp.to_route === "" ?
              null : <ProfileMaps start="Leuven" end="Gent" />} 
              {/* <ProfileMaps start={grp.from_route} end={grp.to_route} />*/}
            </div>
            {console.log(grp.from_route.length, grp.to_route)}
            
            
          </div>
          
        </div>
        <div className="row">
          <div className="col-lg-12">
            <button
              onClick={console.log()}
              type="button"
              className="main-button btn-block btn-group-sm"
            >
              <Link to={`/groupride/${grp._id}`}>
                View Groupride
              </Link>
            </button>
          </div>
        </div>
      </div>
    ));
    return <div>{groupride}</div>;
  }
}

GroupRideItem.propTypes = {
  deleteGroupRide: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteGroupRide })(GroupRideItem);
