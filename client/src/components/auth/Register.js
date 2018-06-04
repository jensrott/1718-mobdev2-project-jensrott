import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/* Actions */
import { registerUser } from '../../actions/authActions';

/* Components */
import TextFieldGroup from '../common/TextFieldGroup';
import EmailFieldGroup from '../common/EmailFieldGroup';


import note from '../../assets/logos/note.svg';

import FacebookLogin from 'react-facebook-login';
import fb from '../../fb'; // Falls outside src... That's why I put in root

import './auth.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      picture: '',
      isLoggedIn: false, 
      user: null,
      token: '',
      userID: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
    
  }

 facebookResponse = (response) => { // TODO: in redux
  const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
  const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
  };
  fetch('http://localhost:5000/api/v1/auth/facebook', options).then(newResponse => {
      const token = newResponse.headers.get('x-auth-token');
      newResponse.json().then(user => {
          if (token) {
              this.setState({isLoggedIn: true, user, token})
              console.log(token);
          }
      });
  })
 }

  render() {
    const { errors } = this.state;

    let fbContent;
    if (this.state.isLoggedIn) {
      fbContent = null // knop moet er niet meer staan
    } else {
    fbContent = (
        <FacebookLogin
          size="medium"
          textButton="Sign up with Facebook"
          appId={fb.FACEBOOK_APP_ID}
          autoLoad={false}
          fields="name,email,picture"
          callback={this.facebookResponse}
        />
      );
    }

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="lead-title text-center">Sign Up</h1>
              <p className="lead-text text-center">
                Create your Social Cycling account
              </p>
              
              <form noValidate onSubmit={this.onSubmit} className="card">
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <EmailFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info={note}
                  data-tip="React-tooltip"
                />
                
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input type="submit" className="main-button mt-4" value="send" />

                <div className="row">
                  <div className="col-md-8 m-auto mt-3">
                    <div className="text-center mt-3">{fbContent}</div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
