import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import { clearCurrentProfile, getProfiles } from '../../../actions/profileActions';

import './navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidMount() {
    this.props.getProfiles();
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  openSlideMenu() {
    console.log('test');

    let item = document.getElementById('side-menu');
    item.style.width = '250px';
    item.style.display = 'block';
    this.setState({ open: true });
  }

  closeSlideMenu() {
    console.log('close');
    let item = document.getElementById('side-menu');
    item.style.width = '0';
    item.style.display = 'none';
    this.setState({ open: false });
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    //const { user } = this.props.profile.profiles;
    console.log(this.props.profile);
    const authLinks = (
      <div className="nav-right">
        <li>
          <Link className="nav-right" to="/feed">
            Posts
          </Link>
        </li>
        <li>
          <Link className="nav-right" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link" >
          <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
            />{' '}
            Logout
            </a>
        </li>
      </div>
    );

    const guestLinks = (
      <div className="nav-right">
        <li>
          <Link className="nav-right" to="/register">
            Sign Up
          </Link>
        </li>
        <li>
          <Link className="nav-right" to="/login">
            Login
          </Link>
        </li>
      </div>
    );

    return (
      <header className="header" role="heading">
        <div className="container">
          <ul className="nav-container">
            <span className="open-sidenav">
              <a href="" onClick={this.openSlideMenu.bind(this)}>
                <svg width="30" height="30">
                  <path d="M0,5 30,5" stroke="#fff" strokeWidth="5" />
                  <path d="M0,14 30,14" stroke="#fff" strokeWidth="5" />
                  <path d="M0,23 30,23" stroke="#fff" strokeWidth="5" />
                </svg>
              </a>
            </span>
            <div className="nav-left">
              <li>
                <Link className="nav-left" to="/">
                  Social Cycling
                </Link>
              </li>
              <li>
                <Link className="nav-left" to="/profiles">
                  {' '}
                  Cyclists
                </Link>
              </li>
            </div>
            <div className="nav-right">
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </ul>

          <div id="side-menu" className="side-nav">
            <a
              href=""
              className="btn-close"
              onClick={this.closeSlideMenu.bind(this)}
            >
              &times;
            </a>
            <li>
              <Link to="/">Social Cycling</Link>
            </li>
            <li>
              <Link to="/profiles">Cyclists</Link>
            </li>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </header>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile, getProfiles })(
  Navbar
);
