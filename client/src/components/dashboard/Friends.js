import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteFriends } from '../../actions/profileActions';

class Friends extends Component {
  onDeleteClick(id) {
    this.props.deleteFriends(id);
  }

  render() {
    const friends = this.props.friends.map(frd => (
      <tr key={frd._id}>
        <td>{frd.school}</td>
        <td>{frd.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{frd.from}</Moment> -
          {frd.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{frd.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, frd._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Friends</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Avatar</th>
              <th />
            </tr>
            {friends}
          </thead>
        </table>
      </div>
    );
  }
}

Friends.propTypes = {
  deleteFriends: PropTypes.func.isRequired
};

export default connect(null, { deleteFriends })(Friends);
