import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';

import { Link } from 'react-router-dom';

// Posts
class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      if (posts.length > 0) {
        postContent = <PostFeed posts={posts} />;
      } else {
        postContent = <h4>No posts yet! You can be the first!</h4>;
      }
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="lead-title text-center">Post Feed</h1>
              <p className="lead-text text-center">
                Any questions for us or other cyclists? Just want to chat?
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
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
