import React, { Component } from 'react';
import Moment from 'react-moment';

class ProfileCreds extends Component {
  render() {
    const { groupride, friends } = this.props;

    const grpItems = groupride.map(grp => (
      <li key={grp._id}   >
        <h4>{grp.name}</h4>
        <p>
          {grp.start_date === null ? (
            ' Today'
          ) : (
            <Moment format="YYYY/MM/DD">{grp.start_date}</Moment>
          )}
        </p>
        <p>
          {grp.location === '' ? null : (
            <span>
              <strong>Location: </strong> {grp.location}
            </span>
          )}
        </p>
        <p>
          {grp.description === '' ? null : (
            <span>
              <strong>Description: </strong> {grp.description}
            </span>
          )}
        </p>
      </li>
    ));

    const eduItems = friends.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong>Degree:</strong> {edu.degree}
        </p>
        <p>
          <strong>Field Of Study:</strong> {edu.fieldofstudy}
        </p>
        <p>
          {edu.description === '' ? null : (
            <span>
              <strong>Description: </strong> {edu.description}
            </span>
          )}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center">Group Rides</h3>
          {grpItems.length > 0 ? (
            <ul className="card">{grpItems}</ul>
          ) : (
            <p className="text-center">No Group Rides!</p>
          )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center">Friends</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No Friends Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
