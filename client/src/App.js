import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

/* Tryed to put it in Main so it's cleaner but got bug that didn't show certain pages */
import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/navbar/Navbar';
import Footer from './components/layout/footer/Footer';
import Landing from './components/layout/landing/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import GroupRideForm from './components/groupride/GroupRideForm';
import GroupRides from './components/groupride/GroupRides';
import GroupRideDetail from './components/groupride/GroupRideDetail';
import AddFriends from './components/add-items/AddFriends';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';


import BackOfficeGroupRides from './components/backoffice/grouprides/BackOfficeGroupRides';

import BackOfficePosts from './components/backoffice/posts/BackOfficePosts';
import BackOfficeEditPosts from './components/backoffice/posts/BackOfficeEditPosts';

import BackOfficeUsers from './components/backoffice/users/BackOfficeUsers';


import './_sass/app.css';
/*
Material UI
*/
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
/*
Theme
*/
const theme = createMuiTheme();

// Check for token and set it, problem: how localpassport and facebook? it's now only jwt.
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken); // We gebruiken jwt als authentication ,
  // dus we zetten onze jwtToken die we hebben toegevoegd aan de localstorage aan de globale headers
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container margin-helper">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-group-ride"
                  component={GroupRideForm}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/group-rides"
                  component={GroupRides}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/grouprides/:grp_id"
                  component={GroupRideDetail}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/friends" component={AddFriends} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <MuiThemeProvider theme={theme}> {/* I only use material-ui in the backoffice */}
                <Switch>
                  <PrivateRoute
                    exact
                    path="/backoffice/users"
                    component={BackOfficeUsers}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/backoffice/grouprides"
                    component={BackOfficeGroupRides}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/backoffice/posts"
                    component={BackOfficePosts}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/backoffice/posts/edit"
                    component={BackOfficeEditPosts}
                  />
                </Switch>
              </MuiThemeProvider>

              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
