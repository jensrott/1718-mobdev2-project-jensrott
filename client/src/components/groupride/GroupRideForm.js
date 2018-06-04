import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addGroupRide } from '../../actions/profileActions';
import ProfileMaps from '../profile/ProfileMaps';

class GroupRideForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      from_time: '',
      to_time: '',
      from_route: '',
      to_route: '',
      start_date: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const grpData = {
      name: this.state.name,
      location: this.state.location,
      from_time: this.state.from_time,
      to_time: this.state.to_time,
      start_date: this.state.start_date,
      from_route: this.state.from_route,
      to_route: this.state.to_route,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addGroupRide(grpData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-groupride">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Create Group Ride</h1>
              <p className="lead text-center">
                Create a group ride, because riding together is fun!
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                  <small className="form-text text-muted">For example: Melle, Brusselsesteenweg 264, 9090 Melle</small>
                <TextFieldGroup
                  placeholder="* Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />
              
                <small className="form-text text-muted">For example: 12:10 , 15:10</small>
                <h6>From Time</h6>
                <TextFieldGroup
                  name="from_time"
                  type="time"
                  value={this.state.from_time}
                  onChange={this.onChange}
                  error={errors.from_time}
                />
                <h6>To Time</h6>
                <TextFieldGroup
                  name="to_time"
                  type="time"
                  value={this.state.to_time}
                  onChange={this.onChange}
                  error={errors.to_time}
                />
                
                
                <h6>When?</h6>
                <TextFieldGroup
                  name="start_date"
                  type="date"
                  value={this.state.start_date}
                  onChange={this.onChange}
                  error={errors.start_date}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />
                
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Today
                  </label>
                </div>
                <h6>From Where?</h6>
                <TextFieldGroup
                  placeholder="* From Where?"
                  name="from_route"
                  value={this.state.from_route}
                  onChange={this.onChange}
                  error={errors.from_route}
                />
                <h6>To Where?</h6>
                <TextFieldGroup
                  placeholder="* To Where?"
                  name="to_route"
                  value={this.state.to_route}
                  onChange={this.onChange}
                  error={errors.to_route}
                />
                 <small className="form-text text-muted">Information about the ride, rules, distance, speed...</small>
                <TextAreaFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
                <ProfileMaps start={this.state.from_route} end={this.state.to_route} /> {/*  Doesn't work yet when from form */}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GroupRideForm.propTypes = {
  addGroupRide: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addGroupRide })(
  withRouter(GroupRideForm)
);
